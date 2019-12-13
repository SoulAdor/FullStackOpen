import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const numBlogs = (userId, blogs) =>
{
  return blogs.filter(blog => blog.user.id === userId).length
}

const UsersInfo = ({ users, blogs }) => (
  <>
    <h2> Users </h2>
    <Table striped>
      <tbody>
        <tr>
          <th> Name </th>
          <th> Blogs Created </th>
        </tr>
        {users.map (user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}> {user.name} </Link></td>
            <td data-cy='num-blogs'>{numBlogs(user.id, blogs)}</td>
          </tr>
        )}
      </tbody>
    </Table>
  </>
)

UsersInfo.propTypes = {
  users: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps
)(UsersInfo)