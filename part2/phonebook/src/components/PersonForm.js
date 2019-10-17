import React, {useState} from 'react'
import Database from './PersonsDB'

import ValueInput from './ValueInput'
import Button from './Button'

const PersonForm = ({persons, setPersons}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  let newPerson = {
    name: newName,
    number: newNumber 
  }

  const updateNumber = updatedPerson =>
  {
    if (window.confirm(`${updatedPerson.name} is already added to phonebook, replace the old number with a new one? `) )
      Database.update(updatedPerson.id, newPerson).then((returnedPerson) => 
        setPersons(persons.map (person => person.id === updatedPerson.id ? returnedPerson : person))
      )
  }

  const addPerson = () => {
    Database.create(newPerson).then(response => setPersons(persons.concat (response)) )
  }

  const resetInput = () => 
  {
    setNewName('')
    setNewNumber('')
  }

  const tryAddPerson = (event) => {
    event.preventDefault()
    const person = persons.find((person) => person.name === newName) 
    person ? updateNumber (person) : addPerson ()
    resetInput ()
  }

  return (
    <form onSubmit={tryAddPerson}> 
      <ValueInput name='Name' value={newName} setValue={setNewName}/>
      <ValueInput name='Number' value={newNumber} setValue={setNewNumber}/>
      <Button type="submit" name="Add"/>
    </form>
  )
}

export default PersonForm