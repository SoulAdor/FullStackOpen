import React from 'react'

const Input = ({value, onChange, type}) => (
  <input type={type} value={value} onChange={onChange}/>
)

export default Input