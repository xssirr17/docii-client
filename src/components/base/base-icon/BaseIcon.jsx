import { useState, useEffect } from 'react'
import { ReactSVG } from 'react-svg'

import PropTypes from 'prop-types'

function BaseIcon({ name, className }) {
  const [Icon, setIcon] = useState(null)

  useEffect(() => {
    const importIcon = async () => {
      try {
        const { default: dynamicIcon } = await import(`./icons/${name}Icon.svg`)
        setIcon(dynamicIcon)
      } catch (error) {
        console.error(`Error loading icon ${name}Icon:`, error)
      }
    }

    importIcon()
  }, [name])

  return Icon ? <ReactSVG src={Icon} className={className} /> : null
}

BaseIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default BaseIcon
