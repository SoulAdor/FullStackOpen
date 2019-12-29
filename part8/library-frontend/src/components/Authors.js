import React, { useState } from 'react' 

const Authors = ({show, authors, editBirth}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const changeBirth = async (e) => {
    e.preventDefault()
    await editBirth({ variables: { name, setBornTo : Number(born) }})
    setBorn('')
  }

  if (!show) return null
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Born
            </th>
            <th>
              Books
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
      
      <h2>Set birthyear</h2>
      <form onSubmit={changeBirth}>
        <select value={name} onChange={(event) => {setName (event.target.value)}}>
          <option value='' defaultValue disabled hidden> Select an Author </option> 
          {authors.map (author => <option key={author.id} value={author.name}>{author.name}</option>)}
        </select>
        <div>
          Born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors