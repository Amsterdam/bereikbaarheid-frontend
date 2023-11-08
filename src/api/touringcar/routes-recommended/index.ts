import { Feature, FeatureCollection, Geometry } from 'geojson'

import api from '../../data.amsterdam'

interface TouringcarRoutesRecommended extends Feature {
  id: number
  geometry: Geometry
  omschrijving: string
}

interface TouringcarRoutesRecommendedCollection extends FeatureCollection {
  features: [] | TouringcarRoutesRecommended[]
}

interface TouringcarRoutesRecommendedParams {
  _format: 'geojson' | 'json' | 'csv'
}

const ENDPOINT = 'v1/touringcars/aanbevolenroutes'

function getTouringcarRoutesRecommended(
  params: TouringcarRoutesRecommendedParams = {
    _format: 'geojson',
  },
  signal?: AbortSignal
): Promise<TouringcarRoutesRecommendedCollection> {
  return api.get(ENDPOINT, { params, signal }).then(response => response.data)
}

function getUrl(params?: TouringcarRoutesRecommendedParams) {
  return api.getUri({
    params: params,
    url: ENDPOINT,
  })
}

export type { TouringcarRoutesRecommended, TouringcarRoutesRecommendedCollection }
export { ENDPOINT, getTouringcarRoutesRecommended, getUrl }
export default getTouringcarRoutesRecommended
