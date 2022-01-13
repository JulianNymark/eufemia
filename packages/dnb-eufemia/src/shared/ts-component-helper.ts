import React from 'react'
import { toSnakeCase } from './component-helper'

type listOfProps = {
  [x: string]: any
}
const convertCamelCaseProps = (props: listOfProps) => {
  const newProps = { ...props }
  for (const key in props) {
    if (/^[a-z]+[A-Z]/.test(key)) {
      newProps[toSnakeCase(key)] = props[key]
      delete newProps[key]
    }
  }
  return newProps
}

/**
 * A React Higher-Order Component (HOC) function which takes in a component with both snake_case and camelCase props,
 * and converts all props to snake_case. The snake_case props are sent to the WrappedComponent.
 *
 * For components that only support snake_case props, but (also) receive camelCase props.
 *
 * @param {*} WrappedComponent
 * @returns EnhancedComponent
 */
export const withCamelCaseProps = (
  WrappedComponent
): typeof WrappedComponent => {
  return class extends WrappedComponent {
    render() {
      const elemTree = super.render()
      const newProps = convertCamelCaseProps(elemTree.props)
      return React.cloneElement(
        elemTree,
        Object.freeze(newProps),
        elemTree.props.children
      )
    }
  }
}
