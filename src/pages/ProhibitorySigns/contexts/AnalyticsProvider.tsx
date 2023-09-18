import { usePiwik } from '@amsterdam/piwik-tracker-react'
import { ReactNode, useEffect } from 'react'
import { AnalyticsContext } from './AnalyticsContext'

type Props = {
  children: ReactNode
}

const AnalyticsProvider = ({ children }: Props) => {
  const { trackPageView } = usePiwik()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    trackPageView({ href: window.location.href.split(/[?#]/)[0] })
  }, [trackPageView])

  return (
    <AnalyticsContext.Provider value={{}}>{children}</AnalyticsContext.Provider>
  )
}

export default AnalyticsProvider
