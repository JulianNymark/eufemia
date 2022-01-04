import React from 'react'
import classnames from 'classnames'
import ModalHeader, {
  ModalHeaderProps,
} from '../../modal/parts/ModalHeader'

export default function DrawerHeader({
  className,
  titleClass,
  ...props
}: ModalHeaderProps) {
  return (
    <ModalHeader
      {...props}
      className={classnames('dnb-drawer__header', className)}
      title_class={classnames('dnb-drawer__title', titleClass)}
    />
  )
}
