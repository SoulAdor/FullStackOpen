import React from 'react'
import { connect } from 'react-redux'

const User = ({ user }) => {
  return !user ? null : (
    <>
      <h2> {user.name} </h2>
      <h3> Added blogs </h3>
      <ul>
        { user.blogs.map (blog => <li key={blog.id}>{blog.title}</li>) }
      </ul>
    </>
  )}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(user => user.id === ownProps.id)
  }
}

export default connect(
  mapStateToProps
)(User)