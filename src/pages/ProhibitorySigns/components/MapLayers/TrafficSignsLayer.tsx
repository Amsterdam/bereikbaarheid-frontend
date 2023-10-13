import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import {
  getTrafficSigns,
  TrafficSign,
} from '../../../../api/bereikbaarheid/traffic-signs'
import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { trafficSignsLayerId } from '../../contexts/mapLayersReducer'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { useRdwGeneralInfo } from '../../hooks/useRdwGeneralInfo'
import { useTrafficSignCategories } from '../../hooks/useTrafficSignCategories'
import { MarkerClusterGroup } from '../MarkerClusterGroup'
import { TrafficSignMarker } from '../TrafficSignMarker'

const ProhibitorySignsTrafficSignsLayer = () => {
  const { activeMapLayers, updateActiveMapLayers, setCurrentTrafficSign } =
    useProhibitorySignsMapContext()
  const { expertMode, showScenarioWizard, vehicle } =
    useProhibitorySignsPageContext()
  const rdwGeneralInfo = useRdwGeneralInfo()
  const rdwGeneralData = rdwGeneralInfo.data
  const trafficSignCategories = useTrafficSignCategories()

  const trafficSigns = useQuery({
    enabled: !!rdwGeneralData && !!vehicle.axleWeight && !!vehicle.weight,
    queryKey: ['trafficSigns'].concat(Object.values(vehicle)),
    queryFn: ({ signal }) =>
      getTrafficSigns(
        {
          trafficSignCategories,
          vehicleAxleWeight: vehicle.axleWeight,
          vehicleHasTrailer: vehicle.hasTrailer,
          vehicleHeight: vehicle.height,
          vehicleLength: vehicle.length,
          vehicleMaxAllowedWeight: rdwGeneralData![0].derived.maxAllowedWeight,
          vehicleTotalWeight: vehicle.weight,
          vehicleType: rdwGeneralData![0].derived.vehicleType,
          vehicleWidth: vehicle.width,
        },
        signal
      ),
  })

  useEffect(() => {
    updateActiveMapLayers({
      type: 'UPDATE',
      layerId: trafficSignsLayerId,
      enabled: true,
    })
  }, [trafficSigns.data, updateActiveMapLayers])

  const findTrafficSign = (id: number) => {
    let sign = trafficSigns.data?.features.find(
      item => item.properties.id === id
    )

    setCurrentTrafficSign(sign)
  }

  const createClusterMarkers = () => {
    return trafficSigns.data!.features.map((item: TrafficSign) => {
      const marker = TrafficSignMarker(item)

      let tooltipText = 'Klik voor meer informatie'
      if (expertMode) {
        tooltipText = 'Bord ' + item.properties.id
      }
      marker.bindTooltip(tooltipText)

      marker.on('click', () => findTrafficSign(item.properties.id))

      return marker
    })
  }

  if (trafficSigns.isError && trafficSigns.error instanceof Error)
    console.error(trafficSigns.error.message)

  if (trafficSigns.isLoading || !trafficSigns.data) return null

  if (showScenarioWizard) return null

  if (!activeMapLayers[trafficSignsLayerId]) return null

  return <MarkerClusterGroup markers={createClusterMarkers()} />
}

export default ProhibitorySignsTrafficSignsLayer
