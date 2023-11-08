import { Feature, FeatureCollection, Geometry } from 'geojson'

import api from '../../data.amsterdam'

interface TouringcarRoutesDestinationTraffic extends Feature {
  id: number
  geometry: Geometry
  omschrijving: string
}

interface TouringcarRoutesDestinationTrafficCollection
  extends FeatureCollection {
  features: [] | TouringcarRoutesDestinationTraffic[]
}

interface TouringcarRoutesDestinationTrafficParams {
  _format: 'geojson' | 'json' | 'csv'
}

const ENDPOINT = 'v1/touringcars/wegwerkzaamheden'

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

export type {
  TouringcarRoutesDestinationTraffic,
  TouringcarRoutesDestinationTrafficCollection,
}
export { ENDPOINT, getTouringcarRoutesDestinationTraffic, getUrl }
export default getTouringcarRoutesDestinationTraffic
