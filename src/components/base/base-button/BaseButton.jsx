import LoadingSpinner from '@/components/general/loading-spinner/LoadingSpinner'

import PropTypes from 'prop-types'
import style from './index.module.scss'

function BaseButton({
                      variant = 'filled',
                      isBlock = true,
                      isLoading = false,
                      type = 'button',
                      disabled = false,
                      className = '',
                      onClick,
                      children
                    }) {
  const buttonBaseClass = style['base-button']
  const buttonVariant = style[`base-button_${variant}`]
  const buttonIsBlock = isBlock ? style['base-button_block'] : ''
  const buttonLoading = isLoading ? style['base-button_loading'] : ''

  return (
    <button
      className={`${buttonBaseClass} ${buttonVariant} ${buttonIsBlock} ${buttonLoading} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  )
}

export default BaseButton
BaseButton.propTypes = {
  variant: PropTypes.oneOf(['filled', 'text', 'outlined']),
  isBlock: PropTypes.bool,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
}
