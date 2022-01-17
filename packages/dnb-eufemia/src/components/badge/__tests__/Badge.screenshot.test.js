/**
 * Screenshot Test
 * This file will not run on "test:staged" because we don't require any related files
 */

import {
  testPageScreenshot,
  setupPageScreenshot,
} from '../../../core/jest/jestSetupScreenshots'

describe('Badge screenshot', () => {
  setupPageScreenshot({ url: '/uilib/components/badge/demos' })
  describe('size', () => {
    it('have to match default size', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-size-default"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match small size', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-size-small"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match medium size', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-size-medium"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match large size', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-size-large"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match x-large size', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-size-x-large"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
  describe('variant', () => {
    it('have to match default variant', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-variant-default"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match primary variant', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-variant-primary"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match secondary variant', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-variant-secondary"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match tertiary variant', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-variant-tertiary"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
  describe('positioning', () => {
    it('have to match default positioning', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-horizontal-vertical-default"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match top left positioning', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-top-left"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match top right positioning', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-top-right"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match bottom left positioning', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-bottom-left"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match bottom right positioning', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-bottom-right"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
  describe('alternatives', () => {
    it('have to match alternative having avatar as a child', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-alternative-avatar"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match alternative having payment card as a child', async () => {
      const screenshot = await testPageScreenshot({
        selector:
          '[data-visual-test="badge-alternative-payment-card"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match alternative having icon as a child', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-alternative-icon"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
    it('have to match alternative having img as a child', async () => {
      const screenshot = await testPageScreenshot({
        selector: '[data-visual-test="badge-alternative-img"] .dnb-badge',
      })
      expect(screenshot).toMatchImageSnapshot()
    })
  })
})
