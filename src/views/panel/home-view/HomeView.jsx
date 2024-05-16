import style from './index.module.scss'
import { Link } from 'react-router-dom'

import BaseButton from '@/components/base/base-button/BaseButton'
import BaseIcon from '@/components/base/base-icon/BaseIcon'
import SearchBar from '@/components/general/search-bar/SearchBar'
import Category from '@/components/view-components/panel/category/Category'
import DoctorCard from '@/components/view-components/panel/home/doctor-card/DoctorCard'
import DoctorImage from '@/assets/images/doctor-ads-woman.png'

import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  getTopScoreDoctors,
  setTopScoreDoctors,
  setImageInTopDoctors
} from '@/stores/doctor/doctorSlice'
import { getFile } from '@/stores/general/file/fileSlice'

import { GENERAL_CATEGORIES } from '@/constants/common/panel/home/views/general-categories.constants'

function HomeView() {
  const [isLoading, setIsLoading] = useState(false)
  const DoctorStore = useSelector((state) => state.doctor)
  const effectRan = useRef(true)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    if (effectRan.current) {
      const fetchHomePageData = async () => {
        try {
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
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }
      if (!DoctorStore.topDoctors.length) fetchHomePageData()

      return () => {
        effectRan.current = false
      }
    }
  }, [])

  const getFiles = async (topDoctors, index) => {
    const response = await dispatch(getFile(topDoctors[index].link))
    if (response?.error) throw new Error(response)
    const image = response?.payload?.result
    dispatch(setImageInTopDoctors({ image, index }))
  }

  const navigateToDoctorPage = (doctorId) => {
    navigate(`/doctor/${doctorId}`)
  }

  return (
    !isLoading && (
      <div className={style['home-view']}>
        <div className={style['home-view__header']}>
          <span className={style['home-view__header-text']}>
            Find your desire <br /> health solution
          </span>
          <div className={style['home-view__header-icon']}>
            <BaseIcon name="Notification" />
          </div>
        </div>
        <SearchBar placeholder="Search doctor, drugs, articles..." />
        <section className={style['home-view__categories']}>
          {GENERAL_CATEGORIES.map((category) => (
            <Category title={category.name} key={category.name} image={category.image} />
          ))}
        </section>
        <section className={style['home-view__ads']}>
          <div className={style['home-view__ads-content']}>
            <h2 className={style['home-view__ads-text']}>
              Early protection for <br /> your family health
            </h2>
            <BaseButton isBlock={false}>Learn more </BaseButton>
          </div>
          <img src={DoctorImage} alt="doctor" />
        </section>
        <section className={style['home-view__top-doctor-container']}>
          <div className={style['home-view__top-doctor-header']}>
            <h3 className={style['home-view__top-doctor-title']}>Top Doctor</h3>
            <Link className={style['home-view__top-doctor-all']} to={'/top-doctors'}>
              See all
            </Link>
          </div>
          <div className={style['home-view__top-doctor-list']}>
            {DoctorStore.topDoctors.map((doctor) => (
              <div
                className={style['top-doctor-list__card-wrapper']}
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
        </section>
      </div>
    )
  )
}

export default HomeView
