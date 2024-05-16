import style from './index.module.scss'
import 'animate.css'

import { useRef } from 'react'
import PropTypes from 'prop-types'

import useOnClickOutside from '@/hooks/useOnClickOutside.js'

function BaseModal({ isOpen, className = 'animate__animated', content, header, footer, onClose }) {

  const modalRef = useRef(null)

  useOnClickOutside(modalRef, onClose)
  if (!isOpen) return null

  return (
    <div className={style['overlay']} ref={modalRef}>
      <div
        className={`${style['base-modal']} ${className} animate__fadeInUp `}>
        {header && <div className={style['base-modal__header']}>{header}</div>}
        {content && <div className={style['base-modal__content']}>{content}</div>}
        {footer && <div className={style['base-modal__footer']}>{footer}</div>}
      </div>
    </div>
  )
}


BaseModal.propTypes = {
  children: PropTypes.string,
  header: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  onClose: PropTypes.func
}

export default BaseModal