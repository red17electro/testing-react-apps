// form testing
// http://localhost:3000/login

import * as React from 'react'
import {build, fake} from '@jackfranklin/test-data-bot'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

const userBuilder = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const user = userBuilder({
    overrides: {
      password: '123',
    },
  })

  await userEvent.type(screen.getByLabelText(/username/i), user.username)
  await userEvent.type(screen.getByLabelText(/password/i), user.password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith({
    username: user.username,
    password: user.password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
