import React, { useState } from 'react'
import { gql } from 'apollo-boost'

const LOGGED_USER_INFO = gql`
    {
      me {
        username
        favoriteGenre
      }
    }
`

const Recommendations = (props) => {
    const [favGen, setFavGen] = useState('')

    if (!props.show ) {
        return null
      }

    if (props.result.loading) {
        return <div>loading...</div>
      }

    const getUserInfo = async () => {
        const { data } = await props.client.query({
          query: LOGGED_USER_INFO,
          fetchPolicy: 'no-cache'
        })
        //console.log('FAV-GEN', data)
        setFavGen(data.me.favoriteGenre)
      }
      getUserInfo()


    const books = props.result.data.allBooks
    const filteredBooks = books.filter(b => b.genres.includes(favGen))

    return (
        <div>
        <h3>Recommended just for you, based on your favorite genre "{favGen}"</h3>
        <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks
          .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

        </div>
    )
}

export default Recommendations