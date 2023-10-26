import { Column, Row } from '@amsterdam/asc-ui'
import { MapLegend } from 'shared/components/MapLegend'
import { MapLegendLoadUnloadSpaces } from 'shared/components/MapLegendLoadUnloadSpaces'
import { loadUnloadSpaces } from 'shared/map/mapLayers'

import { useLoadUnloadMapContext } from '../../contexts/MapContext'

import { LoadUnloadMapLegendRoadSectionsLoadUnload } from './RoadSectionsLoadUnload'

export const LoadUnloadMapLegend = () => {
  const { activeMapLayers, updateActiveMapLayers } = useLoadUnloadMapContext()

  return (
    <MapLegend>
      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <MapLegendLoadUnloadSpaces
            checked={activeMapLayers[loadUnloadSpaces.id]}
            onChange={() =>
              updateActiveMapLayers({
                type: 'TOGGLE',
                layerId: 'loadUnloadSpaces',
              })
            }
          />
        </Column>
      </Row>

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <LoadUnloadMapLegendRoadSectionsLoadUnload />
        </Column>
      </Row>
    </MapLegend>
  )
}
