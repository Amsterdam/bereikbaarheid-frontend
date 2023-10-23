import { getUrl } from 'api/touringcar/parking-spaces'

const touringcarParkingSpacesLink = {
  href: getUrl({ _format: 'geojson' }),
  title: 'Parkeerplekken voor touringcars',
}

const dataLinks = [touringcarParkingSpacesLink]

export { touringcarParkingSpacesLink }
export default dataLinks
