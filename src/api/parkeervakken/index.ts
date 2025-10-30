//
// Amsterdam Parking spaces REST API
// https://api.data.amsterdam.nl/v1/parkeervakken/
//

import { headers } from '../../api/data.amsterdam'
import axios from 'axios'
import { Polygon } from 'geojson'

export const API_URL = 'https://api.data.amsterdam.nl/v1/parkeervakken/parkeervakken'

export interface ParkingSpaceRegime {
  soort: string
  eType: string
  eTypeDescription: string
  aantal: number
  bord: string
  kenteken: string | null
  beginTijd: string
  eindTijd: string
  beginDatum: string | null
  eindDatum: string | null
  dagen: string[]
  opmerking: string
}

export interface ParkingSpace {
  id: string
  buurtcode: string
  straatnaam: string
  type: string
  soort: string
  eType: string
  aantal: string
  geometry: Polygon
  regimes: ParkingSpaceRegime[]
}

export interface GetParkingSpaceProps {
  id: string | undefined
}

/**
 * Retrieve info of a parking space by ID
 * @param {string} id a unique value identifying this parking space
 */
export function getParkingSpaceById(id: string | undefined, signal: AbortSignal | undefined): Promise<ParkingSpace> {
  return typeof id === 'undefined'
    ? Promise.reject(new Error('Please provide a parking space id'))
    : axios
        .get(`${API_URL}/${id}/`, {
          headers: {
            ...headers,
            'accept-crs': 'EPSG:4258',
          },
          signal,
        })
        .then(response => response.data)
}
