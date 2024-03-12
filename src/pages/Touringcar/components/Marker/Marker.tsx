import { TouringcarMessage } from 'api/touringcar/messages'
import { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'
import { TouringcarStop } from 'api/touringcar/stops'
import { TouringcarVehicleHeight } from 'api/touringcar/vehicle-heights'
import L from 'leaflet'
import { MapLayerId } from 'pages/Touringcar/contexts/MapContext'

import SvgTouringcarMessageMarker from './images/bericht.svg'
import SvgTouringcarVehicleHeightMarker from './images/doorrijhoogte.svg'
import SvgTouringcarStopMarker from './images/halte.svg'
import SvgTouringcarParkingSpaceMarker from './images/parkeerplaats.svg'

type TouringcarGeometryPoints = TouringcarMessage | TouringcarParkingSpace | TouringcarStop | TouringcarVehicleHeight

const MapLayerIdToImage: Record<string, string> = {
  [MapLayerId.touringcarMessagesLayerId]: SvgTouringcarMessageMarker,
  [MapLayerId.touringcarStopsLayerId]: SvgTouringcarStopMarker,
  [MapLayerId.touringcarParkingSpacesLayerId]: SvgTouringcarParkingSpaceMarker,
  [MapLayerId.touringcarVehicleHeightsLayerId]: SvgTouringcarVehicleHeightMarker,
}

const TouringcarMarkerIcon = (
  layerId: MapLayerId = MapLayerId.touringcarParkingSpacesLayerId,
  textContent: string,
  textColor: string = 'white'
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
      color: ${textColor};
      font-family: sans-serif;
      font-size: 12px;
    ">${textContent}</div>`,
    iconSize: [36, 39],
    iconAnchor: [18, 39],
    tooltipAnchor: [18, -19.5],
  })
}

function TouringcarMarker(item: TouringcarGeometryPoints, layerId: MapLayerId, number?: number) {
  let textContent, textColor

  if (item.properties?.maximaleDoorrijhoogte) {
    textContent = item.properties.maximaleDoorrijhoogte
    textColor = 'black'
  } else if (item.properties?.omschrijving) {
    textContent = item.properties?.omschrijving.split(':')[0]
  } else if (number) {
    textContent = `${number}`
  }

  const latLng = new L.LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0])
  const marker = L.marker(latLng, {
    icon: TouringcarMarkerIcon(layerId, textContent, textColor),
  })

  return marker
}

export default TouringcarMarker
