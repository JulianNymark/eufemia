import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import InfoCard from '../InfoCard'
import { confetti as Confetti } from '../../../icons'

import { loadScss, axeComponent } from '../../../core/jest/jestSetup'

describe('InfoCard', () => {
  it('renders with no props', () => {
    render(<InfoCard text="text" />)

    expect(screen.queryByTestId('info-card')).not.toBeNull()
  })

  it('renders the title', () => {
    const title = 'my title'

    render(<InfoCard text="text" title={title} />)

    expect(screen.queryByTestId('info-card-title')).not.toBeNull()
    expect(screen.queryByTestId('info-card-title').textContent).toMatch(
      title
    )
  })

  it('renders the text', () => {
    const text = 'my-text'

    render(<InfoCard text={text} />)

    expect(screen.queryByTestId('info-card-text')).not.toBeNull()
    expect(screen.queryByTestId('info-card-text').textContent).toMatch(
      text
    )
  })

  it('renders the icon', () => {
    const icon = <Confetti data-testid="custom-icon" />

    render(<InfoCard text="text" icon={icon} />)

    const iconContainer = screen.queryByTestId('info-card-icon')

    expect(iconContainer).not.toBeNull()
    expect(
      within(iconContainer).queryByTestId('custom-icon')
    ).not.toBeNull()
  })

  it('renders the image', () => {
    const img_src = '/android-chrome-192x192.png'
    const img_alt = 'alt text'

    render(<InfoCard text="text" src={img_src} alt={img_alt} />)

    expect(screen.queryByRole('img').getAttribute('src')).toBe(img_src)
    expect(screen.queryByRole('img').getAttribute('alt')).toBe(img_alt)
  })

  it('renders imgProps', () => {
    const img_src = '/android-chrome-192x192.png'
    const img_width = '16'
    const img_height = '16'
    const img_alt = 'custom_alt_label'
    const imgProps = {
      width: img_width,
      height: img_height,
      src: img_src,
      alt: img_alt,
    }

    render(<InfoCard text="text" imgProps={imgProps} />)

    const infoCard = screen.queryByTestId('info-card')
    const image = within(infoCard).queryByRole('img')

    expect(image.getAttribute('src')).toBe(img_src)
    expect(image.getAttribute('alt')).toBe(img_alt)
    expect(image.getAttribute('width')).toBe(img_width)
    expect(image.getAttribute('height')).toBe(img_height)
  })

  it('does not render the buttons', () => {
    render(<InfoCard text="text" />)

    expect(screen.queryByTestId('into-card-accept-button')).toBeNull()
    expect(screen.queryByTestId('into-card-close-button')).toBeNull()
  })

  it('renders the accept button when on_accept is provided', () => {
    const onAccept = jest.fn()
    render(<InfoCard text="text" onAccept={onAccept} />)

    const buttonElement = screen.queryByTestId('into-card-accept-button')

    expect(buttonElement).not.toBeNull()

    fireEvent.click(buttonElement)

    expect(onAccept).toHaveBeenCalled()
  })

  it('renders the accept button text', () => {
    const acceptButtonText = 'some text'
    render(<InfoCard text="text" acceptButtonText={acceptButtonText} />)

    const buttonElement = screen.queryByTestId('into-card-accept-button')

    expect(buttonElement).not.toBeNull()
    expect(buttonElement.textContent).toMatch(acceptButtonText)
  })

  it('renders the close button when on_close is provided', () => {
    const onClose = jest.fn()
    render(<InfoCard text="text" onClose={onClose} />)

    const buttonElement = screen.queryByTestId('into-card-close-button')

    expect(buttonElement).not.toBeNull()

    fireEvent.click(buttonElement)

    expect(onClose).toHaveBeenCalled()
  })

  it('renders the close button text', () => {
    const closeButtonText = 'some text'
    render(<InfoCard text="text" closeButtonText={closeButtonText} />)

    const buttonElement = screen.queryByTestId('into-card-close-button')

    expect(buttonElement).not.toBeNull()
    expect(buttonElement.textContent).toMatch(closeButtonText)
  })

  it('renders the accept button with additional props', () => {
    const href = 'href'

    render(
      <InfoCard
        text="text"
        acceptButtonText="accept"
        acceptButtonAttributes={{ href }}
      />
    )

    const buttonElement = screen.queryByTestId('into-card-accept-button')

    expect(buttonElement.getAttribute('href')).toMatch(href)
  })
  it('renders the close button with additional props', () => {
    const href = 'href'

    render(
      <InfoCard
        text="text"
        closeButtonText="accept"
        closeButtonAttributes={{ href }}
      />
    )

    const buttonElement = screen.queryByTestId('into-card-close-button')

    expect(buttonElement.getAttribute('href')).toMatch(href)
  })

  describe('InfoCard aria', () => {
    it('should validate', async () => {
      const Component = render(<InfoCard text="text" />)
      expect(await axeComponent(Component)).toHaveNoViolations()
    })
  })

  describe('InfoCard scss', () => {
    it('have to match snapshot', () => {
      const scss = loadScss(require.resolve('../style/dnb-info-card.scss'))
      expect(scss).toMatchSnapshot()
    })
  })
})
