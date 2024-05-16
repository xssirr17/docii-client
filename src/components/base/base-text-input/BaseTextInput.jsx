import style from './index.module.scss'

import PropTypes from 'prop-types'

import { useController } from 'react-hook-form'
import BaseIcon from '@/components/base/base-icon/BaseIcon'

const BaseTextInput = ({
  name,
  label,
  placeholder,
  prependIcon,
  appendIcon,
  control,
  rules = {},
  ...props
}) => {
  const {
    field,
    formState: { errors }
  } = useController({ name, control, rules })
  const BaseTextInputError = errors[name] ? style['base-input_error'] : ''
  return (
    <div className={`${style['base-input']} ${BaseTextInputError}`}>
      {label && (
        <label htmlFor={name} className={style['base-input__label']}>
          {label}
        </label>
      )}
      {prependIcon && (
        <div className={style['base-input__icon']}>
          <BaseIcon name={prependIcon} />
        </div>
      )}
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        className={style['base-input__input']}
      />
      {appendIcon && (
        <div className={style['base-input__icon']}>
          <BaseIcon name={appendIcon} />
        </div>
      )}
      {errors[name] && (
        <span className={style['base-input__error-message']}>{errors[name].message}</span>
      )}
    </div>
  )
}

BaseTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  prependIcon: PropTypes.string,
  appendIcon: PropTypes.string,
  rules: PropTypes.object,
  control: PropTypes.object.isRequired
}

export default BaseTextInput
