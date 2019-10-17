import React from 'react'
import Input from './Input'

const ValueInput = ({name, value, setValue}) => (
  <div>
    {`${name}: `}
    <Input value={value} onChange={({target}) => setValue(target.value)}/>
  </div>
)

export default ValueInput