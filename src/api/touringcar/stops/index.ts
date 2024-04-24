import { Feature, FeatureCollection, Point } from 'geojson'

import api from '../../data.amsterdam'

interface TouringcarStop extends Feature {
  id: string
  geometry: Point
  omschrijving: string
  bijzonderheden: string
  plaatsen: string
  maximaleDoorrijhoogte?: string
}

interface TouringcarStopCollection extends FeatureCollection {
  features: [] | TouringcarStop[]
}

interface TouringcarStopsParams {
  _format: 'geojson' | 'json' | 'csv'
}

const ENDPOINT = 'v1/touringcars/haltes'

function getTouringcarStops(
  params: TouringcarStopsParams = {
    _format: 'geojson',
  },
  signal?: AbortSignal
): Promise<TouringcarStopCollection> {
  return api.get(ENDPOINT, { params, signal }).then(response => response.data)
}

function getUrl(params?: TouringcarStopsParams) {
  return api.getUri({
    params: params,
    url: ENDPOINT,
  })
}

export type { TouringcarStop, TouringcarStopCollection }
export { ENDPOINT, getTouringcarStops, getUrl }
export default getTouringcarStops
