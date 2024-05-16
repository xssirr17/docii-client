import style from './index.module.scss'

import PropTypes from 'prop-types'

function PresentTime({ time, isActive, reserved, className = '', onClick }) {
  const combinedClasses = `${style['present-time']} ${className} ${isActive ? style['present-time_active'] : ''} ${reserved ? style['presentTime_disabled'] : ''}`

  return (
    <button className={combinedClasses} onClick={onClick} disabled={reserved}>
      {time}
    </button>
  )
}

PresentTime.propTypes = {
  time: PropTypes.string.isRequired,
  reserved: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
}
export default PresentTime
