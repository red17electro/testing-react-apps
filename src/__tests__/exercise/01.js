// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  const root = createRoot(div)
  act(() => root.render(<Counter />))
  const [decrementButton, incrementButton] = div.querySelectorAll('button')
  const messageDiv = div.firstChild.querySelector('div')

  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  expect(messageDiv.textContent).toBe('Current count: 0')
  act(() => incrementButton.dispatchEvent(clickEvent))
  expect(messageDiv.textContent).toBe('Current count: 1')
  act(() => decrementButton.dispatchEvent(clickEvent))
  expect(messageDiv.textContent).toBe('Current count: 0')
})

/* eslint no-unused-vars:0 */
