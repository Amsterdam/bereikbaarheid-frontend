import { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'
import L from 'leaflet'

import SvgTouringcarParkingSpace from './images/parkeren.svg'

const TouringcarParkingSpaceIcon = (item: TouringcarParkingSpace) => {
  return L.divIcon({
    html: `<div style="
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url(${SvgTouringcarParkingSpace});
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      color: white;
      font-family: sans-serif;
      font-size: 12px;
    ">${item.properties?.omschrijving.split(':')[0]}</div>`,
    iconSize: [36, 39],
    iconAnchor: [18, 39],
    tooltipAnchor: [18, -19.5],
  })
}

export const TouringcarParkingSpaceMarker = (item: TouringcarParkingSpace) => {
  const marker = L.marker(
    new L.LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0]),
    {
      icon: TouringcarParkingSpaceIcon(item),
    }
  )

  return marker
}
