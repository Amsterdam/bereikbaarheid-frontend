import PiwikPro from '@piwikpro/react-piwik-pro'

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

export { createPiwikInstance }
