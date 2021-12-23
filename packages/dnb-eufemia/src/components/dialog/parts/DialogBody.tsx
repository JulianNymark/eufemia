import React from 'react'
import classnames from 'classnames'
import ModalInner, { ModalInnerProps } from '../../modal/parts/ModalInner'

interface DialogBodyProps extends ModalInnerProps {
  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  className?: string
}

export default function DialogBody({
  className = null,
  ref, //eslint-disable-line
  ...props
}: DialogBodyProps) {
  return (
    <ModalInner
      {...props}
      className={classnames('dnb-dialog__body', className)}
    />
  )
}
