import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import  { HiddenMessage } from '../hidden-message'

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: props => props.in ? props.children : null
  } 
})


test('shows hidden message when toggle is clicked', () => {
  const message = 'hello'
  const { getByText, queryByText } = render(
    <HiddenMessage>{message}</HiddenMessage>
  )
  expect(queryByText(/hello/i)).not.toBeInTheDocument()
  
  const toggleButton = getByText(/toggle/i)

  fireEvent.click(toggleButton)
  expect(getByText(/hello/i)).toBeInTheDocument()
  
  fireEvent.click(toggleButton)
  expect(queryByText(/hello/i)).not.toBeInTheDocument()
})
