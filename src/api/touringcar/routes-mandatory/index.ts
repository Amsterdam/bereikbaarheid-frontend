import { Feature, FeatureCollection, LineString, MultiLineString } from 'geojson'

import api from '../../data.amsterdam'

interface TouringcarRoutesMandatory extends Feature {
  id: number
  geometry: LineString | MultiLineString
  omschrijving: string
}

interface TouringcarRoutesMandatoryCollection extends FeatureCollection {
  features: [] | TouringcarRoutesMandatory[]
}

interface TouringcarRoutesMandatoryParams {
  _format: 'geojson' | 'json' | 'csv'
}

const ENDPOINT = 'v1/touringcars/verplichteroutes'

function getTouringcarRoutesMandatory(
  params: TouringcarRoutesMandatoryParams = {
    _format: 'geojson',
  },
  signal?: AbortSignal
): Promise<TouringcarRoutesMandatoryCollection> {
  return api.get(ENDPOINT, { params, signal }).then(response => response.data)
}

function getUrl(params?: TouringcarRoutesMandatoryParams) {
  return api.getUri({
    params: params,
    url: ENDPOINT,
  })
}

export type { TouringcarRoutesMandatory, TouringcarRoutesMandatoryCollection }
export { ENDPOINT, getTouringcarRoutesMandatory, getUrl }
export default getTouringcarRoutesMandatory
