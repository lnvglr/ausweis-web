import { useEffect, useState } from 'react'

/**
 * True when the demo should run full-bleed on a real phone / narrow viewport
 * (no device frame; controls overlay the UI).
 */
export function useMobileDemo(query = '(max-width: 719px)') {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return mobile
}
