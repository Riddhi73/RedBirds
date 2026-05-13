import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop
 * Automatically scrolls to the top of the page on every route change.
 * Place this component inside your Router but outside your Routes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'smooth' if you want animated scroll
    })
  }, [pathname])

  return null
}
