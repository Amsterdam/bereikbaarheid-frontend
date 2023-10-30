import { getUrl as getTouringcarParkingSpacesUrl } from 'api/touringcar/parking-spaces'
import { getUrl as getTouringcarRoutesMandatoryUrl } from 'api/touringcar/routes-mandatory'

const touringcarParkingSpacesLink = {
  href: getTouringcarParkingSpacesUrl(),
  title: '_pageTouringcar._dataSources.parkingSpacesForCoaches',
  beta: true,
}

const touringcarRoutesMandatoryLink = {
  href: getTouringcarRoutesMandatoryUrl(),
  title: '_pageTouringcar._dataSources.mandatoryRoutes',
  beta: true,
}

const dataLinks = [touringcarParkingSpacesLink, touringcarRoutesMandatoryLink]

export { touringcarParkingSpacesLink, touringcarRoutesMandatoryLink }
export default dataLinks
