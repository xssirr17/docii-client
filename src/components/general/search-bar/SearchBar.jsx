import style from './index.module.scss'

import PropTypes from 'prop-types'

import BaseIcon from '@/components/base/base-icon/BaseIcon'

function SearchBar({ placeholder }) {
  return (
    <div className={style['search-bar']}>
      <BaseIcon name="Search" />
      <input className={style['search-bar__input']} type="text" placeholder={placeholder} />
    </div>
  )
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired
}

export default SearchBar
