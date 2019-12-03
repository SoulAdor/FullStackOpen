import React from 'react'
import Input from './Input'

const ValueInput = ({ name, value, setValue, type }) => (
  <div>
    {`${name}: `}
    <Input type={type} value={value} onChange={({ target }) => setValue(target.value)}/>
  </div>
)

export default ValueInput