import style from './index.module.scss'

import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import BaseIcon from '@/components/base/base-icon/BaseIcon'

function TheHeader({ title, prependIcon, appendIcon }) {
  const navigate = useNavigate()
  const pushToPreviousRoute = () => {
    navigate(-1)
  }
  return (
    title && (
      <header className={style["header"]}>
        {prependIcon && (
          <div className={style['header__icon']} onClick={pushToPreviousRoute}>
            <BaseIcon name={prependIcon} />
          </div>
        )}
        <h1 className={style['header__title']}>{title}</h1>
        {appendIcon && (
          <div className={style['header__icon']}>
            <BaseIcon name={appendIcon} />
          </div>
        )}
      </header>
    )
  )
}

TheHeader.propTypes = {
  title: PropTypes.string,
  prependIcon: PropTypes.string,
  appendIcon: PropTypes.string
}

export default TheHeader
