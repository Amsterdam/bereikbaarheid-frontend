import { getUrl as getTouringcarEnvironmentalZoneUrl } from 'api/touringcar/environmental-zone'
import { getUrl as getTouringcarParkingSpacesUrl } from 'api/touringcar/parking-spaces'
import { getUrl as getTouringcarRoutesDestinationTrafficUrl } from 'api/touringcar/routes-destination-traffic'
import { getUrl as getTouringcarRoutesMandatoryUrl } from 'api/touringcar/routes-mandatory'
import { getUrl as getTouringcarRoutesRecommendedUrl } from 'api/touringcar/routes-recommended'
import { getUrl as getTouringcarStopsUrl } from 'api/touringcar/stops'
import { getUrl as getTouringcarVehicleHeightsUrl } from 'api/touringcar/vehicle-heights'

const touringcarStopsLink = {
  href: getTouringcarStopsUrl(),
  title: '_pageTouringcar._dataSources.stopsForCoaches',
  beta: true,
}

const touringcarParkingSpacesLink = {
  href: getTouringcarParkingSpacesUrl(),
  title: '_pageTouringcar._dataSources.parkingSpacesForCoaches',
  beta: true,
}

const touringcarVehicleHeightsLink = {
  href: getTouringcarVehicleHeightsUrl(),
  title: '_pageTouringcar._dataSources.maxVehicleHeight',
  beta: true,
}

const touringcarRoutesDestinationTrafficLink = {
  href: getTouringcarRoutesDestinationTrafficUrl(),
  title: '_pageTouringcar._dataSources.destinationTraffic',
  beta: true,
}

const touringcarRoutesRecommendedLink = {
  href: getTouringcarRoutesRecommendedUrl(),
  title: '_pageTouringcar._dataSources.recommendedRoutes',
  beta: true,
}

const touringcarRoutesMandatoryLink = {
  href: getTouringcarRoutesMandatoryUrl(),
  title: '_pageTouringcar._dataSources.mandatoryRoutes',
  beta: true,
}

const touringcarEnvironmentalZoneLink = {
  href: getTouringcarEnvironmentalZoneUrl(),
  title: '_pageTouringcar._dataSources.environmentalZone',
  beta: true,
}

const dataLinks = [
  touringcarStopsLink,
  touringcarParkingSpacesLink,
  touringcarVehicleHeightsLink,
  touringcarRoutesDestinationTrafficLink,
  touringcarRoutesRecommendedLink,
  touringcarRoutesMandatoryLink,
  touringcarEnvironmentalZoneLink,
]

export {
  touringcarStopsLink,
  touringcarParkingSpacesLink,
  touringcarVehicleHeightsLink,
  touringcarRoutesDestinationTrafficLink,
  touringcarRoutesRecommendedLink,
  touringcarRoutesMandatoryLink,
  touringcarEnvironmentalZoneLink,
}

export default dataLinks
