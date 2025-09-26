import { Checkbox, CompactThemeProvider, Label } from '@amsterdam/asc-ui'
import { LegendWrapper, LegendItemsWrapper } from '../../../../shared/components/MapLegendStyles'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { trafficSignsLayerId } from '../../contexts/mapLayersReducer'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { trafficSignBackgrounds } from '../TrafficSignMarker/backgrounds'

import { ProhibitorySignsMapLegendTrafficSignsLegendItem as LegendItem } from './TrafficSignsLegendItem'

const ProhibitorySignsMapLegendTrafficSigns = () => {
  const { activeMapLayers, updateActiveMapLayers } = useProhibitorySignsMapContext()
  const { expertMode, showScenarioWizard } = useProhibitorySignsPageContext()

  if (showScenarioWizard) return null

  return (
    <LegendWrapper>
      <Label htmlFor="mapLegendTrafficSigns" label="Verbodsborden">
        <Checkbox
          id="mapLegendTrafficSigns"
          onChange={() =>
            updateActiveMapLayers({
              type: 'TOGGLE',
              layerId: trafficSignsLayerId,
            })
          }
          checked={activeMapLayers[trafficSignsLayerId]}
        />
      </Label>

      <CompactThemeProvider>
        <LegendItemsWrapper>
          <LegendItem itemImage={trafficSignBackgrounds.c01.verbod!} itemText="Regulier, rode rand" />

          <LegendItem
            itemImage={trafficSignBackgrounds.c01['verbod, met uitzondering']!}
            itemText="Met uitzondering, paarse rand"
          />

          {expertMode && (
            <LegendItem
              itemImage={trafficSignBackgrounds.c01['vooraankondiging verbod']!}
              itemText="Vooraankondiging, groene rand"
            />
          )}
        </LegendItemsWrapper>
      </CompactThemeProvider>
    </LegendWrapper>
  )
}

export default ProhibitorySignsMapLegendTrafficSigns
