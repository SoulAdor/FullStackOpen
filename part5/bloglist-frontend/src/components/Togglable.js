import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button type='button' variant='secondary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button type='button' variant='secondary' onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
}

export default Togglable