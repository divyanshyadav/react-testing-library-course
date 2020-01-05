import React from 'react'
import { render as rtlRender, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import { Main } from '../main'

function render(ui, { 
  route = '/',
  history = createMemoryHistory({ initialEntries: [route] }),
  ...renderOptions 
} = {}) {
  function Wrapper({ children }) {
    return (
      <Router history={history}>
        {children}
      </Router>
    )
  }

  return { 
    history, 
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
  }
}

test('main renders home and about and I can navigate to those pages', () => {
  const { getByRole, getByText } = render(<Main />)

  expect(getByRole('heading')).toHaveTextContent(/home/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on bad page shows 404 page', () => {
  const { getByRole } = render(<Main />, { 
    route: '/route-does-not-exists' 
  })

  expect(getByRole('heading')).toHaveTextContent(/404/i)
})