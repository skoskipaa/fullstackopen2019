import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'


const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
const ALL_AUTHORS = gql`
    {
      allAuthors {
        name,
        born,
        bookCount
      }
    }
  `
const ALL_BOOKS = gql`
    {
      allBooks {
        title,
        author {
          name
        },
        published,
        genres
        
      }
    }
  `

const CREATE_BOOK = gql`
  mutation addBook($title: String!, $name: String!, $published: Int, $genres: [String!]!) {
    addBook(
      title: $title,
      name: $name, 
      published: $published,
      genres: $genres
    )
    {
      title
      author {
        name
      }
      published
      genres
    }
  }
  `
const BOOK_ADDED = gql`
    subscription {
      bookAdded {
        title,
        author {
          name
        },
        published,
        genres
      }
    }
  `

const App = () => {
  const [page, setPage] = useState('books')
  const [errorMsg, setErrorMsg] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('library-user-token')
    if (loggedUser != null) {
      //console.log(loggedUser)
      setToken(loggedUser)
    }
  
  }, [])

  const handleError = (error) => {
    setErrorMsg(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMsg(null)
    }, 5000)
  }

  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },

   // refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
    set.map(b => b.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
    
    const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
    console.log(authorsInStore)
    const authNames = authorsInStore.allAuthors.map(a => a.name)
    const bookAuth = addedBook.author.name
    if (!authNames.includes(bookAuth)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: authorsInStore.allAuthors.concat({
          bookCount: 1,
          born: null,
          name: bookAuth,
          __typename: "Author"}) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(`A new book ${book.title} was just added`)
      updateCacheWith(book)
    }
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError,   
  })

  const logout = () => {
    setPage('books')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  const buttonsLoggedIn = () => {
    return (
    <div>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => setPage('recommendations')}>recommendations</button>
      <button onClick={() => logout()}>log out</button>
    </div>
  )
}

  const buttonsLoggedOut = () => {
    return (
      <button onClick={() => setPage('login')}>login</button>
  )
}
  return (
    
    <div>

      {errorMsg && 
      <div style={{ color: 'red' }}>
        {errorMsg}
        </div>}
        
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        
       {token === null ?
        buttonsLoggedOut() :
        buttonsLoggedIn()
        }
        </div>
    <h2>Welcome to the library!</h2>
        
    <LoginForm show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)} />
    
    <Authors show={page === 'authors'} result={authors}
            ALL_AUTHORS={ALL_AUTHORS} ALL_BOOKS={ALL_BOOKS} 
            token={token}/>
    
    <Books show={page === 'books'} result={books} />
    
    <NewBook show={page === 'add'} addBook={addBook} />

    <Recommendations show={page === 'recommendations'}
                      result={books}
                      client={client}
                       />
    </div>
  )
}

export default App