// testing custom hooks
// http://localhost:3000/counter-hook

import {act, renderHook} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  const {result} = renderHook(() => useCounter())
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  act(() => result.current.decrement())
  expect(result.current.count).toBe(-1)
})

test('test counter with step and initial count', async () => {
  const {result} = renderHook(props => useCounter(props), {
    initialProps: {
      initialCount: 5,
      step: 2,
    },
  })
  expect(result.current.count).toBe(5)
  act(() => result.current.increment())
  expect(result.current.count).toBe(7)
  act(() => result.current.decrement())
  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})

/* eslint no-unused-vars:0 */
