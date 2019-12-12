import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOutUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const menuStyle = {
  backgroundColor: 'LightGray'
}

const Menu = ({ user, logOutUser }) => {
  const logOut = () => logOutUser()
  return (
    <div style={menuStyle}>
      <Link to="/"> blogs </Link>
      <Link to="/users"> users </Link>
      {` ${user.name} logged in `}
      <button type="button" onClick={logOut}> Log out </button>
    </div>
  )
}

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