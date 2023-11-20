import { Feature, FeatureCollection, Point } from 'geojson'

import { api } from '..'

interface Bollard extends Feature {
  id: number
  geometry: Point
}

interface BollardCollection extends FeatureCollection {
  features: [] | Bollard[]
}

const ENDPOINT = 'v1/bollards'

function getBollards(signal?: AbortSignal): Promise<BollardCollection> {
  return api.get(ENDPOINT, { signal }).then(response => response.data)
}

function getUrl() {
  return api.getUri({ url: ENDPOINT })
}

export type { Bollard, BollardCollection }
export { ENDPOINT, getBollards, getUrl }
export default getBollards
