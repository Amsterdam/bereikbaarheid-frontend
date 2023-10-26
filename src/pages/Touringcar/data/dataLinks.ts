import { getUrl as getTouringcarParkingSpacesUrl } from 'api/touringcar/parking-spaces'
import { getUrl as getTouringcarRoutesMandatoryUrl } from 'api/touringcar/routes-mandatory'

const touringcarParkingSpacesLink = {
  href: getTouringcarParkingSpacesUrl(),
  title: 'Parkeerplekken voor touringcars',
}

const touringcarRoutesMandatoryLink = {
  href: getTouringcarRoutesMandatoryUrl(),
  title: 'Parkeerplekken voor touringcars',
}

const dataLinks = [touringcarParkingSpacesLink, touringcarRoutesMandatoryLink]

export { touringcarParkingSpacesLink, touringcarRoutesMandatoryLink }
export default dataLinks
