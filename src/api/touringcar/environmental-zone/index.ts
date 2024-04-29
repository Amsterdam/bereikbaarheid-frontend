import { Feature, FeatureCollection, MultiPolygon } from 'geojson'

import api from '../../data.amsterdam'

interface TouringcarEnvironmentalZone extends Feature {
  id: number
  geometry: MultiPolygon
  omschrijving: string
}

interface TouringcarEnvironmentalZoneCollection extends FeatureCollection {
  features: [] | TouringcarEnvironmentalZone[]
}

interface TouringcarEnvironmentalZoneParams {
  _format: 'geojson' | 'json' | 'csv'
}

const ENDPOINT = 'v1/milieuzones/touringcar'

function getTouringcarEnvironmentalZone(
  params: TouringcarEnvironmentalZoneParams = {
    _format: 'geojson',
  },
  signal?: AbortSignal
): Promise<TouringcarEnvironmentalZoneCollection> {
  return api.get(ENDPOINT, { params, signal }).then(response => response.data)
}

function getUrl(params?: TouringcarEnvironmentalZoneParams) {
  return api.getUri({
    params: params,
    url: ENDPOINT,
  })
}

export type { TouringcarEnvironmentalZone, TouringcarEnvironmentalZoneCollection }
export { ENDPOINT, getTouringcarEnvironmentalZone, getUrl }
export default getTouringcarEnvironmentalZone
