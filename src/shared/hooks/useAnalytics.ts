import { useCallback, useState } from 'react'
import PiwikPro, { PageViews } from '@piwikpro/react-piwik-pro'

const dapUrl = 'https://dap.amsterdam.nl'
const piwikSiteId = process.env.REACT_APP_PIWIK_SITE_ID

let PiwikInstance = false

function createPiwikInstance(isEnabled: boolean = true) {
  if (isEnabled && !!piwikSiteId && dapUrl && !PiwikInstance) {
    PiwikPro.initialize(piwikSiteId, dapUrl)
    PiwikInstance = true
  }
}

function useAnalytics() {
  const [prevLocation, setPrevLocation] = useState('')

  const trackPageVisit = useCallback(
    (msg?: string) => {
      const path = window?.location.href.split(/[?#]/)[0]

      if (!PiwikInstance || !path) return
      if (prevLocation === path) return

      setPrevLocation(path)

      console.info(`Track page view to: ${msg ?? path}`)

      PageViews.trackPageView(msg ?? path)
    },
    [prevLocation]
  )

  return { trackPageVisit }
}

export { piwikSiteId, createPiwikInstance }
export default useAnalytics
