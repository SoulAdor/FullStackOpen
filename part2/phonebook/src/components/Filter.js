import React from 'react'
import ValueInput from './ValueInput'

const Filter = ({filter, setFilter}) => {
  const setLowercaseFilter = value => setFilter(value.toLowerCase())
  return (
    <ValueInput name='Filter shown with' value={filter} setValue={setLowercaseFilter}/>
  )
}

export default Filter