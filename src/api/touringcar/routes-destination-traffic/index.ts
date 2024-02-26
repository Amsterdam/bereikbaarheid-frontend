import { Feature, FeatureCollection, LineString, MultiLineString } from 'geojson'

import api from '../../data.amsterdam'

interface TouringcarRoutesDestinationTraffic extends Feature {
  id: number
  geometry: LineString | MultiLineString
  omschrijving: string
}

interface TouringcarRoutesDestinationTrafficCollection extends FeatureCollection {
  features: [] | TouringcarRoutesDestinationTraffic[]
}

interface TouringcarRoutesDestinationTrafficParams {
  _format: 'geojson' | 'json' | 'csv'
}

const ENDPOINT = 'touringcars/wegwerkzaamheden'

function getTouringcarRoutesDestinationTraffic(
  params: TouringcarRoutesDestinationTrafficParams = {
    _format: 'geojson',
  },
  signal?: AbortSignal
): Promise<TouringcarRoutesDestinationTrafficCollection> {
  return api.get(ENDPOINT, { params, signal }).then(response => response.data)
}

function getUrl(params?: TouringcarRoutesDestinationTrafficParams) {
  return api.getUri({
    params: params,
    url: ENDPOINT,
  })
}

export type { TouringcarRoutesDestinationTraffic, TouringcarRoutesDestinationTrafficCollection }
export { ENDPOINT, getTouringcarRoutesDestinationTraffic, getUrl }
export default getTouringcarRoutesDestinationTraffic
