import React from 'react'
import PropTypes from 'prop-types'
import BlogAdder from './BlogAdder'
import Togglable from './Togglable'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => (
  <>
    <h2> Blogs </h2>
    <Togglable buttonLabel="New blog">
      <BlogAdder/>
    </Togglable>
    <ul className='list-group'>
      {blogs.map (blog =>
        <li key={blog.id}  className='list-group-item'>
          <Link data-cy='link_to_blog' to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link>
        </li>
      )}
    </ul>
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