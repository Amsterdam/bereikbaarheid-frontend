import { Feature, FeatureCollection, Point } from 'geojson'

import api from '../../data.amsterdam'

interface TouringcarTrafficHeight extends Feature {
  id: number
  geometry: Point
  omschrijving: string
  maximaleDoorrijhoogte: string
}

interface TouringcarTrafficHeightCollection extends FeatureCollection {
  features: [] | TouringcarTrafficHeight[]
}

interface TouringcarTrafficHeightsParams {
  _format: 'geojson' | 'json' | 'csv'
}

const ENDPOINT = 'v1/touringcars/doorrijhoogtes'

function getTouringcarTrafficHeights(
  params: TouringcarTrafficHeightsParams = {
    _format: 'geojson',
  },
  signal?: AbortSignal
): Promise<TouringcarTrafficHeightCollection> {
  return api.get(ENDPOINT, { params, signal }).then(response => response.data)
}

function getUrl(params?: TouringcarTrafficHeightsParams) {
  return api.getUri({
    params: params,
    url: ENDPOINT,
  })
}

export type { TouringcarTrafficHeight, TouringcarTrafficHeightCollection }
export { ENDPOINT, getTouringcarTrafficHeights, getUrl }
export default getTouringcarTrafficHeights
