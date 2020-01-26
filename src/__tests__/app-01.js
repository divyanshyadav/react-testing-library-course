import React from 'react'
import {render} from '@testing-library/react'
import user from '@testing-library/user-event'
import {submitForm as mockSubmitForm} from '../api'
import App from '../app'

jest.mock('../api')

test('can fill form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({ success: true })

  const { findByLabelText, findByText } = render(<App />)
  const testData = {
    food: 'test food',
    drink: 'test drink'
  }

  user.click(await findByText(/fill.*form/i))
  user.type(await findByLabelText(/food/i), testData.food)
  user.click(await findByText(/next/i))
  user.type(await findByLabelText(/drink/i), testData.drink)
  user.click(await findByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  user.click(await findByText(/confirm/i, { selector: 'button' }))
  user.click(await await findByText(/home/i))
  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  expect(await findByText(/welcome/i)).toBeInTheDocument()
})