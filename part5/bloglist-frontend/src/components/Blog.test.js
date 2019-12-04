import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Andreas',
    url: 'Link',
    likes: 25,
    user: {
      username: 'SoulAdor',
      name: 'Andrew Niedens',
      id: '5ddbea2e218ee93cecc4a12f'
    }
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={blog.user}/>
    )
  })

  test('renders title and author', () => {
    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
    const div = component.getByText(`${blog.title} ${blog.author}`)
    expect(div).not.toHaveStyle('display: none')
  })

  test('does not render other parts', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('renders other parts after pressing button and after another press hides them', () => {
    const div = component.getByText(`${blog.title} ${blog.author}`)
    const togglableDiv = component.container.querySelector('.togglableContent')

    expect(togglableDiv).toHaveStyle('display: none')
    fireEvent.click(div)
    expect(togglableDiv).not.toHaveStyle('display: none')
    fireEvent.click(div)
    expect(togglableDiv).toHaveStyle('display: none')
  })
})