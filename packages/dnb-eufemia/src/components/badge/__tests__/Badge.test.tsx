import React from 'react'
import { render, screen, within } from '@testing-library/react'
import Badge from '../Badge'
import { confetti as Confetti } from '../../../icons'
import Icon from '../../Icon'
import Avatar from '../../Avatar'

import { loadScss, axeComponent } from '../../../core/jest/jestSetup'

describe('Badge', () => {
  it('renders without properties', () => {
    render(<Badge />)

    expect(screen.queryByTestId('badge')).not.toBeNull()
  })

  it('renders content as text', () => {
    const string = 'A'
    render(<Badge content={string} />)

    expect(screen.queryByTestId('badge').textContent).toBe(string)
  })

  it('renders content as number', () => {
    const number = 1
    render(<Badge content={number} />)

    expect(screen.queryByTestId('badge').textContent).toBe(
      number.toString()
    )
  })

  it('renders class "has-text" when string or number as content', () => {
    const string = 'BC'

    render(<Badge content={string} />)

    expect(
      screen
        .queryByTestId('badge')
        .classList.contains('dnb-badge--has-text')
    ).toBe(true)
  })

  it('renders 99+ when content is over 99 number', () => {
    const number = 100
    render(<Badge content={number} />)

    expect(screen.queryByTestId('badge').textContent).toBe('99+')
  })

  it('renders children/Icon as content', () => {
    render(
      <Badge
        size="large"
        content={<Icon icon={Confetti} data-testid="confetti-icon" />}
        variant="secondary"
      >
        <Avatar>A</Avatar>
      </Badge>
    )

    const badgeRoot = screen.queryByTestId('badge-root')
    expect(within(badgeRoot).queryByTestId('confetti-icon')).not.toBeNull()
  })
  describe('default values', () => {
    it('has variant primary as default', () => {
      render(<Badge />)
      expect(
        screen
          .queryByTestId('badge')
          .classList.contains('dnb-badge--primary')
      ).toBe(true)
    })

    it('has horizontal right as default', () => {
      render(<Badge />)
      expect(
        screen
          .queryByTestId('badge')
          .classList.contains('dnb-badge--horizontal-right')
      ).toBe(true)
    })

    it('has vertical bottom as default', () => {
      render(<Badge />)
      expect(
        screen
          .queryByTestId('badge')
          .classList.contains('dnb-badge--vertical-bottom')
      ).toBe(true)
    })

    it('has size medium as default', () => {
      render(<Badge />)
      expect(
        screen
          .queryByTestId('badge')
          .classList.contains('dnb-badge--size-medium')
      ).toBe(true)
    })
  })
})

describe('Badge aria', () => {
  it('should validate', async () => {
    const Component = render(<Badge content="1" />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Badge scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-badge.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-badge-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
