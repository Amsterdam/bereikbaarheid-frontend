import config from 'config'
import { Feature, FeatureCollection, Point } from 'geojson'

import { api } from '../../bereikbaarheid'

interface TouringcarParkingSpace extends Feature {
  id: number
  geometry: Point
  omschrijving: string
  bijzonderheden: string
  plaatsen: string
  meerInformatie: string
  url: string
  maximaleDoorrijhoogte?: string
}

interface TouringcarParkingSpaceCollection extends FeatureCollection {
  features: [] | TouringcarParkingSpace[]
}

interface TouringcarParkingSpacesParams {
  _format: 'geojson' | 'json' | 'csv'
}

const ENDPOINT = `${config.API_ROOT}/touringcar/parkeerplaatsen`

function getTouringcarParkingSpaces(
  params: TouringcarParkingSpacesParams = {
    _format: 'geojson',
  },
  signal?: AbortSignal
): Promise<TouringcarParkingSpaceCollection> {
  return api.get(ENDPOINT, { params, signal }).then(response => response.data)
}

function getUrl(params?: TouringcarParkingSpacesParams) {
  return api.getUri({
    params: params,
    url: ENDPOINT,
  })
}

export type { TouringcarParkingSpace, TouringcarParkingSpaceCollection }
export { ENDPOINT, getTouringcarParkingSpaces, getUrl }
export default getTouringcarParkingSpaces
