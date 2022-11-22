import { Checkbox, CompactThemeProvider, Label } from '@amsterdam/asc-ui'
import { useTheme } from 'styled-components'

import { MapLegendItem } from '../../../../shared/components/MapLegendItem'
import {
  LegendWrapper,
  LegendItemsWrapper,
} from '../../../../shared/components/MapLegendStyles'

import { useRoadObstructionsMapContext } from '../../contexts/MapContext'
import { roadObstructionsLayerId } from '../../contexts/mapLayersReducer'

export const RoadObstructionsMapLegendRoadObstructions = () => {
  const { activeMapLayers, updateActiveMapLayers } =
    useRoadObstructionsMapContext()
  const theme = useTheme()

  return (
    <LegendWrapper>
      <Label htmlFor="mapLegendRoadObstructions" label="Stremmingen">
        <Checkbox
          id="mapLegendRoadObstructions"
          onChange={() =>
            updateActiveMapLayers({
              type: 'TOGGLE',
              layerId: roadObstructionsLayerId,
            })
          }
          checked={activeMapLayers[roadObstructionsLayerId]}
        />
      </Label>

      <CompactThemeProvider>
        <LegendItemsWrapper>
          <MapLegendItem color={theme.colors.primary!.main} text="direct" />

          <MapLegendItem
            color={theme.colors.supplement!.lightblue}
            text="indirect"
          />
        </LegendItemsWrapper>
      </CompactThemeProvider>
    </LegendWrapper>
  )
}
