import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
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
  query allBooks($genre: String) {
    allBooks (genre: $genre) { 
      title 
      author {
        name, 
        born
      } 
      published 
      genres
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
  const [client, setClient] = useState(null)
  const [user, setUser] = useState(null)

  const logout = () => {
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div> 
      <ApolloConsumer>
        {(client => setClient(client))}
      </ApolloConsumer>

      <Query query={GET_USER}>
        {(result) => {
          if (result.loading) return <div>Loading user...</div>
          setUser (result.data.me)
          return null
        }}
      </Query>

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')} style={!user ? {} : {display: 'none'}}>login</button>
        <button onClick={() => setPage('add')} style={user ? {} : {display: 'none'}}>add book</button>
        <button onClick={() => setPage('recommend')} style={user ? {} : {display: 'none'}}>recommend</button>
        <button onClick={logout} style={user ? {} : {display: 'none'}}>logout</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => {
          if ( result.loading ) return <div>loading all authors...</div>
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
        
      <Query query={ALL_BOOKS} variables={{ genre : null }}>
        {(result) => {
          if ( result.loading ) return <div>loading all books...</div>
          if ( !result.data )  return <div> No books all </div>
          return (
            <Books
              show={page === 'books'}
              books={result.data.allBooks}
              client={client}
              ALL_BOOKS={ALL_BOOKS}
            />
          )
        }}
      </Query>

      <Mutation mutation={CREATE_BOOK} refetchQueries={[{ query: ALL_AUTHORS }, { query: ALL_BOOKS, variables: { genre: null } }]}>
        {(addBook) => <NewBook show={page === 'add'} addBook={addBook}/>}
      </Mutation>

      <Query query={ALL_BOOKS} variables={{ genre: user ? user.favoriteGenre : null }} fetchPolicy={'no-cache'}>
        {(result) => {
          if ( result.loading ) return <div>loading recommend...</div>
          return (
            <Recommend
              show={page === 'recommend'}
              recommendedBooks={result.data.allBooks}
              favoriteGenre={user ? user.favoriteGenre : null}
            />
          )
        }}
      </Query>

      <Mutation mutation={LOGIN} refetchQueries={[{ query: GET_USER }]} >
        { (login) => <Login show={page === 'login'} login={login}></Login> }
      </Mutation>
    </div>
  )
}

export default App