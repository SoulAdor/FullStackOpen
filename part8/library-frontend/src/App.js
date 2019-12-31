import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors 
  { name born bookCount id }
}
`

const ALL_BOOKS = gql`
{
  allBooks { 
    title 
    author {
      name, 
      born
    } 
    published 
    id 
  }
}
`

const CREATE_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) 
    { 
      title 
      published 
      author {
        name, 
        born
      }  
      genres 
      id 
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born)  
    { name born bookCount id }
  }
`

// Value is signed token with user
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const GET_USER = gql`
{
  me { username favoriteGenre id }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [client, setClient] = useState(null)
  const [user, setUser] = useState(null)

  console.log('user: ', user)
  console.log('App token: ', localStorage.getItem('books-user-token'))

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  return (
    <div> 
      <ApolloConsumer>
        {(client => setClient(client))}
      </ApolloConsumer>

      <Query query={GET_USER}>
        {(result) => {
          if (result.loading) return <div>Loading user...</div>
          console.log("User data: ", result.data.me)
          setUser (result.data.me)
          return null
        }}
      </Query>

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')} style={!user ? {} : {display: 'none'}}>login</button>
        <button onClick={() => setPage('add')} style={user ? {} : {display: 'none'}}>add book</button>
        <button onClick={logout} style={user ? {} : {display: 'none'}}>logout</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => {
          if ( result.loading ) return <div>loading...</div>
          if (!result.data) {
            console.log('No data authors')
            return null
          }
          return (
            <Mutation mutation={EDIT_AUTHOR}>
              {(editAuthor) =>
                <Authors
                  show={page === 'authors'}
                  authors={result.data.allAuthors}
                  editAuthor={editAuthor}
                />
              }
            </Mutation>  
          )
        }}
      </Query>
        
      <Query query={ALL_BOOKS}>
        {(result) => {
        if ( result.loading ) return <div>loading...</div>
        if (!result.data) {
          console.log('No data books')
          return null
        }
        return (
          <Books
            show={page === 'books'}
            books={result.data.allBooks}
          />
        )
      }}
      </Query>

      <Mutation mutation={CREATE_BOOK} refetchQueries={[{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]}>
        {(addBook) => <NewBook  show={page === 'add'} addBook={addBook}/>}
      </Mutation>

      <Mutation mutation={LOGIN} refetchQueries={[{ query: GET_USER }]}>
        {(login) => <Login show={page === 'login'} setToken={setToken} login={login}></Login>}
      </Mutation>
    </div>
  )
}

export default App