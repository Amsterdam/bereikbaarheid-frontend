import { rest } from 'msw'

import { API_URL as API_URL_GEOSEARCH } from '../src/api/geosearch'
import { API_URL as API_URL_PARKEERVAKKEN } from '../src/api/parkeervakken'
import { API_URL as API_URL_RDW_VEHICLE } from '../src/api/rdw/vehicle'
import { ENDPOINT as ENDPOINT_ROAD_SECTION } from '../src/api/bereikbaarheid/road-elements'

export const handlers = [
  rest.get(`/${ENDPOINT_ROAD_SECTION}:roadSectionId`, (req, res, ctx) => {
    const { roadSectionId } = req.params
    const roadSectionMock = getRoadSection(roadSectionId)
    return res(ctx.status(200), ctx.json(roadSectionMock))
  }),

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

  rest.get(API_URL_RDW_VEHICLE, (req, res, ctx) => {
    const licensePlate = req.url.searchParams.get('kenteken')
    let searchResultMock

    if (licensePlate === 'API429') {
      return res(ctx.status(429), ctx.json({}))
    }

    if (licensePlate === 'API500') {
      return res(ctx.status(500), ctx.json({}))
    }

    if (licensePlate === 'OT77FJ') {
      searchResultMock = require('./mocks/rdw/oplegger.json')
    }

    return res(ctx.status(200), ctx.json(searchResultMock))
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

const getRoadSection = (id: string | ReadonlyArray<string>) => {
  if (id === '24115') {
    return require('./mocks/bereikbaarheid/road-elements/241115-withRoadObstructions.json')
  }

  if (id === '404404') {
    return require('./mocks/bereikbaarheid/road-elements/not-found.json')
  }

  return console.error('no roadSection mock found.')
}
