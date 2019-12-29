import React from 'react'
import {render} from '@testing-library/react'
import {ErrorBoundary} from '../error-boundary'
import {reportError as mockReportError} from '../api'

jest.mock('../api')

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()
})

const Bomb = props => {
  if (props.blow) {
    throw new Error('blast')
  }

  return 'fine'
}

test('calls reportError and renders there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {getByText, rerender, getByRole} = render(
      <Bomb />,
    { wrapper: ErrorBoundary }
  )

  expect(getByText(/fine/i)).toBeInTheDocument()

  rerender(
    <Bomb blow />
  )
  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}

  expect(mockReportError).toBeCalledWith(error, info)
  expect(mockReportError).toBeCalledTimes(1)
  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  )
})
