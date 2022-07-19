// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function CounterCustomComponent() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <label role="counter">{count}</label>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<CounterCustomComponent />)
  const counter = screen.getByRole('counter')
  const incrementButton = screen.getByRole('button', {name: /increment/i})
  const decrementButton = screen.getByRole('button', {name: /decrement/i})
  expect(counter).toHaveTextContent('0')
  await userEvent.click(incrementButton)
  expect(counter).toHaveTextContent('1')
  await userEvent.click(decrementButton)
  await userEvent.click(decrementButton)
  expect(counter).toHaveTextContent('-1')
})

test('test counter with step and initial count', async () => {
  let result
  function CounterWithProps(props) {
    result = useCounter(props)
    return null
  }

  render(<CounterWithProps step={2} initialCount={5} />)
  expect(result.count).toBe(5)
  act(() => result.increment())
  expect(result.count).toBe(7)
  act(() => result.decrement())
  act(() => result.decrement())
  expect(result.count).toBe(3)
})

/* eslint no-unused-vars:0 */
