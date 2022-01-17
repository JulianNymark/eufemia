import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps, SkeletonTypes } from '../../shared/interfaces'
import { extendPropsWithContext } from '../../shared/component-helper'

export interface BadgeProps {
  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonTypes

  /**
   * The content to display the badge on top of.
   * Default: null
   */
  children?: React.ReactNode

  /**
   * The content of the component.
   * Default: null
   */
  content?: string | number | React.ReactNode

  /**
   * The size of the component.
   * Default: medium.
   */
  size?: 'small' | 'medium' | 'large' | 'x-large'

  /**
   * The variant of the component.
   * Default: primary.
   */
  variant?: 'primary' | 'secondary' | 'tertiary'

  /**
   * The vertical positioning of the component.
   * Default: bottom.
   */
  vertical?: 'bottom' | 'top'

  /**
   * The horizontal positioning of the component.
   * Default: right.
   */
  horizontal?: 'left' | 'right'
}

export const defaultProps = {
  className: null,
  variant: 'primary',
  skeleton: false,
  children: null,
  content: null,
  vertical: 'bottom',
  horizontal: 'right',
  size: 'medium',
}

function Badge(localProps: BadgeProps & ISpacingProps) {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    className,
    children,
    skeleton,
    variant,
    horizontal,
    vertical,
    content: contentProp,
    size,
    ...props
  } = extendPropsWithContext(
    { ...defaultProps, ...localProps },
    defaultProps,
    context?.Badge
  )

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)
  const contentIsNum = typeof contentProp === 'number'
  const hasText =
    contentProp && (contentIsNum || typeof contentProp === 'string')

  const content = contentIsNum && contentProp > 99 ? '99+' : contentProp

  return (
    <span className="dnb-badge__root" data-testid="badge-root">
      {children}
      <span
        className={classnames(
          'dnb-badge',
          `dnb-badge--${variant || 'primary'}`,
          `dnb-badge--horizontal-${horizontal || 'right'}`,
          `dnb-badge--vertical-${vertical || 'bottom'}`,
          `dnb-badge--size-${size || 'medium'}`,
          hasText && 'dnb-badge--has-text',
          skeletonClasses,
          spacingClasses,
          className
        )}
        data-testid="badge"
        {...props}
      >
        {content}
      </span>
    </span>
  )
}

export default Badge
