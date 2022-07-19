// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {act, render, screen} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 51.5,
      longitude: -0.1,
    },
  }

  let setReturnValue

  function useMockCurrentPosition() {
    const [state, setState] = React.useState([])
    setReturnValue = setState
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.queryByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toBeInTheDocument()
  expect(screen.getByText(/longitude/i)).toBeInTheDocument()
})

/*
eslint
  no-unused-vars: "off",
*/
