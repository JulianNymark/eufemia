/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../core/jest/jestSetupScreenshots'

const styleSelector = '[data-visual-test="table-classes"] .dnb-table'

describe('Table screenshot', () => {
  setupPageScreenshot({ url: '/uilib/elements/tables' })

  it('have to match a sortable table header on hover', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    const screenshot = await testPageScreenshot({
      style: {
        'background-color': 'white',
      },
      styleSelector,
      selector,
      simulateSelector: `${selector} button.dnb-button`,
      simulate: 'hover',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match the default choice of table styles', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '40rem',
      },
      selector: '[data-visual-test="table-default"] .dnb-table',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a sortable table header on focus', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    const screenshot = await testPageScreenshot({
      style: {
        'background-color': 'white',
      },
      styleSelector,
      selector,
      simulateSelector: `${selector} button.dnb-button`,
      simulate: 'focus', // should be tested first
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match header with wrapped text', async () => {
    const selector = '[data-visual-test="table-header"] .dnb-table'
    const screenshot = await testPageScreenshot({
      style: {
        width: '20rem',
      },
      styleSelector,
      selector,
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a sortable table header on active', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--reversed'
    const screenshot = await testPageScreenshot({
      style: {
        // display:'block',
        'background-color': 'white',
      },
      styleSelector,
      selector,
      simulateSelector: `${selector} button.dnb-button`,
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match a active sortable table header on active state', async () => {
    const selector =
      '[data-visual-test="table-classes"] th.dnb-table--sortable.dnb-table--active'
    const screenshot = await testPageScreenshot({
      style: {
        'background-color': 'white',
      },
      styleSelector,
      selector,
      simulateSelector: `${selector} button.dnb-button`,
      simulate: 'active',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})

describe('Table with skeleton screenshot', () => {
  setupPageScreenshot({ url: '/uilib/elements/tables?skeleton' })

  it('have to match default table', async () => {
    const screenshot = await testPageScreenshot({
      style: {
        width: '40rem',
      },
      selector: '[data-visual-test="table-default"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
