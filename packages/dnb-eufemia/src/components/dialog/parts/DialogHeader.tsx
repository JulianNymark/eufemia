import React from 'react'
import classnames from 'classnames'
import ModalHeader, {
  ModalHeaderProps,
} from '../../modal/parts/ModalHeader'

export default function DialogHeader({
  className = null,
  ...props
}: ModalHeaderProps) {
  return (
    <ModalHeader
      {...props}
      className={classnames('dnb-dialog__header', className)}
      title_class="dnb-dialog__title"
    />
  )
}
