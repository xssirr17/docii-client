import style from './index.module.scss'

import PropTypes from 'prop-types'

import BaseIcon from '@/components/base/base-icon/BaseIcon'

function Category({ title, image }) {
  return (
    <div className={style['category']}>
      <div className={style['category__icon-wrapper']}>
        <BaseIcon name={image} />
      </div>
      <h3 className={style['category__title']}>{title}</h3>
    </div>
  )
}

Category.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string
}

export default Category
