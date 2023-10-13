import { Column, Row } from '@amsterdam/asc-ui'

import { RoadObstructionsMapLegendRoadObstructions } from './RoadObstructions'
import { RoadObstructionsMapLegendWior } from './Wior'

import { MapLegend } from '../../../../shared/components/MapLegend'

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
