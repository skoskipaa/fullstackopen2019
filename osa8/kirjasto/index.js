const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI='mongodb+srv://user_one:f4rkkup3ppu@cluster0-jadvn.mongodb.net/phonebook-app?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to db:' , error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
    }

  type Mutation {
      addBook(
          title: String!
          published: Int!
          name: String!
          genres: [String!]!
      ): Book

      editAuthor(
          name: String!
          setBornTo: Int!
      ): Author
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
      

      // hake authorilla (ei vaadittu 8.14)

    // palauta kaikki
    
    const books = await Book.find({}).populate('author')
    return books

/*
        const auth = args.author
        const gen = args.genre
        
        if (!args.author && !args.genre) {
            return books
        }

        if(args.author && args.genre) {
            const filtAuthList = books.filter(b => b.author === auth)
            return filtAuthList.filter(b => b.genres.includes(gen))
        }

        if (args.genre) {
            return books.filter(b => b.genres.includes(gen))
        }

        if (args.author) {
            return books.filter(b => b.author === auth)
        }
*/
    }, 

    allAuthors: () => Author.find({})
  },

  Book: {
    author: (root) => {
      return Author.findById(root.author)
    }
  },

  Author: {
      bookCount: async (root) => {
          const books = await Book.find({}).populate('author')
          const booksByAuthor = books.filter(b => b.author.name === root.name)
          //console.log(books)
          return booksByAuthor.length
      }
  },

  Mutation: {
      addBook: async (root, args) => {

        const authors = await Author.find({})
          let author = authors.find(a => a.name === args.name)
  
          if (!author) {
            author = new Author({ 
              name: args.name 
            })

            console.log('UUSI KIRJAILIJA', author)
            await author.save()
          }
        
          const newBook = new Book({
            title: args.title,
            published: args.published,
            author: author,
            genres: args.genres
          })

          try {
            console.log('UUSI KIRJA', newBook)
            return newBook.save()

          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
      },

      editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      }
  }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})


/*
const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
    }

  type Mutation {
      addBook(
          title: String!
          published: Int!
          author: String!
          genres: [String!]!
      ): Book

      editAuthor(
          name: String!
          setBornTo: Int!
      ): Author
  }

`
*/