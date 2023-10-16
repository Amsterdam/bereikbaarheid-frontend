import { Column, Row } from '@amsterdam/asc-ui'
import { MapLegend } from 'shared/components/MapLegend'

import { RoadObstructionsMapLegendRoadObstructions } from './RoadObstructions'
import { RoadObstructionsMapLegendWior } from './Wior'

const RoadObstructionsMapLegend = () => {
  return (
    <MapLegend>
      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <RoadObstructionsMapLegendRoadObstructions />
        </Column>
      </Row>

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <RoadObstructionsMapLegendWior />
        </Column>
      </Row>
    </MapLegend>
  )
}

export default RoadObstructionsMapLegend
