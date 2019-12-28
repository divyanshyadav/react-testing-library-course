import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { GreetingLoader } from '../greeting-loader-01-mocking'
import { loadGreeting as mockLoadGreeting } from '../api'

jest.mock('../api')

test('loads greeting on click', async () => {
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({ data: { greeting: testGreeting }})
  const { getByLabelText, getByText } = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load greeting/i)
  nameInput.value = 'mary'

  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toBeCalledWith('mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await wait(() => 
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting))
})