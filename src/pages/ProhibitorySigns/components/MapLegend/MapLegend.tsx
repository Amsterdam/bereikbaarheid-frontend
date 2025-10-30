import { Column, Divider, Row } from '@amsterdam/asc-ui'
import { MapLegend } from '../../../../shared/components/MapLegend'

import ProhibitorySignsMapLegendBaseLayers from './BaseLayers'
import ProhibitorySignsMapLegendLoadUnloadSpaces from './LoadUnloadSpaces'
import ProhibitorySignsMapLegendRoadNetwork from './RoadNetwork'
import ProhibitorySignsMapLegendTrafficSigns from './TrafficSigns'
import ProhibitorySignsMapLegendWideRoads from './WideRoads'

const ProhibitorySignsMapLegend = () => {
  return (
    <MapLegend>
      <ProhibitorySignsMapLegendBaseLayers />

      <Divider />

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <ProhibitorySignsMapLegendWideRoads />
        </Column>
      </Row>

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <ProhibitorySignsMapLegendLoadUnloadSpaces />
        </Column>
      </Row>

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <ProhibitorySignsMapLegendRoadNetwork />
        </Column>
      </Row>

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <ProhibitorySignsMapLegendTrafficSigns />
        </Column>
      </Row>
    </MapLegend>
  )
}

export default ProhibitorySignsMapLegend
