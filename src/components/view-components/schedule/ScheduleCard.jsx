import styles from './index.module.scss'

import PropTypes from 'prop-types'

import BaseIcon from '@/components/base/base-icon/BaseIcon.jsx'
import BaseButton from '@/components/base/base-button/BaseButton.jsx'

function ScheduleCard({ firstName, lastName, category, date, time, isConfirmed, imageSource, className }) {
  return <div className={`${styles['schedule-card']} ${className}`}>
    <div className={styles['schedule-card__personal-info']}>
      <div className={styles['schedule-card__name-wrapper']}>
        <h1 className={styles['schedule-card__full-name']}>{firstName + ' ' + lastName}</h1>
        <small className={styles['schedule-card__category']}>{category}</small>
      </div>
      <img src={imageSource} className={styles['schedule-card__image']} alt={firstName + lastName} />
    </div>
    <div className={styles['schedule-card__reserve-info']}>
      <div className={styles['schedule-card__reserve-item']}>
        <BaseIcon className={styles['schedule-card__reserve-icon']} name="Calendar" />
        <span className={styles['schedule-card__reserve-value']}>{date}</span>
      </div>
      <div className={styles['schedule-card__reserve-item']}>
        <BaseIcon className={styles['schedule-card__reserve-icon']} name="Clock" />
        <span className={styles['schedule-card__reserve-value']}>{time}</span>
      </div>
      <div className={styles['schedule-card__reserve-item']}>
        <span className={styles['schedule-card__reserve-value']}>{isConfirmed}</span>
      </div>
    </div>
    <div className={styles['schedule-card__actions']}>
      <BaseButton className={styles['schedule-card__action_cancel']}>Cancel</BaseButton>
      <BaseButton>Reschedule</BaseButton>
    </div>
  </div>
}

ScheduleCard.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  date:
  PropTypes.string,
  time:
  PropTypes.string,
  category:
  PropTypes.string,
  imageSource:
  PropTypes.string,
  isConfirmed:
  PropTypes.bool,
  className:
  PropTypes.string

}

export default ScheduleCard