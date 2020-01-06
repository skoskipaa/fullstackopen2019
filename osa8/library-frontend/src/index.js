import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import App from './App'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

/*
const query = gql`
    {
      allAuthors {
        name,
        born,
        bookCount
      }
    }
  `

client.query({ query })
    .then((response) => {
      console.log(response.data)
    })
*/

ReactDOM.render(
<ApolloProvider client={client} >
    <App />
</ApolloProvider>,
document.getElementById('root')
)