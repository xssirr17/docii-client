import style from './index.module.scss'

import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDoctorById, getPresentTimes } from '@/stores/doctor/doctorSlice'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import DoctorCard from '@/components/view-components/panel/doctors/doctor-card/DoctorCard'
import DateChip from '@/components/general/date-chip/DateChip'
import PresentTime from '@/components/general/present-time/PresentTime'
import BaseButton from '@/components/base/base-button/BaseButton.jsx'
import LoadingSpinner from '@/components/general/loading-spinner/LoadingSpinner.jsx'
import BaseModal from '@/components/base/base-modal/BaseModal.jsx'

import { getFile } from '@/stores/general/file/fileSlice'
import { reserveDoctor } from '@/stores/profile/profileSlice.js'

import Cookies from 'js-cookie'


function DoctorView() {
  const effectRan = useRef(true)
  const [isLoading, setIsLoading] = useState(false)
  const [doctor, setDoctor] = useState({})
  const [activeDateChip, setActiveDateChip] = useState(null)
  const [activePresentTime, setActivePresentTime] = useState(null)
  const [submitButtonDisable, setSubmitButtonDisable] = useState(true)
  const [appointmentTimes, setAppointmentTimes] = useState([])
  const [presentTimes, setPresentTimes] = useState([])
  const [isPresentTimeLoading, setIsPresentTimeLoading] = useState(false)
  const [isReserveLoading, setIsReserveLoading] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { doctorId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (effectRan.current) {
      try {
        const getDoctorInformation = async () => {
          setIsLoading(true)
          const response = await dispatch(getDoctorById(doctorId))
          if (response?.error) throw new Error(response)

          let doctorResponse = response?.payload?.result[0]
          setDoctor(doctorResponse)
          const times = calculateAppointmentTimes(doctorResponse.presentUntil)
          setAppointmentTimes(times)
          const firstDay = times[0]?.date
          setActiveDateChip(firstDay)
          await handleDateClick(firstDay)
          if (doctorResponse?.link) {
            const response = await dispatch(getFile(doctorResponse.link))
            if (response?.error) throw new Error(response)
            const image = response?.payload?.result
            setDoctor((prevDoctor) => ({ ...prevDoctor, image }))
          }

          setIsLoading(false)
        }

        getDoctorInformation()
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    return () => {
      effectRan.current = false
    }
  }, [])

  useEffect(() => {
    if (activePresentTime && activeDateChip)
      setSubmitButtonDisable(false)
    else setSubmitButtonDisable(true)
  }, [activePresentTime, activeDateChip])
  const calculateAppointmentTimes = (endTime) => {
    const startDate = new Date()
    const endDate = new Date(endTime)
    const timeDifference = endDate.getTime() - startDate.getTime()
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))

    const appointmentTimes = []
    for (let i = 0; i < daysDifference; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'short' })
      const dayOfMonth = currentDate.getDate()
      appointmentTimes.push({
        dayOfWeek,
        dayOfMonth,
        date: currentDate.toLocaleDateString('en-US')
      })
    }

    return appointmentTimes
  }

  const handleDateClick = async (date) => {
    setActiveDateChip(date)
    setActivePresentTime(null)
    try {
      setIsPresentTimeLoading(true)
      const response = await dispatch(getPresentTimes({ id: doctorId, date }))
      if (response?.error) throw new Error(response)
      setPresentTimes(response?.payload?.result)
    } catch (error) {
      console.log(error)
    } finally {
      setIsPresentTimeLoading(false)
    }
  }

  const handleTimeClick = (id) => {
    setActivePresentTime(id)
  }

  const reserve = async () => {
    if (!Cookies.get('token')) {
      setShowLoginModal(true)
      return
    }
    try {
      setIsReserveLoading(true)
      const response = await dispatch(reserveDoctor({ id: activePresentTime }))
      if (response?.error) throw new Error(response)
      toast.success('successfully reserved')
    } catch (error) {
      console.log(error)
    } finally {
      setIsReserveLoading(false)
    }
  }
  return (
    !isLoading && (
      <div className={style['doctor-view']}>
        <DoctorCard
          firstName={doctor.firstName}
          lastName={doctor.lastName}
          image={doctor.image}
          categories={doctor.categories}
          score={doctor.score}
        />
        <div className={style['doctor-view__sections-wrapper']}>
          {doctor.biographi && (
            <div className={style['doctor-view__about-wrapper']}>
              <h3 className={style['doctor-view__about-title']}>About</h3>
              <p className={style['doctor-view__about-description']}>{doctor.biographi}</p>
            </div>
          )}
          <div className={style['doctor-view__appointment-times']}>
            {appointmentTimes.map((appointmentTime, index) => (
              <DateChip
                key={index}
                dayOfWeek={appointmentTime.dayOfWeek}
                onClick={() => handleDateClick(appointmentTime.date)}
                dayOfMonth={appointmentTime.dayOfMonth}
                isActive={activeDateChip === appointmentTime.date}
              />
            ))}
          </div>
        </div>

        <hr className={style['doctor-view__divider']} />
        <div
          className={`${style['doctor-view__present-times']} ${isPresentTimeLoading ? style['doctor-view__present-times_loading'] : ''}`}>
          {isPresentTimeLoading ? (
            <LoadingSpinner color={'var(--color-text-primary-700)'} className={style['doctor-view__loading']} />
          ) : presentTimes.length ? (
            <div className={style['doctor-view__present-times']}> {/* Added container for present times */}
              {presentTimes.map((presentTime) => (
                <PresentTime
                  key={presentTime.id}
                  onClick={() => handleTimeClick(presentTime.id)}
                  time={presentTime.time}
                  reserved={presentTime.reserved}
                  isActive={activePresentTime === presentTime.id}
                />
              ))}
            </div>
          ) : (
            <h1 className={style['doctor-view__no-appointment']}>The doctor has not scheduled an appointment on this
              day</h1>
          )}
        </div>
        <BaseModal isOpen={showLoginModal}
                   className={style['doctor-view__login-modal']}
                   onClose={() => setShowLoginModal(false)}
                   content={<p className={style['login-modal__content']}> To book an appointment, you must first log in
                     to your account</p>}
                   footer={<Link to={'/login'} className={style['login-modal__login-btn']}><BaseButton
                   >Login</BaseButton></Link>}
        />

        <BaseButton type="submit" isLoading={isReserveLoading} className={style['doctor-view__submit-btn']}
                    onClick={() => reserve()}
                    disabled={submitButtonDisable}>
          Book Appointment
        </BaseButton>
      </div>
    )
  )
}

export default DoctorView
