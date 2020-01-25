import React from 'react'
import {render, within} from '@testing-library/react'
import {Modal} from '../modal'

test('modal shows the children', () => {
  const { getByTestId, debug } = render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
  )
  debug()
  expect(getByTestId('test')).toBeInTheDocument()
})
