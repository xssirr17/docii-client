import styles from './index.module.scss'

import PropTypes from 'prop-types'

import CheapScore from '@/components/general/cheap-score/CheapScore'

import doctorDefaultPerson from '@/assets/images/doctorDefaultPerson.png'

// import BaseIcon from '@/components/base/base-icon/BaseIcon'

function DoctorCard({ firstName, lastName, image, categories, score }) {
  const imageSource = image ? `data:image/png;base64,${image}` : doctorDefaultPerson

  return (
    <div className={styles['doctor-card']}>
      <img className={styles['doctor-card__image']} src={imageSource} alt={firstName + lastName} />
      <div className={styles['doctor-card__details']}>
        <h3 className={styles['doctor-card__name']}>
          {firstName} {lastName}
        </h3>
        <span className={styles['doctor-card__category']}>{categories}</span>
        <CheapScore score={score} />
      </div>
    </div>
  )
}

DoctorCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  image: PropTypes.string,
  categories: PropTypes.array.isRequired,
  score: PropTypes.number.isRequired
}

export default DoctorCard
