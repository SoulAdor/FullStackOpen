import React, { useState } from 'react'

const Person = ({name, number}) => (
  <li> 
    {name + ' ' + number} 
  </li>
)

const Persons = ({persons, filter}) => {
  const filteredPersons = persons.filter(person => (filter === '') ? true : person.name.toLowerCase().includes(filter)) 
  return (
    <ul>
      {filteredPersons.map (person => <Person key={person.name} name={person.name} number={person.number}/>)}
    </ul>
  )
}

const Filter = ({filter, setFilter}) => {
  const handleFilterChange = ({target}) => setFilter(target.value.toLowerCase())
  return (
    <div>
      <Input name="filter shown with" value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const Input = ({name, value, onChange}) => (
  <div>
    {name}: <input value={value} onChange={onChange}/>
  </div>
)

const Button = ({type, name}) => (
  <div>
      <button type={type}>{name}</button>
  </div>
)

const PersonForm = ({persons, setPersons}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const alertPerson = newName => alert(`${newName} is already added to phonebook`)
  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber 
    }
    setPersons(persons.concat (newPerson) )
    setNewName('')
    setNewNumber('')
  }
  const tryAddPerson = (event) => {
    event.preventDefault()
    persons.some((person) => person.name === newName) ? alertPerson (newName) : addPerson ()
  }

  const handleNameChange = ({target}) => setNewName(target.value)
  const handleNumberChange = ({target}) => setNewNumber(target.value)

  return (
    <form onSubmit={tryAddPerson}>
      <Input name="name" value={newName} onChange={handleNameChange}/>
      <Input name="number" value={newNumber} onChange={handleNumberChange}/>
      <Button type="submit" name="add"/>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ filter, setFilter ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App