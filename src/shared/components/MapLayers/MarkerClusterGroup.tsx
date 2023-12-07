// this file is largely copied from
// https://github.com/Amsterdam/amsterdam-react-maps/blob/master/packages/arm-cluster/src/components/MarkerClusterGroup.tsx

import { useEffect, useMemo } from 'react'

import { useMapInstance } from '@amsterdam/arm-core'
import { themeColor } from '@amsterdam/asc-ui'
import L, { LeafletEventHandlerFnMap, Marker } from 'leaflet'
import 'leaflet.markercluster'
import { createGlobalStyle, useTheme } from 'styled-components'

const Styles = createGlobalStyle`
  .arm__icon--clustergroup-default {
    background-color: ${themeColor('secondary')};
    background-size: 100%;
    border-radius: 50%;
    border: 3px solid;
    box-shadow: 1px 1px 2px black;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: zoom-in;

    .arm__icon-text {
      text-align:center;
    }
  }
`

type MarkerClusterGroupProps = {
  markers: Marker[]
  events?: LeafletEventHandlerFnMap
  setInstance?: (clusterLayer: L.MarkerClusterGroup | undefined) => void
}

export const MarkerClusterGroup = ({ markers, events, setInstance }: MarkerClusterGroupProps) => {
  const mapInstance = useMapInstance()
  const theme = useTheme()

  // Create the markerClusterGroup instance
  const markerClusterGroup = useMemo(() => {
    return L.markerClusterGroup({
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 7.5,
      chunkedLoading: true,
      iconCreateFunction: marker =>
        L.divIcon({
          html: `
            <div
              class="arm__icon-text"
              aria-label="Cluster met ${marker.getChildCount()} onderdelen"
            >
              ${marker.getChildCount()}
            </div>
            `,
          className: 'arm__icon--clustergroup-default',
          iconSize: L.point(39, 39),
          iconAnchor: L.point(19, 19),
        }),
      spiderLegPolylineOptions: {
        color: theme.colors.primary?.main,
        opacity: 0.75,
      },
    })
  }, [theme])

  // Call back with the markerClusterGroup
  useEffect(() => {
    if (!setInstance || !markerClusterGroup) {
      return undefined
    }

    setInstance(markerClusterGroup)

    return () => {
      setInstance(undefined)
    }
  }, [setInstance, markerClusterGroup])

  // Add the layer events to markerClusterGroup
  useEffect(() => {
    if (!markerClusterGroup || !events) {
      return undefined
    }

    Object.entries(events).forEach(([event, eventHandler]) => {
      markerClusterGroup.on(event, eventHandler)
    })

    return () => {
      Object.entries(events).forEach(([event, eventHandler]) => {
        markerClusterGroup.off(event, eventHandler)
      })
    }
  }, [events, markerClusterGroup])

  // Add / Remove Markers to the markerClusterGroup
  useEffect(() => {
    if (!markerClusterGroup) {
      return undefined
    }

    // Bulk remove all the existing layers
    markerClusterGroup.clearLayers()
    markerClusterGroup.addLayers(markers)

    if (!mapInstance.hasLayer(markerClusterGroup)) {
      mapInstance.addLayer(markerClusterGroup)
    }

    return () => {
      mapInstance.removeLayer(markerClusterGroup)
    }
  }, [markerClusterGroup, markers, mapInstance])

  return <Styles />
}
