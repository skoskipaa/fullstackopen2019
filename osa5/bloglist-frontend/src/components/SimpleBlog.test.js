import React from 'react'
//import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'



//afterEach(cleanup)
const blog = {
  title: 'You Look Fab!',
  author: 'The Fab Team',
  likes: 8500
}

test('blog title, author and likes are rendered', () => {

  const component = render(
    <SimpleBlog blog={blog} />
  )

  //component.debug()

  expect(component.container).toHaveTextContent(
    'You Look Fab!'
  )

  const element = component.getByText(
    'The Fab Team'
  )
  expect(element).toBeDefined()


  const div = component.container.querySelector('.likes')
  expect(div)
    .toHaveTextContent(
      '8500'
    )
})

test('clicking the button calls the event handler once', async () => {
  const mockHandler = jest.fn()
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})