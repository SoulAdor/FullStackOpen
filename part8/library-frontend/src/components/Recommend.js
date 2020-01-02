import React from 'react'

const Recommend = ({show, recommendedBooks, favoriteGenre}) => {
  if (!show || !recommendedBooks) return null
  return (
    <div>
      <h2>Recommendations</h2>
      <p> Books in your favorite genre <b> {favoriteGenre} </b></p>
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
          {recommendedBooks.map(a =>
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

export default Recommend