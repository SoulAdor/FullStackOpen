import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import { connect } from 'react-redux'
import { initBlogs } from '../reducers/blogsReducer'

const Blogs = ({ blogs, initBlogs }) => {
  useEffect(() => {
    const fetchData = async () => await initBlogs()
    fetchData()
  }, [initBlogs])

  return (
    <div className="Blogs">
      {blogs.map (blog => <Blog key={blog.id} blog={blog}/>)}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  initBlogs: PropTypes.func.isRequired
}

const getSorted = (blogs) => {
  return [].concat(blogs).sort((a, b) => (a.likes > b.likes) ? -1 : 1)
}

const mapStateToProps = (state) => {
  return {
    blogs: getSorted(state.blogs)
  }
}

const mapDispatchToProps = {
  initBlogs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)