import React, {useState, useEffect} from 'react'

const Books = ({ show, books, client, ALL_BOOKS }) => {
  const [genre, setGenre] = useState(null)
  const [visibleBooks, setVisibleBooks] = useState(books)

  const getGenres = books => {
    let genres = new Set([])
    books.map(book => genres = new Set([ ...genres, ...book.genres ]))
    return [...genres]
  }

  useEffect(() => {
    const updateVisibleBooks = async () => {
      const { data } = await client.query({
        query: ALL_BOOKS,
        variables: { genre: genre },
        fetchPolicy: 'no-cache'
      })
      setVisibleBooks(data.allBooks)
    }
    updateVisibleBooks ()
  }, [genre, client, ALL_BOOKS])


  if (!show) return null
  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {visibleBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {getGenres(books).map(genre => <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)}
        <button onClick={() => setGenre(null)}>All genres</button>
      </div>
    </div>
  )
}

export default Books