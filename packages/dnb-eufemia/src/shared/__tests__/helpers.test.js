/**
 * Global helpers tests
 *
 */

import {
  setPageFocusElement,
  applyPageFocus,
  scrollToLocationHashId,
  copyToClipboard,
  getSelectedElement,
  hasSelectedText,
  getSelectedText,
  insertElementBeforeSelection,
  debounce,
  isIE11,
  isEdge,
  isiOS,
  isSafari,
  isWin,
  isMac,
  isLinux,
  warn,
} from '../helpers'

import { mockGetSelection } from '../../core/jest/jestSetup'

// make it possible to change the navigator lang
// because "navigator.language" defaults to en-GB
let userAgentGetter, platformGetter

beforeAll(() => {
  userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
  platformGetter = jest.spyOn(window.navigator, 'platform', 'get')

  mockGetSelection()
})

const bodyElement = document.body
bodyElement.insertAdjacentHTML(
  'afterbegin',
  `<div class="focus-content">My Content</div>`
)
bodyElement.insertAdjacentHTML(
  'afterbegin',
  `<div id="scroll-hash">My Content</div>`
)

beforeAll(() => {
  setPageFocusElement('.focus-content', 'content')
  applyPageFocus('content')
})

describe('"applyPageFocus" should', () => {
  const focusElement = document.querySelector('.focus-content')
  it('set a focus on the given element', () => {
    expect(focusElement === document.activeElement).toBe(true)
  })
  it('have attribute "tabindex" with the value -1', () => {
    expect(focusElement.getAttribute('tabindex')).toBe('-1')
  })
  it('have a css class called "dnb-no-focus"', () => {
    expect(focusElement.getAttribute('class')).toContain('dnb-no-focus')
  })
})

describe('"scrollToLocationHashId" should', () => {
  window.location.hash = '#scroll-hash'
  const scrollElement = document.querySelector('#scroll-hash')
  it('have a valid dom element', () => {
    expect(scrollElement instanceof HTMLElement).toBe(true)
  })
  it('set a focus on the given element', () => {
    const offset = 100
    let mock = null
    window.scrollTo = (result) => {
      mock = result
    }
    scrollToLocationHashId({ offset })
    expect(typeof mock).toBe('object')
    expect(typeof mock).not.toBe(null)
    const { top, behavior } = mock
    expect(top).toBe(-offset) // NB: minus!
    expect(behavior).toBe('smooth')
  })
})

describe('platform', () => {
  it('"isMac" should result in true', () => {
    platformGetter.mockReturnValue('Mac')
    expect(isMac()).toBe(true)
  })
  it('"isWin" should result in true', () => {
    platformGetter.mockReturnValue('Win')
    expect(isWin()).toBe(true)
  })
  it('"isLinux" should result in true', () => {
    platformGetter.mockReturnValue('Linux')
    expect(isLinux()).toBe(true)
  })
  it('"isiOS" should result in true', () => {
    platformGetter.mockReturnValue('iPhone')
    expect(isiOS()).toBe(true)

    platformGetter.mockReturnValue('iPad')
    expect(isiOS()).toBe(true)
  })
})

describe('user agent', () => {
  it('"isIE11" should result in false (no function)', () => {
    navigator.maxTouchPoints = 2
    expect(isIE11()).toBe(false)
  })
  it('"isEdge" should result in true', () => {
    userAgentGetter.mockReturnValue('Edge')
    expect(isEdge()).toBe(true)
  })
  it('"isSafari" should result in true', () => {
    userAgentGetter.mockReturnValue('Safari')
    expect(isSafari()).toBe(true)

    userAgentGetter.mockReturnValue('Safari Chrome')
    expect(isSafari()).toBe(false)
  })
})

describe('"copyToClipboard" should', () => {
  it('make valid copy', async () => {
    await copyToClipboard('copy')
    expect(await navigator.clipboard.readText()).toBe('copy')
  })
})

describe('selection related methods', () => {
  it('getSelectedElement should return HTML element', () => {
    expect(getSelectedElement() instanceof HTMLElement).toBe(true)
  })
  it('getSelectedText should return numbers', () => {
    expect(getSelectedText()).toBe('1234.56')
  })
  it('hasSelectedText should be true', () => {
    expect(hasSelectedText()).toBe(true)
  })
  it('insertElementBeforeSelection should be true', () => {
    const elem = document.createElement('div')
    insertElementBeforeSelection(elem)
    expect(
      window.getSelection().getRangeAt(1).getElement() instanceof
        HTMLElement
    ).toBe(true)
  })
})

describe('"debounce" should', () => {
  it('delay execution', (done) => {
    let outside = 'one'

    debounce(({ inside }) => {
      outside = inside
      expect(outside).toBe('two')
    }, 1)({ inside: 'two' })

    expect(outside).toBe('one')

    setTimeout(() => {
      done()
    }, 2)
  })
  it('delay execution immediate', (done) => {
    let outside = 'one'

    debounce(
      ({ inside }) => {
        expect(outside).toBe('one')
        outside = inside
        expect(outside).toBe('two')
      },
      1,
      { immediate: true }
    )({ inside: 'two' })

    expect(outside).toBe('two')

    setTimeout(() => {
      done()
    }, 2)
  })
})

describe('"warn" should', () => {
  const log = global.console.log

  beforeEach(() => {
    global.console.log = jest.fn()
  })

  afterEach(() => {
    global.console.log = log

    jest.resetAllMocks()
  })

  it('run console.log in development', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    warn('message-1', 'message-2')

    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(
      '%cEufemia',
      'padding: 0.125rem 0.5rem 0;font-weight: bold;color: #00343E;background: #A5E1D2',
      'message-1',
      'message-2'
    )

    process.env.NODE_ENV = env
  })

  it('run console.log in test', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'test'

    warn('message-1', 'message-2')

    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(
      '\u001b[0m\u001b[1m\u001b[38;5;23m\u001b[48;5;152mEufemia\u001b[49m\u001b[39m\u001b[22m\u001b[0m',
      'message-1',
      'message-2'
    )

    process.env.NODE_ENV = env
  })

  it('run not log if NODE_ENV is production', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    warn('message-1', 'message-2')

    expect(global.console.log).toHaveBeenCalledTimes(0)

    process.env.NODE_ENV = env
  })

  it('run not use styles when not in browser', () => {
    const windowSpy = jest.spyOn(window, 'window', 'get')
    windowSpy.mockImplementation(() => undefined)

    warn('message-1', 'message-2')

    expect(global.console.log).toHaveBeenCalledTimes(1)
  })

  it('run not log if NODE_ENV is production', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    warn('message-1', 'message-2')

    expect(global.console.log).toHaveBeenCalledTimes(0)

    process.env.NODE_ENV = env
  })
})
