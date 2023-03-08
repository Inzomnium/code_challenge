import { useState, useEffect } from 'react'

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return
      setIsFetching(true)
      console.log('scroll')
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFetching])

  useEffect(() => {
    if (!isFetching) return
    callback(() => {
      setIsFetching(false)
    })
  }, [isFetching, callback])

  return [setIsFetching]
}

export default useInfiniteScroll