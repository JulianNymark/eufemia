import React from 'react'
import { render, screen } from '@testing-library/react'
import Drawer from '../Drawer'

describe('Drawer', () => {
  it('renders without properties', () => {
    render(<Drawer>hello</Drawer>)
  })
})
