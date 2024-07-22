import { useCallback, useState } from 'react'

import PiwikPro, { PageViews } from '@piwikpro/react-piwik-pro'

const piwikUrl = window?._env_?.REACT_APP_PIWIK_URL
const piwikSiteId = window?._env_?.REACT_APP_PIWIK_SITE_ID

let PiwikInstance = false

function createPiwikInstance(isEnabled = true) {
  if (!isEnabled || PiwikInstance) return

  if (!piwikUrl || !piwikSiteId) {
    // TODO: notify developers via monitoring tool.
    console.error(
      'No Piwik URL or site ID provided. Please, either disable Piwik instantiation for this environment or include a URL and ID as an environment variable.'
    )

    return
  }

  PiwikPro.initialize(piwikSiteId, piwikUrl)
  PiwikInstance = true
}

function useAnalytics() {
  const [prevLocation, setPrevLocation] = useState('')

  const trackPageVisit = useCallback(
    (message?: string) => {
      let path = window?.location.href.split(/[?#]/)[0]

      if (!path.endsWith('/')) path = `${path}/`

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
