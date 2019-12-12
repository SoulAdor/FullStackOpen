import React from 'react'
import { connect } from 'react-redux'

const User = ({ user }) => {
  return !user ? null : (
    <>
      <h2 className='d-flex justify-content-center'> {user.name} </h2>
      <h3> Added blogs </h3>
      <ul className='list-group'>
        { user.blogs.map (blog => <li className='list-group-item text-info' key={blog.id}>{blog.title}</li>) }
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