import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOutUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'

const Menu = ({ user, logOutUser }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav.Link href="#" as="span">
        <Link to="/">Blogs</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link to="/users">Users</Link>
      </Nav.Link>
      <Nav className="mr-auto">
        <div className="navbar-text">{` ${user.name} logged in `}</div>
      </Nav>
      <Button type="button" onClick={logOutUser}>Log out</Button>
    </Navbar.Collapse>
  </Navbar>
)

Menu.propTypes = {
  user: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  logOutUser
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)