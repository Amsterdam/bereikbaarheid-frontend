import { Column, Row } from '@amsterdam/asc-ui'
import { touringcarParkingSpacesLayerId } from 'pages/Touringcar/contexts/mapLayersReducer'
import { MapLegend } from 'shared/components/MapLegend'
import { MapLegendLoadUnloadSpaces } from 'shared/components/MapLegendLoadUnloadSpaces'

import { useLoadUnloadMapContext } from '../../contexts/MapContext'

export const TouringcarParkingSpacesMapLegend = () => {
  const { activeMapLayers, updateActiveMapLayers } = useLoadUnloadMapContext()

  return (
    <MapLegend>
      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <MapLegendLoadUnloadSpaces
            checked={activeMapLayers[touringcarParkingSpacesLayerId]}
            onChange={() =>
              updateActiveMapLayers({
                type: 'TOGGLE',
                layerId: touringcarParkingSpacesLayerId,
              })
            }
          />
        </Column>
      </Row>
    </MapLegend>
  )
}
