import React from 'react'
import { render, act } from '@testing-library/react'
import { useCounter } from '../use-counter'

function setup({ initialProps } = {}) {
  const result = {}

  function TestComponent(props) {
    result.current = useCounter(props)
    return null
  }
  
  render(<TestComponent {...initialProps} />)
  return result

}

test('exposes count and increment/decrement functions and all should function correctly', () => {
  const result = setup()

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
})

test('allow customization of initial count', () => {
  const result = setup({ initialProps: { initialCount: 2 } })
  expect(result.current.count).toBe(2)
})

test('allow customization of step', () => {
  const result = setup({ initialProps: { step: 2 } })

  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
})