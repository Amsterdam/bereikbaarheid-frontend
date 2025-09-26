import config from '../../../config'
import { Feature, FeatureCollection, Point } from 'geojson'

import { api } from '../../bereikbaarheid'

interface TouringcarVehicleHeight extends Feature {
  id: number
  geometry: Point
  omschrijving: string
  maximaleDoorrijhoogte: string
}

interface TouringcarVehicleHeightCollection extends FeatureCollection {
  features: [] | TouringcarVehicleHeight[]
}

interface TouringcarVehicleHeightsParams {
  _format: 'geojson' | 'json' | 'csv'
}

const ENDPOINT = `${config.API_ROOT}/touringcar/doorrijhoogten`

function getTouringcarVehicleHeights(
  params: TouringcarVehicleHeightsParams = {
    _format: 'geojson',
  },
  signal?: AbortSignal
): Promise<TouringcarVehicleHeightCollection> {
  return api.get(ENDPOINT, { params, signal }).then(response => response.data)
}

function getUrl(params?: TouringcarVehicleHeightsParams) {
  return api.getUri({
    params: params,
    url: ENDPOINT,
  })
}

export type { TouringcarVehicleHeight, TouringcarVehicleHeightCollection }
export { ENDPOINT, getTouringcarVehicleHeights, getUrl }
export default getTouringcarVehicleHeights
