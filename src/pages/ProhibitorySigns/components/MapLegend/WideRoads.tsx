import { Checkbox, Label, themeSpacing } from '@amsterdam/asc-ui'
import { wideRoads } from 'shared/map/mapLayers'
import styled from 'styled-components'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'

// Colors taken from MapServer map file
// https://github.com/Amsterdam/mapserver/commit/28693d4460a3506e6a042eb89e62e7caec5beb38
const Legend = styled.svg`
  margin-right: ${themeSpacing(2)};
  order: 1;

  line {
    stroke: #684621;
    stroke-width: 2;
  }
`

const StyledLabel = styled(Label)`
  > span:first-child {
    order: 2; // make room for Legend by increasing the order of the text span by 1
  }
`

const ProhibitorySignsMapLegendWideRoads = () => {
  const { activeMapLayers, updateActiveMapLayers } = useProhibitorySignsMapContext()

  return (
    <StyledLabel htmlFor="mapLegendWideRoads" label={wideRoads.label}>
      <Legend width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="8" x2="24" y2="8" />
        <line x1="0" y1="16" x2="24" y2="16" />
      </Legend>
      <Checkbox
        id="mapLegendWideRoads"
        onChange={() => updateActiveMapLayers({ type: 'TOGGLE', layerId: 'wideRoads' })}
        checked={activeMapLayers[wideRoads.id]}
      />
    </StyledLabel>
  )
}

export default ProhibitorySignsMapLegendWideRoads
