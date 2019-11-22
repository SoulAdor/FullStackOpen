const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 :
    blogs.map (blog => blog.likes).reduce((a,b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const favoriteBlog = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return (({ title, author, likes }) => ({ title, author, likes }))(favoriteBlog)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const groupedByAuthor = _(blogs).groupBy('author').values().value()
  const mostBlogs = groupedByAuthor.reduce((prev, current) => (prev.length > current.length) ? prev : current)
  return {
    author: mostBlogs[0].author,
    blogs: mostBlogs.length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const groupedByAuthor = _(blogs).groupBy('author').values().value()
  const numLikes = authorBlogs => authorBlogs.reduce((prev, current) => prev + current.likes, 0) 
  const mostLikes = groupedByAuthor.reduce((prev, current) => (numLikes(prev) > numLikes(current)) ? prev : current)
  return {
    author: mostLikes[0].author,
    likes: numLikes(mostLikes)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}