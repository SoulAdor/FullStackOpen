import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Blogs from './Blogs'
import BlogAdder from './BlogAdder'
import Togglable from './Togglable'
import Notification from './Notification'
import { logOutUser, initUser } from '../reducers/userReducer'

const Body = ({ user, logOutUser }) =>  {
  return user === null ? <Login /> : (
    <div className="Blogs">
      <h1>Blogs</h1>
      <p>{`${user.name} logged in`}</p>
      <button type="button" onClick={logOutUser}>Log out</button>
      <Togglable buttonLabel="New blog">
        <BlogAdder/>
      </Togglable>
      <Blogs/>
    </div>
  )
}

const App = ({ user, logOutUser, initUser }) =>  {
  useEffect(() => {
    initUser()
  }, [initUser])
  return (
    <>
      <Body user={user} logOutUser={logOutUser}/>
      <Notification/>
    </>
  )
}

const mapDispatchToProps = {
  logOutUser,
  initUser
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App)
