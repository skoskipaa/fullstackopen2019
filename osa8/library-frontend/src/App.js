import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

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
    console.log('ERR', error.graphQLErrors)
    setErrorMsg(error.graphQLErrors[0].message)

    setTimeout(() => {
      setErrorMsg(null)
    }, 5000)
  }

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
    
    <Query query={ALL_AUTHORS}>
     {(result) => <Authors show={page === 'authors'} result={result}
                  ALL_AUTHORS={ALL_AUTHORS} ALL_BOOKS={ALL_BOOKS}/>}
    </Query>

    <Query query={ALL_BOOKS}>
      {(result) => <Books show={page === 'books'} result={result} />}
    </Query>

    <Mutation mutation={CREATE_BOOK} onError={handleError}
        refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}
      >
      {(addBook) => <NewBook show={page === 'add'} addBook={addBook} />}
    </Mutation>

    </div>
  )
}

export default App