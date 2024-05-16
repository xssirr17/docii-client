import styles from './index.module.scss'

import { useState } from 'react'

import BaseTabs from '@/components/base/base-tabs/BaseTabs.jsx'
import ScheduleCard from '@/components/view-components/schedule/ScheduleCard.jsx'

import { SCHEDULE_TABS } from '@/constants/common/panel/schedules/schedule-tabs.constants.js'

function SchedulesView() {
  const [activeScheduleTab, setActiveScheduleTab] = useState(0)

  const test = {
    firstName: 'mohammad',
    lastName: 'bagherzadeh',
    category: 'doctor',
    time: '10:30',
    date: '03/26/2024',
    imageSource: 'asdas'
  }
  const handleTabClick = (index) => {
    setActiveScheduleTab(index)
  }
  return <div className={styles['schedule-view']}>
    <BaseTabs tabs={SCHEDULE_TABS} activeTab={activeScheduleTab} onClick={(index) => handleTabClick(index)}
              className={styles['schedule-view__schedule-tabs']} />
    <ScheduleCard firstName={test.firstName} lastName={test.lastName} date={test.date} category={test.category}
                  time={test.time} imageSource={test.imageSource} isConfirmed={false}
                  className={styles['schedule-view__schedule-card']} />
  </div>
}

export default SchedulesView
