import style from './index.module.scss'

import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import DoctorCard from '@/components/view-components/panel/doctors/doctor-card/DoctorCard'

import {
  getTopScoreDoctors,
  setTopScoreDoctors,
  setImageInTopDoctors
} from '@/stores/doctor/doctorSlice'

import { getFile } from '@/stores/general/file/fileSlice'

function TopDoctorsView() {
  const dispatch = useDispatch()
  const DoctorStore = useSelector((state) => state.doctor)
  const effectRan = useRef(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (effectRan.current) {
      try {
        const getTopDoctors = async () => {
          setIsLoading(true)
          const response = await dispatch(getTopScoreDoctors())
          if (response?.error) throw new Error()

          const topDoctors = response?.payload?.result

          dispatch(setTopScoreDoctors(topDoctors))

          let topDoctorList = []

          for (let index = 0; index < topDoctors.length; index++) {
            if (topDoctors[index].link) topDoctorList.push(getFiles(topDoctors, index))
          }

          await Promise.all(topDoctorList)

          setIsLoading(false)
        }

        if (!DoctorStore.topDoctors.length) getTopDoctors()
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    return () => {
      effectRan.current = false
    }
  }, [])

  const getFiles = async (topDoctors, index) => {
    const response = await dispatch(getFile(topDoctors[index].link))
    if (response?.error) throw new Error(response)
    const image = response?.payload?.result
    dispatch(setImageInTopDoctors({ image, index }))
  }

  const navigate = useNavigate()

  const navigateToDoctorPage = (doctorId) => {
    navigate(`/doctor/${doctorId}`)
  }

  return (
    !isLoading && (
      <div className={style['top-doctors']}>
        {DoctorStore.topDoctors.map((doctor) => (
          <div
            className={style['top-doctors__card-wrapper']}
            key={doctor.id}
            onClick={() => navigateToDoctorPage(doctor.id)}
          >
            <DoctorCard
              firstName={doctor.firstName}
              lastName={doctor.lastName}
              image={doctor.image}
              categories={doctor.categories}
              score={doctor.score}
            />
          </div>
        ))}
      </div>
    )
  )
}

export default TopDoctorsView
