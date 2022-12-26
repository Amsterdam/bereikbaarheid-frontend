import { BaseLayer } from '@amsterdam/arm-core'
import { TileLayer } from '@amsterdam/react-maps'

import { AddressMarker } from '../../../../shared/components/MapLayers/AddressMarker'
import {
  aerialImages,
  linkIds,
  oneWayArrows,
  topoBlackWhite,
  topoColorLight,
} from '../../../../shared/map/mapLayers'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'

import ProhibitorySignsLoadUnloadSpacesLayer from './LoadUnloadSpacesLayer'
import ProhibitorySignsNearestRoadMarker from './NearestRoadMarker'
import ProhibitorySignsParkingSpaceHighlight from './ParkingSpaceHighlight'
import ProhibitorySignsProhibitoryRoadsLayer from './ProhibitoryRoadsLayer'
import ProhibitorySignsRoadNetwork from './RoadNetwork'
import ProhibitorySignsTrafficSignHighlightMarker from './TrafficSignHighlightMarker'
import ProhibitorySignsTrafficSignsLayer from './TrafficSignsLayer'
import ProhibitorySignsWideRoads from './WideRoads'

function selectedBaseLayer(id: string) {
  return [aerialImages, topoBlackWhite, topoColorLight].find(
    layer => layer.id === id
  )
}

const ProhibitorySignsMapLayers = () => {
  const { activeBaseLayer } = useProhibitorySignsMapContext()
  const { address, expertMode } = useProhibitorySignsPageContext()

  return (
    <>
      <AddressMarker address={address} />

      <ProhibitorySignsNearestRoadMarker />

      <ProhibitorySignsWideRoads />

      <ProhibitorySignsProhibitoryRoadsLayer />

      <ProhibitorySignsRoadNetwork />

      <ProhibitorySignsTrafficSignsLayer />

      <ProhibitorySignsTrafficSignHighlightMarker />

      <ProhibitorySignsLoadUnloadSpacesLayer />

      <ProhibitorySignsParkingSpaceHighlight />

      {expertMode && (
        <TileLayer options={linkIds.options} args={[linkIds.url]} />
      )}

      <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

      <BaseLayer
        baseLayer={selectedBaseLayer(activeBaseLayer)!.url}
        options={selectedBaseLayer(activeBaseLayer)!.options}
      />
    </>
  )
}

export default ProhibitorySignsMapLayers
