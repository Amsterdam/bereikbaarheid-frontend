import {
  BaseLayer,
  GeoJSON,
  Map,
  ViewerContainer,
  Zoom,
} from '@amsterdam/arm-core'
import { breakpoint, themeSpacing } from '@amsterdam/asc-ui'
import { TileLayer } from '@amsterdam/react-maps'
import { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import type L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { MapStyle } from '../../../shared/map/mapStyle'
import {
  defaultMapOptions,
  setMapDefaults,
} from '../../../shared/map/mapDefaults'
import {
  oneWayArrows,
  roadNetworkNoRestrictions,
  topoBlackWhite,
} from '../../../shared/map/mapLayers'
import { RoadSectionFeatureCollection } from '../../../api/bereikbaarheid/road-elements'

const StyledMap = styled(Map<typeof Map>)`
  height: 450px;
  width: 100%;
`

// otherwise the ViewerContainer causes a scrollbar
const MapContainer = styled.div`
  overflow: hidden;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: ${themeSpacing(8)};
  }
`

interface RoadSectionMapProps {
  roadSections: RoadSectionFeatureCollection
}

const RoadSectionMap = ({ roadSections }: RoadSectionMapProps) => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const [roadSectionLayer, setRoadSectionLayer] = useState<L.GeoJSON | null>(
    null
  )
  const theme = useTheme()

  useEffect(() => {
    if (mapInstance) {
      setMapDefaults(mapInstance)
    }
  }, [mapInstance])

  useEffect(() => {
    if (mapInstance && roadSectionLayer) {
      // center the map to the road section
      mapInstance.fitBounds(roadSectionLayer.getBounds(), { maxZoom: 18 })
    }
  }, [mapInstance, roadSectionLayer])

  return (
    <MapContainer>
      <MapStyle />
      <StyledMap options={defaultMapOptions} setInstance={setMapInstance}>
        <GeoJSON
          args={[roadSections]}
          options={{
            interactive: false,
            style: () => {
              return {
                color: theme.colors.secondary?.main,
                weight: 5,
              }
            },
          }}
          setInstance={setRoadSectionLayer}
        />

        <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

        <TileLayer
          options={{ ...roadNetworkNoRestrictions.options, opacity: 0.65 }}
          args={[roadNetworkNoRestrictions.url]}
        />

        <BaseLayer
          baseLayer={topoBlackWhite.url}
          options={topoBlackWhite.options}
        />

        <ViewerContainer bottomRight={<Zoom />} />
      </StyledMap>
    </MapContainer>
  )
}

export default RoadSectionMap
