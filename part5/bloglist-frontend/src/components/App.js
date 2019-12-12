import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Login from './Login'
import Menu from './Menu'
import User from './User'
import Blogs from './Blogs'
import Blog from './Blog'
import UsersInfo from './UsersInfo'
import Notification from './Notification'
import { initUser } from '../reducers/userReducer'
import { initBlogs } from '../reducers/blogsReducer'
import { initUsers } from '../reducers/usersReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = ({ user, initUser, initBlogs, initUsers }) =>  {
  useEffect(() => {initBlogs()}, [initBlogs])
  useEffect(() => {initUser()}, [initUser])
  useEffect(() => {initUsers()}, [initUsers])

  return (
    <>
      <Notification/>
      {
        !user ? <Login/> : (
          <Router>
            <Menu/>
            <h2>Blog app</h2>
            <Route exact path="/" render={() => <Blogs />} />
            <Route exact path="/users" render={() => <UsersInfo />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User id={match.params.id} />
            } />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog id={match.params.id} />
            } />
          </Router>
        )
      }
    </>
  )
}

App.propTypes = {
  user: PropTypes.object,
  initUser: PropTypes.func.isRequired,
  initBlogs: PropTypes.func.isRequired,
  initUsers: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  initUser,
  initBlogs,
  initUsers
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App)
