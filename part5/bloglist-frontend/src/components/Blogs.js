import React from 'react'
import PropTypes from 'prop-types'
import BlogAdder from './BlogAdder'
import Togglable from './Togglable'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blogs = ({ blogs }) => (
    <>
      <h2> Blogs </h2>
      <Togglable buttonLabel="New blog">
        <BlogAdder/>
      </Togglable>
      {blogs.map (blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link>
        </div>
      )}
    </>
)

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired
}

const getSorted = (blogs) => {
  return [].concat(blogs).sort((a, b) => (a.likes > b.likes) ? -1 : 1)
}

const mapStateToProps = (state) => {
  return {
    blogs: getSorted(state.blogs)
  }
}

export default connect(
  mapStateToProps
)(Blogs)