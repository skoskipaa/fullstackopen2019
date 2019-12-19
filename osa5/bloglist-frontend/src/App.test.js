import React from 'react'
import { render, waitForElement } from '@testing-library/react'
//jest.mock('./services/__mocks__/blogs')
import App from './App'

describe('<App />', () => {
  test('when not logged in, blogs are not shown', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('login')
    )
    const blogs = component.container.querySelectorAll('.defaultText')

    expect(blogs.length).toBe(0)

  })
  test('when logged in, blogs are shown', async () => {

    const user = {
      username: 'iines',
      token: '1234567890',
      name: 'Iines Ankka'
    }
    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(<App />)
    console.log(localStorage.getItem('loggedUser'))
    await waitForElement(
      () => component.getByText('Blogs')
    )

    const blogs = component.container.querySelectorAll('.defaultText')
    expect(blogs.length).toBe(3)

  })

})