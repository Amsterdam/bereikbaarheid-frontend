import { getUrl } from 'api/touringcar/parking-spaces'

const touringcarParkingSpacesLink = {
  href: getUrl(),
  title: 'Parkeerplekken voor touringcars',
}

const dataLinks = [touringcarParkingSpacesLink]

export { touringcarParkingSpacesLink }
export default dataLinks
