import React from 'react'
import { render } from '@testing-library/react'
import Dialog from '../Dialog'

describe('Dialog', () => {
  it('renders without properties', () => {
    render(<Dialog>hello</Dialog>)
  })
})
