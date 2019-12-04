import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('../services/blogs')
import App from './App'

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: () => {
    savedItems = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    await waitForElement(() => component.container.querySelector('.Login'))

    //const blogs = component.container.querySelectorAll('.blogs')

    // expectations here
    expect(component.container.querySelector('.Login')).toBeTruthy()
    expect(component.container.querySelector('.Blogs')).toBeNull()
  })

  test('if user is logged, login is not rendered and blogs are', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(() => component.container.querySelector('.Blogs'))

    // expectations here
    expect(component.container.querySelector('.Login')).toBeNull()
    expect(component.container.querySelector('.Blogs')).toBeTruthy()

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'HTML is easy'
    )
    expect(component.container).toHaveTextContent(
      'Browser can execute only javascript'
    )
    expect(component.container).toHaveTextContent(
      'The most important methods of HTTP are GET and POST'
    )
  })
})