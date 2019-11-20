import React, {useState} from 'react'
import Database from './PersonsDB'

import ValueInput from './ValueInput'
import Button from './Button'
import Notification from './Notification'
import ErrorMessage from './ErrorMessage'

const PersonForm = ({persons, setPersons}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const notificationTime = 5000
  const newPerson = {
    name: newName,
    number: newNumber 
  }

  const updateNumber = updatedPerson => {
    if (window.confirm(`${updatedPerson.name} is already added to phonebook, replace the old number with a new one? `) )
      Database.update(updatedPerson.id, newPerson)
        .then((returnedPerson) => {
          setPersons(persons.map (person => person.id === updatedPerson.id ? returnedPerson : person))
          setNotificationMessage (`Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`)
          setTimeout(() => {setNotificationMessage(null)}, notificationTime)
        }
      ).catch(() => {
          setErrorMessage(`Information of '${newName}' has already been removed from server`)
          setTimeout(() => { setErrorMessage(null)}, notificationTime)
        }
      )
  }

  const addPerson = () => {
    Database.create(newPerson)
      .then(response => 
        {
          setPersons(persons.concat (response))
          setNotificationMessage (`Added ${response.name}`)
          setTimeout(() => { setNotificationMessage(null) }, notificationTime)
        }
      )
      .catch(error => {
        setErrorMessage(error.response.data.error)
      })  
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
      <ErrorMessage message={errorMessage}/>
      <Notification message={notificationMessage}/>
    </form>
  )
}

export default PersonForm