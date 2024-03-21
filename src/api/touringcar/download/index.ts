import config from 'config'

import { api } from '../../bereikbaarheid/index'

const ENDPOINT = `${config.API_ROOT}/touringcar/downloads/csv`

function getTouringcarCsv(signal?: AbortSignal): Promise<string> {
  return api.get(ENDPOINT, { signal }).then(response => response.data)
}

function getUrl() {
  return api.getUri({
    url: ENDPOINT,
  })
}

export { ENDPOINT, getTouringcarCsv, getUrl }
export default getTouringcarCsv
