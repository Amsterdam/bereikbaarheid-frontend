import { GeoJSON } from '@amsterdam/arm-core'
import { useTheme } from 'styled-components'

import { useSearchAllDataSets } from '../../../../shared/hooks/useSearchAllDataSets'
import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useParkingSpaceInfo } from '../../hooks/useParkingSpaceInfo'

const ProhibitorySignsParkingSpaceHighlight = () => {
  const { location } = useProhibitorySignsMapContext()
  const theme = useTheme()

  const searchResults = useSearchAllDataSets({
    enabled: !!location,
    datasets: 'parkeervakken',
    lat: location?.[0],
    lon: location?.[1],
    radius: 0,
  })

  let enabled = !!searchResults.data && searchResults.data.features.length > 0
  const parkingSpace = useParkingSpaceInfo({
    enabled: enabled,
    id: enabled ? searchResults.data?.features[0].properties.id : undefined,
  })

  if (!parkingSpace.data) return null

  return (
    <GeoJSON
      args={[parkingSpace.data.geometry]}
      options={{
        interactive: false,
        style: () => {
          return {
            color: theme.colors.secondary?.main,
            weight: 2,
          }
        },
      }}
    />
  )
}

export default ProhibitorySignsParkingSpaceHighlight
