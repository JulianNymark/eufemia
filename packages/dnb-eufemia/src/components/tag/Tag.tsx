import React from 'react'
import classnames from 'classnames'

// Components
import IconPrimary, { IconPrimaryIcon } from '../icon-primary/IconPrimary'
import Button, { ButtonProps } from '../button/Button'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps } from '../../shared/interfaces'
import { SkeletonShow } from '../skeleton/Skeleton'
import { warn } from '../../shared/component-helper'
import { usePropsWithContext } from '../../shared/hooks'

// Internal
import TagGroup from './TagGroup'
import { TagGroupContext } from './TagContext'

export interface TagProps {
  /**
   * The content of the tag element, can be a string or a React Element.
   * Default: null
   */
  text?: string | React.ReactNode

  /**
   * Icon displaying on the left side
   * Default: null
   */
  icon?: IconPrimaryIcon

  /**
   * If a label is given, typical inside a table or dl (definition list), then you can disable Tag.Group as a dependent of Tag. Use `true` to omit the `Tag group required:` warning.
   * Default: null
   */
  hasLabel?: boolean

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow

  /**
   * The content of the tag element, can be a string or a React Element. Will be overwritten by text prop
   * Default: null
   */
  children?: string | React.ReactNode // ReactNode allows multiple elements, strings, numbers, fragments, portals...

  /**
   * Handle the click event on 'tag' element
   * Default: null
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>

  /**
   * Handle the delete event on 'tag' element
   * Default: null
   */
  onDelete?: React.MouseEventHandler<HTMLButtonElement>

  /**
   * Handle the delete event on 'tag' element
   * Default: null
   */
  omitOnKeyUpDeleteEvent?: boolean
}

export const defaultProps = {
  skeleton: null,
  omitOnKeyUpDeleteEvent: false,
}

const Tag = (localProps: TagProps & ISpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  const tagGroupContext = React.useContext(TagGroupContext)

  // Extract additional props from global context
  const {
    className,
    skeleton,
    children,
    text,
    hasLabel,
    onClick,
    onDelete,
    omitOnKeyUpDeleteEvent,
    ...props
  } = usePropsWithContext(
    localProps,
    defaultProps,
    context?.translation?.Tag,
    context?.Tag,
    tagGroupContext
  )

  const content = text || children
  const isClickable = !!onClick
  const isRemovable = !!onDelete && !isClickable
  const isInteractive = isClickable || isRemovable

  const tagClassNames = classnames(
    'dnb-tag',
    className,
    isInteractive && 'dnb-tag--interactive',
    isRemovable && 'dnb-tag--removable'
  )

  const isDeleteKeyboardEvent = (keyboardEvent) => {
    return (
      keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete'
    )
  }

  const handleKeyUp = (event) => {
    if (onDelete && isDeleteKeyboardEvent(event)) {
      onDelete(event)
    }
  }

  const buttonAttr: typeof props & Pick<ButtonProps, 'element' | 'type'> =
    props

  if (!isInteractive) {
    buttonAttr.element = 'span'
    buttonAttr.type = ''
  }

  if (isRemovable) {
    buttonAttr.icon = getDeleteIcon()
  }

  if (!tagGroupContext && !hasLabel) {
    warn(
      `Tag group required: A Tag requires a Tag.Group with label description as a parent component. This is to ensure correct semantic and accessibility.`
    )
  }

  return (
    <Button
      data-testid="tag"
      variant="unstyled"
      size="small"
      icon_position={isRemovable ? 'right' : 'left'}
      className={tagClassNames}
      on_click={onClick || onDelete}
      text={content}
      skeleton={skeleton}
      onKeyUp={
        isRemovable && !omitOnKeyUpDeleteEvent
          ? (e) => handleKeyUp(e)
          : undefined
      }
      {...buttonAttr}
    />
  )

  function getDeleteIcon() {
    return (
      <IconPrimary
        data-testid="tag-delete-icon"
        inherit_color={false}
        icon={
          <svg
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 8a8 8 0 1 1 16 0A8 8 0 1 1 0 8Z"
              className="dnb-icon-close-circle-path"
            />
            <path
              d="m5.5 10.5 5-5m0 5-5-5"
              className="dnb-icon-close-cross-path"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    )
  }
}

Tag.Group = TagGroup

export default Tag
