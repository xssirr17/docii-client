import styles from './index.module.scss'

import PropTypes from 'prop-types'

import BaseButton from '@/components/base/base-button/BaseButton.jsx'

function BaseTabs({ tabs, onClick, activeTab, className }) {

  return <div className={`${styles['base-tabs']} ${className}`}>
    {
      tabs.map((name, index) => <BaseButton onClick={() => onClick(index)} className={`${styles['base-tabs__tab']} 
          ${activeTab === index
          ? styles['base-tabs__tab_active']
          : styles['base-tabs__tab_inactive']}
        `} key={index}>
          {name}
        </BaseButton>
      )
    }
  </div>
}

BaseTabs.propTypes = {
  tabs: PropTypes.array,
  onClick: PropTypes.func,
  className: PropTypes.string,
  activeTab: PropTypes.number
}
export default BaseTabs