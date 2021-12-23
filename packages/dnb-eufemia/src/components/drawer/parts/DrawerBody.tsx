import React from 'react'
import classnames from 'classnames'
import ModalInner, { ModalInnerProps } from '../../modal/parts/ModalInner'

export default function DrawerBody({
  className = null,
  ref, //eslint-disable-line
  ...props
}: ModalInnerProps) {
  return (
    <ModalInner
      {...props}
      className={classnames('dnb-drawer__body', className)}
    />
  )
}
