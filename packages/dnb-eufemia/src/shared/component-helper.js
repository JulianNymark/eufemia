/**
 * Component helpers
 *
 */

import React from 'react'
import keycode from 'keycode'
import whatInput from 'what-input'
import { registerElement } from './custom-element'
import {
  warn,
  IS_IE11,
  PLATFORM_MAC,
  PLATFORM_WIN,
  PLATFORM_LINUX,
} from './helpers'
import { init } from './Eufemia'

export { registerElement, warn }

init()

if (
  typeof process !== 'undefined' &&
  process.env.NODE_ENV === 'test' &&
  typeof window !== 'undefined'
) {
  window.IS_TEST = true
}

// run component helper functions
whatInput.specificKeys([9])
defineNavigator()

/**
 * Check if device is touch device or not
 */
export function isTouchDevice() {
  if (typeof document !== 'undefined') {
    let intent = false
    try {
      intent = document.documentElement.getAttribute('data-whatintent')
    } catch (e) {
      //
    }
    return intent === 'touch'
  }
  return false
}

export function defineNavigator() {
  const handleNavigator = () => {
    if (
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      typeof navigator === 'undefined'
    ) {
      return
    }

    try {
      if (!(typeof window !== 'undefined' && window.IS_TEST)) {
        if (navigator.platform.match(new RegExp(PLATFORM_MAC)) !== null) {
          document.documentElement.setAttribute('data-os', 'mac')
        } else if (
          navigator.platform.match(new RegExp(PLATFORM_WIN)) !== null
        ) {
          document.documentElement.setAttribute('data-os', 'win')
        } else if (
          navigator.platform.match(new RegExp(PLATFORM_LINUX)) !== null
        ) {
          document.documentElement.setAttribute('data-os', 'linux')
        }
      } else {
        document.documentElement.setAttribute('data-os', 'other')
      }
    } catch (e) {
      warn(e)
    }

    document.removeEventListener('DOMContentLoaded', handleNavigator)
  }

  if (
    typeof document !== 'undefined' &&
    document.readyState === 'loading'
  ) {
    document.addEventListener('DOMContentLoaded', handleNavigator)
  } else {
    handleNavigator()
  }
}

export const validateDOMAttributes = (props, params) => {
  // if there is an "attributes" prop, prepare these
  // mostly used for prop example usage
  if (props && props.attributes) {
    let attr = props.attributes
    if (attr) {
      if (attr[0] === '{') {
        attr = JSON.parse(attr)
      }
      if (attr && typeof attr === 'object') {
        Object.entries(attr).forEach(([key, value]) => {
          Object.assign(params, { [key]: value })
        })
      }
      delete params.attributes
    }
  }

  // remove disabled, in case it is false (this is for web components support)
  if (params.disabled === null || params.disabled === 'false') {
    delete params.disabled
  }
  if (typeof params.space !== 'undefined') {
    delete params.space
  }
  if (typeof params.top !== 'undefined') {
    delete params.top
  }
  if (typeof params.right !== 'undefined') {
    delete params.right
  }
  if (typeof params.bottom !== 'undefined') {
    delete params.bottom
  }
  if (typeof params.left !== 'undefined') {
    delete params.left
  }
  if (typeof params.no_collapse !== 'undefined') {
    delete params.no_collapse
  }

  // in case disabled is a string, it its enabled, send it in as a true (this is for web components support)
  else if (params.disabled === 'true') {
    params.disabled = true
  }
  if (params.disabled === true) {
    params['aria-disabled'] = true
  }

  if (props && props.tabindex) {
    let tabIndex = props.tabindex
    if (tabIndex === 'off') {
      tabIndex = '-1'
    }
    params['tabIndex'] = tabIndex
  }

  // make sure we don't return a render prop as a DOM attribute
  if (params && typeof params === 'object') {
    for (const i in params) {
      if (
        // is React
        typeof params[i] === 'function' &&
        // only React Style props, like onClick are allowed
        !/(^[a-z]{1,}[A-Z]{1})/.test(i)
      ) {
        delete params[i]

        // filter out invalid attributes
      } else if (
        // we don't want NULL values
        params[i] === null ||
        // we don't want
        /[^a-z-]/i.test(i)
        // (typeof params[i] !== 'string' && /[^a-z-]/i.test(i))
      ) {
        delete params[i]
      }
    }
  }

  return params
}

export const processChildren = (props) => {
  if (!props) {
    return null
  }

  // If used in WB, call functions who starts with "render_"
  if (
    typeof global !== 'undefined' &&
    Array.isArray(global.registeredElements) &&
    global.registeredElements.length > 0
  ) {
    let cache = null
    Object.entries(props)
      .reverse()
      .map(([key, cb]) => {
        if (key.includes('render_') && /^render_/.test(key)) {
          if (typeof cb === 'function') {
            if (cache) {
              if (Object.isFrozen(props)) {
                props = { ...props }
              }
              props.children = cache
            }
            return (cache = (
              <React.Fragment key={key}>{cb(props)}</React.Fragment>
            ))
          }
        }

        return null
      })
      .filter(Boolean)
    if (cache) {
      return cache
    }
  }

  const res =
    typeof props.children === 'function'
      ? props.children(props)
      : props.children

  // if we get several react children which represents only a text
  if (Array.isArray(res)) {
    const onlyTexts = res.reduce((pV, cV) => {
      if (typeof cV === 'string' || typeof cV === 'number') {
        pV.push(cV)
      }
      return pV
    }, [])

    // if there was one or more text elements
    if (onlyTexts.length === res.length && onlyTexts.length > 0) {
      return onlyTexts.join('')
    }
  }

  return res
}

// extends given objects recursively and removes entries with null values
// makes sure that we by default return a totally new object every time
export const extend = (...objects) => {
  let first = {}
  const keepRef = objects[0]

  if (keepRef === true || keepRef === false) {
    // remove settings value
    objects.shift()

    if (keepRef) {
      // by extracting the first, we keep the same main object reference
      first = objects.shift()
    }
  }

  return objects.reduce((acc1, object) => {
    if (object) {
      acc1 = Object.assign(
        acc1,
        Object.entries(object).reduce((acc2, [key, value]) => {
          if (value !== null) {
            // go recursively
            if (typeof value === 'object') {
              value = extend(acc1[key] || {}, value)
              if (Object.keys(value).length > 0) {
                acc2[key] = value
              }
            } else {
              acc2[key] = value
            }
          }
          return acc2
        }, {})
      )
    }
    return acc1
  }, first)
}

// extends props from a given context
// but give the context second priority only
export const extendPropsWithContext = (
  props,
  defaults = {},
  ...contexts
) => {
  const context = contexts.reduce((acc, cur) => {
    if (cur) {
      acc = { ...acc, ...cur }
    }
    return acc
  }, {})

  return {
    ...props,
    ...Object.entries(context).reduce((acc, [key, value]) => {
      if (
        // check if a prop of the same name exists
        typeof props[key] !== 'undefined' &&
        // and if it was NOT defined as a component prop, because its still the same as the defaults
        props[key] === defaults[key]
      ) {
        // then we use the context value
        acc[key] = value
      }
      return acc
    }, {}),
  }
}

// check if value is "truthy"
export const isTrue = (value) => {
  if (
    value !== null &&
    typeof value !== 'undefined' &&
    (String(value) === 'true' || String(value) === '1')
  ) {
    return true
  }
  return false
}

export const dispatchCustomElementEvent = (
  src,
  eventName,
  eventObjectOrig
) => {
  let ret = undefined

  const eventObject = {
    ...((eventObjectOrig && eventObjectOrig.event) || {}),
    ...eventObjectOrig,
  }

  // distribute dataset like "data-*" to both currentTarget and target
  if (eventObject && eventObject.attributes && eventObject.event) {
    const currentTarget = eventObject.event.currentTarget
    if (currentTarget) {
      try {
        // 1. create new dataset, and copy if exists
        const dataset = { ...(currentTarget.dataset || {}) }

        // 2. copy in our attributes if they are of "data-" type
        const attributes = { ...eventObject.attributes }
        for (const i in attributes) {
          if (/^data-/.test(i)) {
            dataset[String(i).replace(/^data-/, '')] = attributes[i]
          }
        }

        // 3. and distribute them to the targets. Use the for method because of immutability
        for (const i in dataset) {
          if (eventObject.event.currentTarget.dataset) {
            eventObject.event.currentTarget.dataset[i] = dataset[i]
          }
          if (
            eventObject.event.target &&
            eventObject.event.target.dataset
          ) {
            eventObject.event.target.dataset[i] = dataset[i]
          }
        }
      } catch (e) {
        warn('Error on handling dataset:', e)
      }
    }
  }

  const props = (src && src.props) || src

  // call Web Component events
  if (props.custom_element) {
    if (typeof props.custom_element.fireEvent === 'function') {
      ret = props.custom_element.fireEvent(eventName, eventObject)
    }
  }

  // call the default snake case event
  if (eventName.includes('_')) {
    if (typeof props[eventName] === 'function') {
      const r = props[eventName].apply(src, [eventObject])
      if (typeof r !== 'undefined') {
        ret = r
      }
    }

    // call Synthetic React event camelCase naming events
    eventName = toCamelCase(eventName)
    if (typeof props[eventName] === 'function') {
      const r = props[eventName].apply(src, [eventObject])
      if (typeof r !== 'undefined') {
        ret = r
      }
    }
  } else {
    if (typeof props[eventName] === 'function') {
      const r = props[eventName].apply(src, [eventObject])
      if (typeof r !== 'undefined') {
        ret = r
      }
    }

    // call (in future deprecated) event snake case naming events
    eventName = toSnakeCase(eventName)
    if (typeof props[eventName] === 'function') {
      const r = props[eventName].apply(src, [eventObject])
      if (typeof r !== 'undefined') {
        ret = r
      }
    }
  }

  return ret
}

// transform on_click to onClick
export const toCamelCase = (s) =>
  s
    .split(/_/g)
    .reduce(
      (acc, cur, i) =>
        acc +
        (i === 0
          ? cur
          : cur.replace(
              /(\w)(\w*)/g,
              (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
            )),
      ''
    )

// TODO: Test if this solution is faster
// const toCamelCase = (str) =>
//   str.replace(/([-_][a-z])/g, (group) =>
//     group.toUpperCase().replace('-', '').replace('_', '')
//   )

// transform my_component to MyComponent
export const toPascalCase = (s) =>
  s
    .split(/_/g)
    .reduce(
      (acc, cur) =>
        acc +
        cur.replace(
          /(\w)(\w*)/g,
          (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
        ),
      ''
    )

// transform MyComponent to my_component
export const toSnakeCase = (str) =>
  str.replace(/\B[A-Z]/g, (letter) => `_${letter}`).toLowerCase()

// transform MyComponent to my-component
export const toKebabCase = (str) =>
  str.replace(/\B[A-Z]/g, (letter) => `-${letter}`).toLowerCase()

// Removed as we now run function props from Web Components (custom-element)
// export const pickRenderProps = (props, renderProps) =>
//   Object.entries(props)
//     .filter(([key, value]) => {
//       if (
//         typeof renderProps[key] !== 'undefined' || // TODO: remove this because of security notation
//         key === 'children' ||
//         key === 'custom_method'
//       )
//         return false
//       return typeof value === 'function'
//     })
//     .reduce((obj, [key, value]) => {
//       obj[key] = value // TODO: remove this because of security notation
//       return obj
//     }, {})

/**
 * [detectOutsideClick Detects a click outside a given DOM element]
 * @param  {[type]} ignoreElement [The element we want to protect from a click]
 * @param  {[type]} onSuccess     [Will be called on outside click]
 * @return {[type]}               [void]
 */
export const detectOutsideClick = (ignoreElements, onSuccess, options) =>
  new DetectOutsideClickClass(ignoreElements, onSuccess, options)

// Used by detectOutsideClick
export class DetectOutsideClickClass {
  constructor(ignoreElements, onSuccess, options = {}) {
    if (
      !this.handleClickOutside &&
      typeof document !== 'undefined' &&
      typeof window !== 'undefined'
    ) {
      if (!Array.isArray(ignoreElements)) {
        ignoreElements = [ignoreElements]
      }
      this.handleClickOutside = (event) => {
        this.checkOutsideClick(
          {
            event,
            ignoreElements,
          },
          () => typeof onSuccess === 'function' && onSuccess({ event })
        )
      }
      document.addEventListener('mousedown', this.handleClickOutside)

      this.keydownCallback = (event) => {
        const keyCode = keycode(event)
        if (keyCode === 'esc') {
          window.removeEventListener('keydown', this.keydownCallback)
          if (typeof onSuccess === 'function') {
            onSuccess({ event })
          }
        }
      }
      window.addEventListener('keydown', this.keydownCallback)

      // e.g. includedKeys = ['tab']
      if (options.includedKeys) {
        // use keyup so we get the correct new target
        this.keyupCallback = (event) => {
          const keyCode = keycode(event)
          if (
            options.includedKeys.includes(keyCode) &&
            typeof this.handleClickOutside === 'function'
          ) {
            this.handleClickOutside(event, () => {
              if (this.keyupCallback)
                window.removeEventListener('keyup', this.keyupCallback)
            })
          }
        }
        window.addEventListener('keyup', this.keyupCallback)
      }
    }
  }

  remove() {
    if (this.handleClickOutside && typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.handleClickOutside)
      this.handleClickOutside = null
    }
    if (this.keydownCallback && typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.keydownCallback)
      this.keydownCallback = null
    }
    if (this.keyupCallback && typeof window !== 'undefined') {
      window.removeEventListener('keyup', this.keyupCallback)
      this.keyupCallback = null
    }
  }

  checkOutsideClick = ({ event, ignoreElements }, onSuccess = null) => {
    try {
      const currentElement = event.target

      // we also check if currentElement is documentElement
      // and if it has scrollbars, we then ignore the click
      if (
        currentElement?.tagName === 'HTML' &&
        (event.pageX > document.documentElement.clientWidth - 40 ||
          event.pageY > document.documentElement.clientHeight - 40)
      ) {
        return // stop here
      }

      // check if element has e.g. "overflow: scroll"
      if (checkIfHasScrollbar(currentElement)) {
        return // stop here
      }

      // check the rest
      for (let i = 0, elem, l = ignoreElements.length; i < l; ++i) {
        elem = currentElement
        if (!ignoreElements[i]) {
          continue
        }
        do {
          if (elem === ignoreElements[i]) {
            return // stop here
          }
          elem = elem && elem.parentNode
        } while (elem)
      }

      if (typeof onSuccess === 'function') {
        onSuccess()
      }
    } catch (e) {
      warn(e)
    }
  }
}

export const checkIfHasScrollbar = (elem) => {
  return (
    elem &&
    (elem.scrollHeight > elem.offsetHeight ||
      elem.scrollWidth > elem.offsetWidth) &&
    overflowIsScrollable(elem)
  )
}
const overflowIsScrollable = (elem) => {
  const style =
    typeof window !== 'undefined' ? window.getComputedStyle(elem) : {}
  return /scroll|auto/i.test(
    (style.overflow || '') +
      (style.overflowX || '') +
      (style.overflowY || '')
  )
}

export const filterProps = (props, remove = null, allowed = null) => {
  if (Array.isArray(remove)) {
    remove = remove.reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
  }
  if (Array.isArray(allowed)) {
    allowed = allowed.reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
  }
  return Object.entries(props).reduce((acc, [k, v]) => {
    if (
      (remove && typeof remove[k] === 'undefined') ||
      (allowed && typeof allowed[k] !== 'undefined')
    ) {
      acc[k] = v
    }
    return acc
  }, {})
}

export const makeUniqueId = (prefix = '', length = 8) =>
  prefix +
  String(
    Math.random().toString(36).substr(2, length) + idIncrement++
  ).slice(-length)
let idIncrement = 0

export const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

// NB: in future we can use String.matchAll() instead
export const matchAll = (string, regex) => {
  if (typeof string.matchAll === 'function') {
    return Array.from(string.matchAll(regex))
  }
  const matches = []
  let match
  while ((match = regex.exec(string))) {
    matches.push(match)
  }
  return matches
}

/**
 * [getPreviousSibling traverses down the DOM tree until it finds the wanted element]
 * @param  {[string]} className [CSS class]
 * @param  {[HTMLElement]} element      [starting HTMLElement]
 * @return {[HTMLElement]}           [HTMLElement]
 */
export const getPreviousSibling = (className, element) => {
  try {
    const contains = (element) =>
      element && element.classList.contains(className)

    if (contains(element)) {
      return element
    }

    while (
      (element = element && element.parentElement) &&
      !contains(element)
    );
  } catch (e) {
    warn(e)
  }
  return element
}

export const isChildOfElement = (element, target, cb = null) => {
  try {
    const contains = (element) => {
      if (cb) {
        const res = cb(element)
        if (typeof res === 'boolean') {
          return res
        }
      }
      return element && element === target
    }

    if (contains(element)) {
      return element
    }

    while (
      (element = element && element.parentElement) &&
      !contains(element)
    );
  } catch (e) {
    //
  }

  return element
}

// Round number to nearest target number
export const roundToNearest = (num, target) => {
  const diff = num % target
  return diff > target / 2 ? num - diff + target : num - diff
}

export const isInsideScrollView = (
  currentElement,
  returnElement = false
) => {
  const elem = getPreviousSibling('dnb-scroll-view', currentElement)
  if (returnElement) {
    return elem == window ? null : elem
  }
  return elem == window ? false : Boolean(elem)
}

export const convertJsxToString = (elements, separator = undefined) => {
  if (!Array.isArray(elements)) {
    elements = [elements]
  }

  const process = (word) => {
    if (React.isValidElement(word)) {
      if (typeof word.props.children === 'string') {
        word = word.props.children.trim()
      } else if (Array.isArray(word.props.children)) {
        word = word.props.children.reduce((acc, word) => {
          if (typeof word !== 'string') {
            word = process(word)
          }
          if (typeof word === 'string') {
            acc = (acc + (separator || '') + word).trim()
          }
          return acc
        }, '')
      } else {
        return null
      }
    }

    return word
  }

  return elements
    .map((word) => process(word))
    .filter(Boolean)
    .join(separator)
    .trim()
}

export class InteractionInvalidation {
  constructor() {
    this.bypassElement = null
    this.bypassSelectors = []
    return this
  }

  setBypassElement(bypassElement) {
    if (bypassElement instanceof HTMLElement) {
      this.bypassElement = bypassElement
    }
    return this
  }

  setBypassSelector(bypassSelector) {
    if (!Array.isArray(bypassSelector)) {
      bypassSelector = [bypassSelector]
    }
    this.bypassSelectors = bypassSelector
    return this
  }

  activate(targetElement = null) {
    if (!this._nodesToInvalidate) {
      this._runInvalidaiton(targetElement)
    }
  }

  revert() {
    this._revertInvalidation()
    this._nodesToInvalidate = null
  }

  _runInvalidaiton(targetElement) {
    if (typeof document === 'undefined') {
      return // stop here
    }

    this._nodesToInvalidate = this.getNodesToInvalidate(targetElement)

    // 1. Save the previous tabindex and aria-hidden state so we can restore it on close
    // 2. And invalidate the node
    for (const node of this._nodesToInvalidate) {
      if (!node) {
        continue
      }

      const tabindex = node.getAttribute('tabindex')
      const ariahidden = node.getAttribute('aria-hidden')

      if (tabindex !== null && typeof node.__tabindex === 'undefined') {
        node.__tabindex = tabindex
      }
      if (
        ariahidden !== null &&
        typeof node.__ariahidden === 'undefined'
      ) {
        node.__ariahidden = ariahidden
      }

      node.setAttribute('tabindex', '-1')
      node.setAttribute('aria-hidden', 'true')
    }
  }

  _revertInvalidation() {
    if (!Array.isArray(this._nodesToInvalidate)) {
      return // stop here
    }

    // restore or remove tabindex and aria-hidden from nodes
    for (const node of this._nodesToInvalidate) {
      if (!node) {
        continue
      }

      if (typeof node.__tabindex !== 'undefined') {
        node.setAttribute('tabindex', node.__tabindex)
        delete node.__tabindex
      } else {
        node.removeAttribute('tabindex')
      }
      if (typeof node.__ariahidden !== 'undefined') {
        node.setAttribute('aria-hidden', node.__ariahidden)
        delete node.__ariahidden
      } else {
        node.removeAttribute('aria-hidden')
      }
    }
  }

  getNodesToInvalidate(targetElement = null) {
    if (typeof document === 'undefined') {
      return [] // stop here
    }

    if (typeof targetElement === 'string') {
      targetElement = document.querySelector(targetElement)
    }

    // by only finding elements that do not have tabindex="-1" we ensure we don't
    // corrupt the previous state of the element if a modal was already open
    const rootSelector = targetElement ? '*' : 'html *'

    const elementSelector = this.bypassSelectors
      .map((s) => `:not(${s})`)
      .join('')

    const selector = `${rootSelector} ${elementSelector}:not(script):not(style):not(path):not(head *)`

    // JSDOM and IE11 has issues with the selector :not(x *), so we used it only in the browser,
    // so we remove the asterisk from the selector, but add it to the exclude selectors list and make another querySelectorAll call
    // - so we query all bypass selectors with "asterisk" manually
    if (IS_IE11 || process.env.NODE_ENV === 'test') {
      const excludeSelectors = []

      const testSelector = selector
        .split(':')
        .map((localSel) => {
          if (localSel.endsWith(' *)')) {
            excludeSelectors.push(
              ...Array.from(
                (
                  targetElement || document.documentElement
                ).querySelectorAll(localSel.match(/\(([^)]*)\)/)[1])
              )
            )
            localSel = localSel.replace(' *', '')
          }

          return localSel
        })
        .join(':')

      return Array.from(
        (targetElement || document.documentElement).querySelectorAll(
          testSelector
        )
      ).filter((node) => !excludeSelectors.includes(node))
    }

    // console.log('selector', selector)

    return Array.from(
      (targetElement || document.documentElement).querySelectorAll(
        selector
      )
    )
  }
}

export function convertStatusToStateOnly(status, state) {
  return status ? state : null
}

export function getStatusState(status) {
  return (
    status && status !== 'error' && status !== 'warn' && status !== 'info'
  )
}

export function getInnerRef(ref) {
  let ret = ref

  if (
    ref &&
    ref.current &&
    !React.isValidElement(ref.current) &&
    ref.current._ref
  ) {
    const tmp = getInnerRef(ref.current._ref)
    if (tmp && Object.prototype.hasOwnProperty.call(tmp, 'current')) {
      ret = tmp
    }
  }

  return ret
}

export function combineLabelledBy(...params) {
  return combineAriaBy('aria-labelledby', params)
}
export function combineDescribedBy(...params) {
  return combineAriaBy('aria-describedby', params)
}
function combineAriaBy(type, params) {
  params = params.map((cur) => {
    if (cur && params.includes(cur[type])) {
      return null
    }
    if (cur && typeof cur[type] !== 'undefined') {
      cur = cur[type]
    }
    if (typeof cur !== 'string') {
      cur = null
    }
    return cur
  })
  params = params.filter(Boolean).join(' ')
  if (params === '') {
    params = undefined
  }
  return params
}

export function findElementInChildren(children, find) {
  if (!Array.isArray(children)) {
    children = [children]
  }

  let result = null
  children.some((cur) => {
    if (cur && cur.props && cur.props.children) {
      const res = findElementInChildren(cur.props.children, find)
      if (res) {
        return (result = res)
      }
    }
    if (React.isValidElement(cur) && find(cur)) {
      return (result = cur)
    }
    return null
  })

  return result
}

export function escapeRegexChars(str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
}

export function removeUndefinedProps(object) {
  Object.keys(object).forEach((key) => {
    if (object[key] === undefined) {
      delete object[key]
    }
  })
  return object
}
