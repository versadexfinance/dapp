import { useEffect, useRef } from 'react'

const useOutsideClick = (callback, keep?) => {
  const ref = useRef<any>()

  useEffect(() => {
    const handleClick = event => {
      if (keep) {
        return
      }
      callback()
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return ref
}

export default useOutsideClick
