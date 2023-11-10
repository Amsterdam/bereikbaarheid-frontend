import { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'
import { TouringcarStop } from 'api/touringcar/stops'
import L from 'leaflet'
import { MapLayerId } from 'pages/Touringcar/contexts/MapContext'

import SvgTouringcarStopMarker from './images/halte.svg'
import SvgTouringcarParkingSpaceMarker from './images/parkeerplaats.svg'

const MapLayerIdToImage: Record<string, string> = {
  [MapLayerId.touringcarStopsLayerId]: SvgTouringcarStopMarker,
  [MapLayerId.touringcarParkingSpacesLayerId]: SvgTouringcarParkingSpaceMarker,
}

const TouringcarMarkerIcon = (
  item: TouringcarParkingSpace | TouringcarStop,
  layerId: MapLayerId = MapLayerId.touringcarParkingSpacesLayerId
) => {
  return L.divIcon({
    html: `<div style="
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url(${MapLayerIdToImage[layerId]});
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

function TouringcarMarker(item: TouringcarParkingSpace | TouringcarStop, layerId: MapLayerId) {
  const marker = L.marker(new L.LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0]), {
    icon: TouringcarMarkerIcon(item, layerId),
  })

  return marker
}

export default TouringcarMarker
