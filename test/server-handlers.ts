import { rest } from 'msw'

import { ENDPOINT as ENDPOINT_ADDRESS_SEARCH } from '../src/api/atlas/search/address'
import { ENDPOINT as ENDPOINT_ROAD_SECTION } from '../src/api/bereikbaarheid/road-elements'
import { ENDPOINT as ENDPOINT_ROAD_OBSTRUCTIONS } from '../src/api/bereikbaarheid/road-obstructions'
import { ENDPOINT as ENDPOINT_LOAD_UNLOAD } from '../src/api/bereikbaarheid/road-sections/load-unload'
import { ENDPOINT as ENDPOINT_PROHIBITORY_ROADS } from '../src/api/bereikbaarheid/roads/prohibitory'
import { ENDPOINT as ENDPOINT_TRAFFIC_SIGNS } from '../src/api/bereikbaarheid/traffic-signs'
import { API_URL as API_URL_GEOSEARCH } from '../src/api/geosearch'
import { API_URL as API_URL_PARKEERVAKKEN } from '../src/api/parkeervakken'
import { ENDPOINT as ENDPOINT_RDW_AXLES } from '../src/api/rdw/axles'
import { ENDPOINT as ENDPOINT_RDW_FUEL } from '../src/api/rdw/fuel'
import { ENDPOINT as ENDPOINT_RDW_SUBCATEGORY } from '../src/api/rdw/subcategory'
import { ENDPOINT as ENDPOINT_RDW_VEHICLE } from '../src/api/rdw/vehicle'
import { ENDPOINT as ENDPOINT_TOURINGCAR_PARKING_SPACES } from '../src/api/touringcar/parking-spaces'
import { ENDPOINT as ENDPOINT_TOURINGCAR_ROUTES_MANDATORY } from '../src/api/touringcar/routes-mandatory'
import { ENDPOINT as ENDPOINT_TOURINGCAR_STOPS } from '../src/api/touringcar/stops'
import { ENDPOINT as ENDPOINT_WFS_WIOR } from '../src/api/wfs/wior'

export const handlers = [
  rest.get(ENDPOINT_ADDRESS_SEARCH, (req, res, ctx) => {
    const searchResultsMock = getAddressResults(req.url.searchParams)
    return res(ctx.status(200), ctx.json(searchResultsMock))
  }),

  rest.get(`/${ENDPOINT_LOAD_UNLOAD}`, (req, res, ctx) => {
    const loadUnloadMock = require('./mocks/bereikbaarheid/road-sections/load-unload/data.json')
    return res(ctx.status(200), ctx.json(loadUnloadMock))
  }),

  rest.get(ENDPOINT_PROHIBITORY_ROADS, (req, res, ctx) => {
    const roadsMock = require('./mocks/bereikbaarheid/roads/prohibitory/data.json')
    return res(ctx.status(200), ctx.json(roadsMock))
  }),

  rest.get(`/${ENDPOINT_ROAD_OBSTRUCTIONS}`, (req, res, ctx) => {
    const roadObstructionsMock = getRoadObstructions(req.url.searchParams)
    return res(ctx.status(200), ctx.json(roadObstructionsMock))
  }),

  rest.get(`/${ENDPOINT_ROAD_SECTION}:roadSectionId`, (req, res, ctx) => {
    const { roadSectionId } = req.params
    const roadSectionMock = getRoadSection(roadSectionId)
    return res(ctx.status(200), ctx.json(roadSectionMock))
  }),

  rest.get(ENDPOINT_TRAFFIC_SIGNS, (req, res, ctx) => {
    const trafficSignsMock = require('./mocks/bereikbaarheid/traffic-signs/data.json')
    return res(ctx.status(200), ctx.json(trafficSignsMock))
  }),

  rest.get(ENDPOINT_RDW_AXLES, (req, res, ctx) => {
    const licensePlate = req.url.searchParams.get('kenteken')
    const axlesMock = !licensePlate
      ? []
      : require(`./mocks/rdw/axles/${licensePlate.toLowerCase()}.json`)

    return res(ctx.status(200), ctx.json(axlesMock))
  }),

  rest.get(ENDPOINT_RDW_FUEL, (req, res, ctx) => {
    const licensePlate = req.url.searchParams.get('kenteken')
    const fuelMock = !licensePlate
      ? []
      : require(`./mocks/rdw/fuel/${licensePlate.toLowerCase()}.json`)

    return res(ctx.status(200), ctx.json(fuelMock))
  }),

  rest.get(ENDPOINT_RDW_SUBCATEGORY, (req, res, ctx) => {
    const licensePlate = req.url.searchParams.get('kenteken')
    const subcategoryMock = !licensePlate
      ? []
      : require(`./mocks/rdw/subcategory/${licensePlate.toLowerCase()}.json`)

    return res(ctx.status(200), ctx.json(subcategoryMock))
  }),

  rest.get(ENDPOINT_RDW_VEHICLE, (req, res, ctx) => {
    const vehicleMock = getVehicle(req.url.searchParams)
    return res(ctx.status(vehicleMock.status), ctx.json(vehicleMock.body))
  }),

  rest.get(ENDPOINT_WFS_WIOR, (req, res, ctx) => {
    const wiorFeaturesMock = require('./mocks/wfs/wior/data.json')
    return res(ctx.status(200), ctx.json(wiorFeaturesMock))
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

  rest.get(ENDPOINT_TOURINGCAR_STOPS, (_req, res, ctx) => {
    const touringcarStopsMock = require('./mocks/touringcar/stops/data.json')
    return res(ctx.status(200), ctx.json(touringcarStopsMock))
  }),

  rest.get(ENDPOINT_TOURINGCAR_PARKING_SPACES, (_req, res, ctx) => {
    const touringcarParkingSpacesMock = require('./mocks/touringcar/parking-signs/data.json')
    return res(ctx.status(200), ctx.json(touringcarParkingSpacesMock))
  }),

  rest.get(ENDPOINT_TOURINGCAR_ROUTES_MANDATORY, (_req, res, ctx) => {
    const touringcarRoutesMandatoryMock = require('./mocks/touringcar/routes-mandatory/data.json')
    return res(ctx.status(200), ctx.json(touringcarRoutesMandatoryMock))
  }),
]

const getAddressResults = (params: URLSearchParams) => {
  let result = require('./mocks/atlas/search/address/groenb.json')

  if (params.get('q') === 'Noresults') {
    result = require('./mocks/atlas/search/address/no-results.json')
  }

  return result
}

const getParkingSpaceResults = (lat: string | null, lon: string | null) => {
  if (lat === '52.36876459937893' && lon === '4.903081749692417') {
    return require('./mocks/geosearchParkingSpace.json')
  }

  if (lat === '52.37953213655618' && lon === '4.893368482589723') {
    return require('./mocks/geosearchParkingSpaceNoResults.json')
  }

  return console.error('no parking spaces mock found.')
}

const getRoadObstructions = (params: URLSearchParams) => {
  let result = require('./mocks/bereikbaarheid/road-obstructions/data.json')

  if (params.get('date') === '2023-06-15') {
    result = require('./mocks/bereikbaarheid/road-obstructions/data-2023-06-15.json')
  }

  return result
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

const getVehicle = (params: URLSearchParams) => {
  const licensePlate = params.get('kenteken')
  const mocks: Record<string, string> = {
    '24BJL7': require('./mocks/rdw/vehicle/24bjl7.json'), // vehicle + trailer use case
    '65JRDP': require('./mocks/rdw/vehicle/65jrdp.json'), // no maximum allowed weight
    '85BPF2': require('./mocks/rdw/vehicle/85bpf2.json'), // mobile crane
    BXLS14: require('./mocks/rdw/vehicle/bxls14.json'), // valid vehicle
    OT77FJ: require('./mocks/rdw/vehicle/ot77fj.json'), // trailer
  }

  if (licensePlate === 'API429') {
    return { status: 429, body: {} }
  }

  if (licensePlate === 'API500') {
    return { status: 500, body: {} }
  }

  if (licensePlate && Object.hasOwn(mocks, licensePlate)) {
    return { status: 200, body: mocks[licensePlate] }
  }

  // RDW returns an empty array when a license plate is not found
  return { status: 200, body: [] }
}
