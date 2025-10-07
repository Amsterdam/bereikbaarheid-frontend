import { http, HttpResponse } from 'msw'

import { ENDPOINT as ENDPOINT_BOLLARDS } from '../src/api/bereikbaarheid/bollards'
import { ENDPOINT as ENDPOINT_ROAD_SECTION } from '../src/api/bereikbaarheid/road-elements'
import { ENDPOINT as ENDPOINT_LOAD_UNLOAD } from '../src/api/bereikbaarheid/road-sections/load-unload'
import { ENDPOINT as ENDPOINT_PROHIBITORY_ROADS } from '../src/api/bereikbaarheid/roads/prohibitory'
import { ENDPOINT as ENDPOINT_TRAFFIC_SIGNS } from '../src/api/bereikbaarheid/traffic-signs'
import { API_URL as API_URL_GEOSEARCH } from '../src/api/geosearch'
import { API_URL as API_URL_PARKEERVAKKEN } from '../src/api/parkeervakken'
import { ENDPOINT as ENDPOINT_ADDRESS_SEARCH } from '../src/api/pdok/search/address'
import { ENDPOINT as ENDPOINT_RDW_AXLES } from '../src/api/rdw/axles'
import { ENDPOINT as ENDPOINT_RDW_FUEL } from '../src/api/rdw/fuel'
import { ENDPOINT as ENDPOINT_RDW_SUBCATEGORY } from '../src/api/rdw/subcategory'
import { ENDPOINT as ENDPOINT_RDW_VEHICLE } from '../src/api/rdw/vehicle'
import { ENDPOINT as ENDPOINT_TOURINGCAR_ENVIRONMENTAL_ZONE } from '../src/api/touringcar/environmental-zone'
import { ENDPOINT as ENDPOINT_TOURINGCAR_MESSAGES } from '../src/api/touringcar/messages'
import { ENDPOINT as ENDPOINT_TOURINGCAR_PARKING_SPACES } from '../src/api/touringcar/parking-spaces'
import { ENDPOINT as ENDPOINT_TOURINGCAR_ROUTES_DESTINATION_TRAFFIC } from '../src/api/touringcar/routes-destination-traffic'
import { ENDPOINT as ENDPOINT_TOURINGCAR_ROUTES_MANDATORY } from '../src/api/touringcar/routes-mandatory'
import { ENDPOINT as ENDPOINT_TOURINGCAR_ROUTES_RECOMMENDED } from '../src/api/touringcar/routes-recommended'
import { ENDPOINT as ENDPOINT_TOURINGCAR_STOPS } from '../src/api/touringcar/stops'
import { ENDPOINT as ENDPOINT_TOURINGCAR_VEHICLE_HEIGHTS } from '../src/api/touringcar/vehicle-heights'
import { ENDPOINT as ENDPOINT_WFS_WIOR } from '../src/api/wfs/wior'

export const handlers = [
  http.get(ENDPOINT_ADDRESS_SEARCH, ({ request }) => {
    const url = new URL(request.url)
    const searchResultsMock = getAddressResults(url.searchParams)
    return HttpResponse.json(searchResultsMock)
  }),

  http.get(`/${ENDPOINT_LOAD_UNLOAD}`, () => {
    const loadUnloadMock = require('./mocks/bereikbaarheid/road-sections/load-unload/data.json')
    return HttpResponse.json(loadUnloadMock)
  }),

  http.get(ENDPOINT_PROHIBITORY_ROADS, () => {
    const roadsMock = require('./mocks/bereikbaarheid/roads/prohibitory/data.json')
    return HttpResponse.json(roadsMock)
  }),

  http.get(`/${ENDPOINT_BOLLARDS}`, () => {
    const bollardsMock = require('./mocks/bereikbaarheid/stops/data.json')
    return HttpResponse.json(bollardsMock)
  }),

  http.get(`/${ENDPOINT_ROAD_SECTION}:roadSectionId`, ({ params }) => {
    const { roadSectionId } = params
    const roadSectionMock = getRoadSection(roadSectionId)
    return HttpResponse.json(roadSectionMock)
  }),

  http.get(ENDPOINT_TRAFFIC_SIGNS, () => {
    const trafficSignsMock = require('./mocks/bereikbaarheid/traffic-signs/data.json')
    return HttpResponse.json(trafficSignsMock)
  }),

  http.get(ENDPOINT_RDW_AXLES, ({ request }) => {
    const url = new URL(request.url)
    const licensePlate = url.searchParams.get('kenteken')
    const axlesMock = !licensePlate ? [] : require(`./mocks/rdw/axles/${licensePlate.toLowerCase()}.json`)
    return HttpResponse.json(axlesMock)
  }),

  http.get(ENDPOINT_RDW_FUEL, ({ request }) => {
    const url = new URL(request.url)
    const licensePlate = url.searchParams.get('kenteken')
    const fuelMock = !licensePlate ? [] : require(`./mocks/rdw/fuel/${licensePlate.toLowerCase()}.json`)
    return HttpResponse.json(fuelMock)
  }),

  http.get(ENDPOINT_RDW_SUBCATEGORY, ({ request }) => {
    const url = new URL(request.url)
    const licensePlate = url.searchParams.get('kenteken')
    const subcategoryMock = !licensePlate ? [] : require(`./mocks/rdw/subcategory/${licensePlate.toLowerCase()}.json`)
    return HttpResponse.json(subcategoryMock)
  }),

  http.get(ENDPOINT_RDW_VEHICLE, ({ request }) => {
    const url = new URL(request.url)
    const vehicleMock = getVehicle(url.searchParams)
    return HttpResponse.json(vehicleMock.body, { status: vehicleMock.status })
  }),

  http.get(ENDPOINT_WFS_WIOR, () => {
    const wiorFeaturesMock = require('./mocks/wfs/wior/data.json')
    return HttpResponse.json(wiorFeaturesMock)
  }),

  http.get(API_URL_GEOSEARCH, ({ request }) => {
    const url = new URL(request.url)
    const datasets = url.searchParams.get('datasets')
    const lat = url.searchParams.get('lat')
    const lon = url.searchParams.get('lon')

    let searchResultMock
    if (datasets === 'parkeervakken') {
      searchResultMock = getParkingSpaceResults(lat, lon)
    }

    return HttpResponse.json(searchResultMock)
  }),

  http.get(`${API_URL_PARKEERVAKKEN}/122028486875/`, () => {
    const parkingSpaceMock = require('./mocks/parkingSpace-122028486875.json')
    return HttpResponse.json(parkingSpaceMock)
  }),

  http.get(ENDPOINT_TOURINGCAR_MESSAGES, () => {
    const touringcarMessagesMock = require('./mocks/touringcar/messages/data.json')
    return HttpResponse.json(touringcarMessagesMock)
  }),

  http.get(ENDPOINT_TOURINGCAR_STOPS, () => {
    const touringcarStopsMock = require('./mocks/touringcar/stops/data.json')
    return HttpResponse.json(touringcarStopsMock)
  }),

  http.get(ENDPOINT_TOURINGCAR_PARKING_SPACES, () => {
    const touringcarParkingSpacesMock = require('./mocks/touringcar/parking-spaces/data.json')
    return HttpResponse.json(touringcarParkingSpacesMock)
  }),

  http.get(ENDPOINT_TOURINGCAR_VEHICLE_HEIGHTS, () => {
    const touringcarVehicleHeightsMock = require('./mocks/touringcar/vehicle-heights/data.json')
    return HttpResponse.json(touringcarVehicleHeightsMock)
  }),

  http.get(ENDPOINT_TOURINGCAR_ENVIRONMENTAL_ZONE, () => {
    const touringcarEnvironmentalZoneMock = require('./mocks/touringcar/environmental-zone/data.json')
    return HttpResponse.json(touringcarEnvironmentalZoneMock)
  }),

  http.get(ENDPOINT_TOURINGCAR_ROUTES_DESTINATION_TRAFFIC, () => {
    const touringcarRoutesDestinationTrafficMock = require('./mocks/touringcar/routes-destination-traffic/data.json')
    return HttpResponse.json(touringcarRoutesDestinationTrafficMock)
  }),

  http.get(ENDPOINT_TOURINGCAR_ROUTES_MANDATORY, () => {
    const touringcarRoutesMandatoryMock = require('./mocks/touringcar/routes-mandatory/data.json')
    return HttpResponse.json(touringcarRoutesMandatoryMock)
  }),

  http.get(ENDPOINT_TOURINGCAR_ROUTES_RECOMMENDED, () => {
    const touringcarRoutesRecommendedMock = require('./mocks/touringcar/routes-recommended/data.json')
    return HttpResponse.json(touringcarRoutesRecommendedMock)
  }),
]

const getAddressResults = (params: URLSearchParams) => {
  let result = require('./mocks/pdok/search/address/groenb.json')

  if (params.get('q') === '"Noresults"') {
    result = require('./mocks/pdok/search/address/no-results.json')
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

const getRoadSection = (id: string | ReadonlyArray<string>) => {
  if (id === '24115') {
    return require('./mocks/bereikbaarheid/road-elements/241115-withoutTrafficCounts.json')
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
    'BXLS14': require('./mocks/rdw/vehicle/bxls14.json'), // valid vehicle
    'OT77FJ': require('./mocks/rdw/vehicle/ot77fj.json'), // trailer
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
