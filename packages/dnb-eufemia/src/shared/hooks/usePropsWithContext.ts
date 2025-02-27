export type DefaultsProps = Record<string, unknown>
export type Contexts = Array<Record<string, unknown>>

/**
 * Extends props from a given context
 * but give the context second priority only
 *
 * @param props object of component properties
 * @param defaults object of potential default values
 * @param contexts the rest of all context to merge
 * @returns merged properties
 */
function usePropsWithContext<Props>(
  props: Props,
  defaults: DefaultsProps = {},
  ...contexts: Contexts
) {
  const context = contexts.reduce((acc, cur) => {
    if (cur) {
      acc = { ...acc, ...cur }
    }
    return acc
  }, {})

  props = { ...defaults, ...props }

  return {
    ...props,
    ...Object.entries(context).reduce((acc, [key, value]) => {
      // if it was NOT defined as a component prop, because its still the same as the defaults
      if (props[key] === defaults[key]) {
        // then we use the context value
        acc[key] = value
      }
      return acc
    }, {}),
  }
}

export { usePropsWithContext }
export default usePropsWithContext
