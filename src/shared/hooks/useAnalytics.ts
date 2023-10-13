import { useCallback, useState } from 'react'
import PiwikPro, { PageViews } from '@piwikpro/react-piwik-pro'

const dapUrl = 'https://dap.amsterdam.nl'
const piwikSiteId = process.env.REACT_APP_PIWIK_SITE_ID

let PiwikInstance = false

function createPiwikInstance(isEnabled = true) {
  if (!isEnabled || PiwikInstance) return

  if (!piwikSiteId) {
    // TODO: notify developers via monitoring tool.
    console.error(
      'No Piwik siteId provided. Please, either disable Piwik instantiation for this environment or include a siteId as an environment variable.'
    )

    return
  }

  PiwikPro.initialize(piwikSiteId, dapUrl)
  PiwikInstance = true
}

function useAnalytics() {
  const [prevLocation, setPrevLocation] = useState('')

  const trackPageVisit = useCallback(
    (message?: string) => {
      const path = window?.location.href.split(/[?#]/)[0]

      if (!PiwikInstance || !path) return
      if (prevLocation === path) return

      setPrevLocation(path)

      console.info(`Track page view to: ${message ?? path}`)

      PageViews.trackPageView(message ?? path)
    },
    [prevLocation]
  )

  return { trackPageVisit }
}

export { createPiwikInstance }
export default useAnalytics
