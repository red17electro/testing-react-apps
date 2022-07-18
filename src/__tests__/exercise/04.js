// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  let submittedData
  const handleSubmit = data => (submittedData = data)
  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)

  const testUsername = 'red17electro';
  const testPassword = 'password';

  await userEvent.type(username, testUsername)
  await userEvent.type(password, testPassword)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(submittedData).toEqual({
    username: testUsername,
    password: testPassword,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
