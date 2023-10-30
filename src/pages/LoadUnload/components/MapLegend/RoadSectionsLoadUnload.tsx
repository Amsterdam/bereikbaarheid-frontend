import { Checkbox, CompactThemeProvider, Label } from '@amsterdam/asc-ui'
import MapLegendItem from 'shared/components/MapLegendItem'
import {
  LegendItemsWrapper,
  LegendWrapper,
} from 'shared/components/MapLegendStyles'
import { useTheme } from 'styled-components'

import { useLoadUnloadMapContext } from '../../contexts/MapContext'
import { roadSectionsLoadUnloadLayerId } from '../../contexts/mapLayersReducer'

export const LoadUnloadMapLegendRoadSectionsLoadUnload = () => {
  const { activeMapLayers, updateActiveMapLayers } = useLoadUnloadMapContext()
  const theme = useTheme()

  return (
    <LegendWrapper>
      <Label htmlFor="mapLegendRoadSectionsLoadUnload" label="Wegvakken">
        <Checkbox
          id="mapLegendRoadSectionsLoadUnload"
          onChange={() =>
            updateActiveMapLayers({
              type: 'TOGGLE',
              layerId: roadSectionsLoadUnloadLayerId,
            })
          }
          checked={activeMapLayers[roadSectionsLoadUnloadLayerId]}
        />
      </Label>

      <CompactThemeProvider>
        <LegendItemsWrapper>
          <MapLegendItem
            color={theme.colors.supplement!.darkgreen}
            text={
              <span>
                venstertijd tijdens <br />
                ingestelde tijdvak
              </span>
            }
          />

          <MapLegendItem
            color={theme.colors.supplement!.lightblue}
            text={
              <span>
                venstertijd tijdens een deel <br />
                van ingestelde tijdvak
              </span>
            }
          />

          <MapLegendItem
            color={theme.colors.primary!.main}
            text="venstertijd valt buiten tijdvak"
          />
        </LegendItemsWrapper>
      </CompactThemeProvider>
    </LegendWrapper>
  )
}
