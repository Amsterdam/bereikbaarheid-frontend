import { getUrl as getTouringcarParkingSpacesUrl } from 'api/touringcar/parking-spaces'
import { getUrl as getTouringcarRoutesDestinationTrafficUrl } from 'api/touringcar/routes-destination-traffic'
import { getUrl as getTouringcarRoutesMandatoryUrl } from 'api/touringcar/routes-mandatory'
import { getUrl as getTouringcarRoutesRecommendedUrl } from 'api/touringcar/routes-recommended'
import { getUrl as getTouringcarStopsUrl } from 'api/touringcar/stops'

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

const dataLinks = [
  touringcarStopsLink,
  touringcarParkingSpacesLink,
  touringcarRoutesDestinationTrafficLink,
  touringcarRoutesRecommendedLink,
  touringcarRoutesMandatoryLink,
]

export {
  touringcarStopsLink,
  touringcarParkingSpacesLink,
  touringcarRoutesDestinationTrafficLink,
  touringcarRoutesRecommendedLink,
  touringcarRoutesMandatoryLink,
}

export default dataLinks
