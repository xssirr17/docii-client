import { useEffect } from 'react'

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const handleClickOutside = (event) => {

      if (ref.current === event.target) handler()

    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler])
}

export default useOnClickOutside