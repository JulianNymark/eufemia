/**
 * Web Drawer Component
 *
 */

import React, { useContext } from 'react'
import classnames from 'classnames'
import {
  isTrue,
  findElementInChildren,
} from '../../shared/component-helper'
import ScrollView from '../../fragments/scroll-view/ScrollView'
import DialogHeader from './parts/DialogHeader'
import DialogNavigation from './parts/DialogNavigation'
import ModalContext from '../modal/ModalContext'
import Modal from '../modal/Modal'
import { checkMinMaxWidth } from '../drawer/helpers'
import { DialogContentProps } from './types'

export default function DialogContent({
  navContent = null,
  headerContent = null,
  modalContent = null,
  alignContent = 'left',
  className = null,
  class: _className = null,
  preventCoreStyle = null,
  spacing = true,
  fullscreen = 'auto',
  noAnimation = false,
  noAnimationOnMobile = false,
  minWidth: min_width = null,
  maxWidth: max_width = null,
  ...rest
}: DialogContentProps): JSX.Element {
  const context = useContext(ModalContext)
  const { minWidth, maxWidth } = checkMinMaxWidth(min_width, max_width)

  const innerParams = {
    className: classnames(
      !isTrue(preventCoreStyle) && 'dnb-core-style',

      'dnb-dialog',
      isTrue(spacing) && 'dnb-dialog--spacing',
      alignContent && `dnb-dialog__align--${alignContent}`,
      isTrue(fullscreen)
        ? `dnb-dialog--fullscreen`
        : fullscreen === 'auto' && `dnb-dialog--auto-fullscreen`,
      isTrue(context?.hide) && `dnb-dialog--hide`,
      isTrue(noAnimation) && `dnb-dialog--no-animation`,
      isTrue(noAnimationOnMobile) && `dnb-dialog--no-animation-on-mobile`,
      className,
      _className
    ),
    style: (minWidth || maxWidth) && { minWidth, maxWidth },
    onClick: context?.preventClick,
    onTouchStart: context?.preventClick,
    onKeyDown: context?.onKeyDownHandler,
    ...rest,
  }

  const navExists = findElementInChildren(
    modalContent,
    (cur) => cur.type === DialogNavigation || cur.type === Modal.Bar
  )

  const headerExists = findElementInChildren(
    modalContent,
    (cur) => cur.type === DialogHeader || cur.type === Modal.Header
  )
  return (
    <ScrollView {...innerParams}>
      <div
        tabIndex={-1}
        className="dnb-dialog__inner dnb-no-focus"
        ref={context?.contentRef}
      >
        {!navExists && <DialogNavigation>{navContent}</DialogNavigation>}
        {!headerExists && (
          <DialogHeader title={context?.title}>
            {headerContent}
          </DialogHeader>
        )}
        <div
          id={context?.contentId + '-content'}
          className="dnb-dialog__content"
        >
          {modalContent}
        </div>
      </div>
    </ScrollView>
  )
}
