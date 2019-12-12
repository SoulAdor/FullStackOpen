import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersInfo = ({ usersBlogs }) => {
  return (
    <>
      <h2> Users </h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
          {usersBlogs.map (usersBlog =>
            <tr key={usersBlog.id}>
              <td><Link to={`/users/${usersBlog.id}`}> {usersBlog.name} </Link></td>
              <td>{usersBlog.numberOfBlogs}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

UsersInfo.propTypes = {
  usersBlogs: PropTypes.array.isRequired
}

const toUsersBlogs = users => {
  return users.map (user => {return { id: user.id, name: user.name, numberOfBlogs : user.blogs.length }} )
}

const mapStateToProps = (state) => {
  return {
    usersBlogs: toUsersBlogs(state.users),
  }
}

export default connect(
  mapStateToProps
)(UsersInfo)