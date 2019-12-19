import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'You Look Fab!',
  author: 'The Fab Team',
  url: 'www.ylf.com',
  likes: 8500,
  user: {
    username: 'iines',
    name: 'Iines Ankka'
  }
}
const user = {
  username: 'iines',
  token: '1234567890',
  name: 'Iines Ankka'
}

localStorage.setItem('loggedUser', JSON.stringify(user))
const who = localStorage.getItem('loggedUser')

let component

beforeEach(() => {
  component = render(
    <Blog blog={blog} loggedUser={who} />
  )
})


test('url and likes are hidden at first', () => {
  const div = component.container.querySelector('.hiddenContent')
  //component.debug()
  expect(div).toHaveStyle('display: none')

})

test('when the title is clicked the rest is shown', () => {
  const clickableText = component.container.querySelector('.defaultText')
  fireEvent.click(clickableText)
  const div = component.container.querySelector('.hiddenContent')
  //component.debug()
  expect(div).not.toHaveStyle('display: none')
})


