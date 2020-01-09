import React from 'react'
import EditYear from './EditYear'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int) {
      editAuthor(name: $name, setBornTo: $born) {
          name
          born
          bookCount
          id
      }
  }
`

const Authors = (props) => {

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }
  
  const authors = props.result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {props.token !== null &&
        <Mutation mutation={EDIT_AUTHOR} 
                  refetchQueries={[{ query: props.ALL_BOOKS }, { query: props.ALL_AUTHORS }]}>
          {(editAuthor) => <EditYear editAuthor={editAuthor} authors={authors}/> }
        </Mutation>
        }
      </div>

    </div>
  )
}

export default Authors