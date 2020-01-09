import React, { useState } from 'react'
//import { gql } from 'apollo-boost'

/*
const BOOKS_FROM_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre){
      title
      name
    }
}
`
*/

const Books = (props) => {

 const [genreFilter, setGenreFilter] = useState('')
  
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks  
  const genres = books.map(book => book.genres).flat()
  const uniqueGenres = Array.from(new Set(genres))
  //console.log(uniqueGenres)

  let filteredBooks = books.filter(b => 
    b.genres.includes(genreFilter))

    if (genreFilter === '' || genreFilter === 'All') {
      filteredBooks = books
    }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h3>Filter by genre</h3>
        <select value={genreFilter}
                onChange={({ target }) => setGenreFilter(target.value)}>
          <option>All</option>
                {uniqueGenres.map(a => <option key={uniqueGenres.indexOf(a)} value={a}>{a}</option>)}
        </select> 
      </div>
    </div>
  )
}

export default Books