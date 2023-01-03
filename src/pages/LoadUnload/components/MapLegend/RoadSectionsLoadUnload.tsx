import { Checkbox, Label, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { LegendWrapper } from '../../../../shared/components/MapLegendStyles'

import { useLoadUnloadMapContext } from '../../contexts/MapContext'
import { roadSectionsLoadUnloadLayerId } from '../../contexts/mapLayersReducer'

const Legend = styled.div`
  background-color: ${props => props.theme.colors.primary?.main};
  height: 10px;
  margin-right: ${themeSpacing(2)};
  order: 1;
  width: 25px;
`

const StyledLabel = styled(Label)`
  > span:first-child {
    order: 2; // make room for Legend by increasing the order of the text span by 1
  }
`

export const LoadUnloadMapLegendRoadSectionsLoadUnload = () => {
  const { activeMapLayers, updateActiveMapLayers } = useLoadUnloadMapContext()

  return (
    <LegendWrapper>
      <StyledLabel
        htmlFor="mapLegendRoadSectionsLoadUnload"
        label="Venstertijden"
      >
        <Legend />
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
      </StyledLabel>
    </LegendWrapper>
  )
}
