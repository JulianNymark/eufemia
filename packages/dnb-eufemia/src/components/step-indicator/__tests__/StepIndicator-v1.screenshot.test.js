/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('StepIndicator screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/step-indicator/demos-v1' })

  it('have to match button mode', async () => {
    const screenshot = await testPageScreenshot({
      selector:
        '[data-visual-test="step-indicator-buttons"] .dnb-step-indicator',
    })
    expect(screenshot).toMatchImageSnapshot()
  })

  it('have to match default mode with a narrow width', async () => {
    const screenshot = await testPageScreenshot({
      style: { width: '30rem' },
      selector:
        '[data-visual-test="step-indicator-default"] .dnb-step-indicator',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
