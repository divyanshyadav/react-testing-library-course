import React from 'react'
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import {render as rtlRender, fireEvent} from '@testing-library/react'
import {Counter} from '../redux-counter'
import { reducer } from '../redux-reducer'

function render(ui, { 
  initialState,
  store = createStore(reducer, initialState),
  ...rtlOptions
} = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, {
    wrapper: Wrapper,
    ...rtlOptions,
  })
}

test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(<Counter />)
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

test('render with redux with custom initial state', () => {
  const {getByLabelText, getByText} = render(<Counter />,
    { initialState: { count: 3 } })
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('4')
})