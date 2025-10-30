import { TouringcarMessage } from '../../../../api/touringcar/messages'
import { TouringcarParkingSpace } from '../../../../api/touringcar/parking-spaces'
import { TouringcarStop } from '../../../../api/touringcar/stops'
import { TouringcarVehicleHeight } from '../../../../api/touringcar/vehicle-heights'
import L from 'leaflet'
import { MapLayerId } from '../../../../pages/Touringcar/contexts/MapContext'

import SvgTouringcarMessageMarker from './images/bericht.svg?url'
import SvgTouringcarVehicleHeightMarker from './images/doorrijhoogte.svg?url'
import SvgTouringcarStopMarker from './images/halte.svg?url'
import SvgTouringcarParkingSpaceMarker from './images/parkeerplaats.svg?url'

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
    html: `<div style="position: relative; width: 36px; height: 39px;">
      <img src="${MapLayerIdToImage[layerId]}" style="width: 36px; height: 39px; display: block;" alt="" />
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${textColor};
        font-family: sans-serif;
        font-size: 12px;
        font-weight: bold;
        pointer-events: none;
      ">${textContent || ''}</div>
    </div>`,
    iconSize: [36, 39],
    iconAnchor: [18, 39],
    tooltipAnchor: [18, -19.5],
  })
}

function TouringcarMarker(item: TouringcarGeometryPoints, layerId: MapLayerId, label?: string) {
  let textContent, textColor

  if (item.properties?.maximaleDoorrijhoogte) {
    textContent = item.properties.maximaleDoorrijhoogte
    textColor = 'black'
  } else if (item.properties?.omschrijving) {
    textContent = item.properties?.omschrijving.split(':')[0]
  } else if (label) {
    textContent = label
  }

  const latLng = new L.LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0])
  const marker = L.marker(latLng, {
    icon: TouringcarMarkerIcon(layerId, textContent, textColor),
  })

  return marker
}

export default TouringcarMarker
