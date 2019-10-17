import React from 'react'
import Database from './PersonsDB'

import Button from './Button'

const deletePerson = (event, name, id, persons, setPersons) => {
  event.preventDefault()
  if (window.confirm(`Delete ${name}?`) )
  {
    Database.remove(id)
    setPersons (persons.filter(person => person.id !== id))
  }
}

const Person = ({name, number, id, persons, setPersons}) => (
  <li> 
    <form onSubmit={event => deletePerson(event, name, id, persons, setPersons)}>
      {`${name} ${number} `} 
      <Button type="submit" name="Delete"/>
    </form>
  </li>
)

const Persons = ({persons, filter, setPersons}) => {
  const filteredPersons = persons.filter(person => (filter === '') ? true : person.name.toLowerCase().includes(filter)) 
  return (
    <ul> {filteredPersons.map (person => <Person key={person.id} id={person.id} name={person.name} number={person.number} persons={persons} setPersons={setPersons}/>)} </ul>
  )
}

export default Persons