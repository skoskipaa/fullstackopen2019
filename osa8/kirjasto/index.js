const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')

const pubsub = new PubSub()

const JWT_SECRET = 'TOP_SECRET_KEY'

mongoose.set('useFindAndModify', false)

// Add url...
const MONGODB_URI=''

mongoose.connect(MONGODB_URI, { useNewUrlParser: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to db:' , error.message)
  })

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
      books: [Book!]!
    }

  type Mutation {
      addBook(
          title: String!
          published: Int
          name: String!
          genres: [String!]!
      ): Book

      editAuthor(
          name: String!
          setBornTo: Int
      ): Author

      createUser(
        username: String!
        favoriteGenre: String!
      ): User

      login(
        username: String!
        password: String!
      ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
    // haku genren perusteella
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre }})
      }

    // palauta kaikki
    const books = await Book.find({})
    return books

    }, 

    allAuthors: () => Author.find({}).populate('books'),

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Book: {
    author: (root) => {
      return Author.findById(root.author)
    }
  },

  Author: {
      bookCount: async (root) => {
        return root.books.length

          //const books = await Book.find({}).populate('author')
          //const booksByAuthor = books.filter(b => b.author.name === root.name)
          //console.log(books)
          //return booksByAuthor.length
      },
      
  },

  Mutation: {
      addBook: async (root, args, { currentUser } ) => {

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        const authors = await Author.find({})
          let author = authors.find(a => a.name === args.name)
  
          if (!author) {
            author = new Author({ 
              name: args.name 
            })

            //console.log('UUSI KIRJAILIJA', author)
            await author.save()
          }
        
          const newBook = new Book({
            title: args.title,
            published: args.published,
            author: author,
            genres: args.genres
          })

          try {
            //console.log('UUSI KIRJA', newBook)
            await newBook.save()
            author.books = author.books.concat(newBook._id)
            //console.log(author.books)
            await author.save()

          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }

          pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
          return newBook

      },

      editAuthor: async (root, args, context) => {

        const user = context.currentUser
        if (!user) {
          throw new AuthenticationError("not authenticated")
        }

        const author = await Author.findOne({ name: args.name })

        if (!author) {
          throw new UserInputError('Author does not exist')
        } else {

        author.born = args.setBornTo
        return author.save()
        }
      },

      createUser: (root, args) => {

        const user = new User({ 
          username: args.username,
          favoriteGenre: args.favoriteGenre
         })

        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          })
      },

      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("Bad credentials")
        } 
        const userForToken = { username: user.username,
        id: user._id}

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
  },

},

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await (await User.findById(decodedToken.id))
      return { currentUser }
    }
  }


})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready adt ${subscriptionsUrl}`)
})