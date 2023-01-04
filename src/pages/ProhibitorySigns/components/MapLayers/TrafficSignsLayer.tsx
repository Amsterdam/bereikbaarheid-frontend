import { useEffect } from 'react'
import { useQuery } from 'react-query'

import {
  getTrafficSigns,
  TrafficSign,
  type TrafficSignCategoryApi,
} from '../../../../api/bereikbaarheid/traffic-signs'

import { trafficSignsLayerId } from '../../contexts/mapLayersReducer'
import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { useRdwGeneralInfo } from '../../hooks/useRdwGeneralInfo'

import { MarkerClusterGroup } from '../MarkerClusterGroup'
import { TrafficSignMarker } from '../TrafficSignMarker'

const ProhibitorySignsTrafficSignsLayer = () => {
  const { activeMapLayers, updateActiveMapLayers, setCurrentTrafficSign } =
    useProhibitorySignsMapContext()
  const { expertMode, showScenarioWizard, vehicle } =
    useProhibitorySignsPageContext()
  const rdwGeneralInfo = useRdwGeneralInfo()
  const rdwGeneralData = rdwGeneralInfo.data

  let trafficSignCategories: TrafficSignCategoryApi[] = [
    'prohibition',
    'prohibition with exception',
  ]
  if (expertMode) trafficSignCategories.push('prohibition ahead')

  const trafficSigns = useQuery({
    enabled: !!rdwGeneralData && !!vehicle.axleWeight && !!vehicle.weight,
    queryKey: ['trafficSigns'].concat(Object.values(vehicle)),
    queryFn: ({ signal }) =>
      getTrafficSigns(
        trafficSignCategories,
        vehicle,
        rdwGeneralData![0].derived.maxAllowedWeight,
        rdwGeneralData![0].derived.vehicleType,
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
