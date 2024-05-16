import style from './index.module.scss'

import PropTypes from 'prop-types'

import { Bars } from 'react-loader-spinner'

function LoadingSpinner({ height = 50, width = 200, color = 'var(--color-background-primary)', className = '' }) {
  return (
    <Bars
      height={height}
      width={width}
      color={color}
      wrapperStyle={className}
      wrapperClass=""
    />
  )
}

LoadingSpinner.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string

}
export default LoadingSpinner
