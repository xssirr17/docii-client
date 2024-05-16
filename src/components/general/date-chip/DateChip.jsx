import style from './index.module.scss'

import PropTypes from 'prop-types'

function DateChip({ dayOfWeek, dayOfMonth, isActive, onClick }) {
  return (
    <div className={`${style['date-chip']} ${isActive ? style['date-chip_active-day'] : ''}`} onClick={onClick}>
      <small className={style['date-chip__week']}>{dayOfWeek}</small>
      <h3 className={style['date-chip__day']}>{dayOfMonth}</h3>
    </div>
  )
}

DateChip.propTypes = {
  dayOfWeek: PropTypes.string.isRequired,
  dayOfMonth: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}

export default DateChip
