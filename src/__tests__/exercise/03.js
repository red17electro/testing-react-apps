// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import Counter from '../../components/counter'
import userEvent from '@testing-library/user-event'

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />)
  const message = screen.getByText(/current count/i)
  expect(message).toHaveTextContent('Current count: 0')
  await userEvent.click(screen.getByRole('button', {name: /increment/i}))
  expect(message).toHaveTextContent('Current count: 1')
  await userEvent.click(screen.getByRole('button', {name: /decrement/i}))
  expect(message).toHaveTextContent('Current count: 0')
})
