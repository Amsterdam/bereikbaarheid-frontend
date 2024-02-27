import api from '../../data.amsterdam'

const ENDPOINT = 'v1/touringcar/downloads/csv'

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
