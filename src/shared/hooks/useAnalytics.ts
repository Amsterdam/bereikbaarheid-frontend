import { useCallback, useState } from 'react'
import PiwikTracker from '@amsterdam/piwik-tracker'
import { UserOptions } from '@amsterdam/piwik-tracker/lib/types'
import { usePiwik } from '@amsterdam/piwik-tracker-react'

const rootUrl = process.env.REACT_APP_SELF_ROOT
const siteId = process.env.REACT_APP_PIWIK_SITE_ID ?? ''
const hasSiteId = !!process.env.REACT_APP_PIWIK_SITE_ID

let PiwikInstance: PiwikTracker

const PiwikTrackerConfig: UserOptions = {
  urlBase: rootUrl,
  siteId,
}

function useAnalytics() {
  const { trackPageView } = usePiwik()

  const [prevLocation, setPrevLocation] = useState('')

  const createPiwikInstance = (isEnabled: boolean = true) => {
    if (isEnabled && hasSiteId && !PiwikInstance) {
      PiwikInstance = new PiwikTracker(PiwikTrackerConfig)
    }
  }

  const trackPageVisit = useCallback(
    (msg?: string) => {
      const path = window?.location?.href.split(/[?#]/)[0]

      if (!PiwikInstance || !path) return
      if (prevLocation === path) return

      setPrevLocation(path)

      console.info(`Track page view to: ${msg ?? path}`)

      trackPageView({ href: msg ?? path })
    },
    [prevLocation, trackPageView]
  )

  return { createPiwikInstance, trackPageVisit }
}

export default useAnalytics
