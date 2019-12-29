import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks { 
    title
    author
    published
    id
  }
}
`

const CREATE_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author
      genres
      id
    }
  }
`

const EDIT_BIRTH = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo)  {
    name
    born
    bookCount
    id
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => {
          if ( result.loading ) return <div>loading...</div>
          return (      
            <Mutation mutation={EDIT_BIRTH}>
              {(editBirth) =>
                <Authors
                  show={page === 'authors'}
                  authors={result.data.allAuthors}
                  editBirth={editBirth}
                />
              }
            </Mutation>  
          )
        }}
      </Query>
    
      <Query query={ALL_BOOKS}>
        {(result) => {
        if ( result.loading ) return <div>loading...</div>
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
    </div>
  )
}

export default App