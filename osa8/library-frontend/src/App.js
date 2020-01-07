import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

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
        author,
        published
      }
    }`

  const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    )
    {
      title
      author
      published
    }
  }
  `

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMsg, setErrorMsg] = useState(null)

  const handleError = (error) => {
    console.log('ERROR', error.graphQLErrors)
    setErrorMsg(error.graphQLErrors[0].message)

    setTimeout(() => {
      setErrorMsg(null)
    }, 5000)
  }

  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError, refetchQueries: [{ query: ALL_AUTHORS }, 
      { query: ALL_BOOKS }]
  })

  return (
    <div>

      {errorMsg && 
      <div style={{ color: 'red' }}> ERROR
        {errorMsg}
        </div>}

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
    
    <Authors show={page === 'authors'} result={authors}
            ALL_AUTHORS={ALL_AUTHORS} ALL_BOOKS={ALL_BOOKS}/>
    <Books show={page === 'books'} result={books} />
    <NewBook show={page === 'add'} addBook={addBook} />
    </div>
  )
}

export default App