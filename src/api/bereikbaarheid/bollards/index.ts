import { Feature, FeatureCollection, Point } from 'geojson'

import { api } from '..'
import config from '../../../config'

type DayOfTheWeek = 'ma' | 'di' | 'wo' | 'do' | 'vr' | 'za' | 'zo'

interface Bollard extends Feature {
  geometry: Point
  properties: {
    id: string
    type: string
    location: string
    days: DayOfTheWeek[]
    window_times: string
    entry_system: string
    details: string
  }
}

interface BollardCollection extends FeatureCollection {
  features: Bollard[]
}

const ENDPOINT = `${config.API_ROOT}/bollards`

function getBollards(signal?: AbortSignal): Promise<BollardCollection> {
  return api.get(ENDPOINT, { signal }).then(response => response.data)
}

function getUrl() {
  return api.getUri({ url: ENDPOINT })
}

export type { Bollard, BollardCollection }
export { ENDPOINT, getBollards, getUrl }
export default getBollards
