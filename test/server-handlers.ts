import { rest } from 'msw'

import { API_URL as API_URL_GEOSEARCH } from '../src/api/geosearch'
import { API_URL as API_URL_PARKEERVAKKEN } from '../src/api/parkeervakken'

export const handlers = [
  rest.get(API_URL_GEOSEARCH, (req, res, ctx) => {
    const datasets = req.url.searchParams.get('datasets')
    const lat = req.url.searchParams.get('lat')
    const lon = req.url.searchParams.get('lon')

    let searchResultMock
    if (datasets === 'parkeervakken') {
      searchResultMock = getParkingSpaceResults(lat, lon)
    }

    return res(ctx.status(200), ctx.json(searchResultMock))
  }),

  rest.get(`${API_URL_PARKEERVAKKEN}/122028486875/`, (req, res, ctx) => {
    const parkingSpaceMock = require('./mocks/parkingSpace-122028486875.json')

    return res(ctx.status(200), ctx.json(parkingSpaceMock))
  }),
]

const getParkingSpaceResults = (lat: string | null, lon: string | null) => {
  if (lat === '52.36876459937893' && lon === '4.903081749692417') {
    return require('./mocks/geosearchParkingSpace.json')
  }

  if (lat === '52.37953213655618' && lon === '4.893368482589723') {
    return require('./mocks/geosearchParkingSpaceNoResults.json')
  }

  return console.error('no parking spaces mock found.')
}
