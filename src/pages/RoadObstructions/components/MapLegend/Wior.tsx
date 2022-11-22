import { Checkbox, Label, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { LegendWrapper } from '../../../../shared/components/MapLegendStyles'

import { useRoadObstructionsMapContext } from '../../contexts/MapContext'
import { wiorLayerId } from '../../contexts/mapLayersReducer'
import { useMapInstance } from '@amsterdam/arm-core'
import { useEffect, useState } from 'react'

const Legend = styled.div`
  background-color: rgba(255, 145, 0, 0.2);
  border: 2px solid ${props => props.theme.colors.supplement?.orange};
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

export const RoadObstructionsMapLegendWior = () => {
  const mapInstance = useMapInstance()
  const { activeMapLayers, updateActiveMapLayers } =
    useRoadObstructionsMapContext()

  // due to performance reasons is only available from zoom level 15 onwards,
  // so disable the checkbox when this zoomlevel is not yet reached.
  // equal to zoomlevel in WiorLayer component
  const [isDisabled, setIsDisabled] = useState(true)
  useEffect(() => {
    mapInstance.on('zoomend', () => {
      setIsDisabled(mapInstance.getZoom() < 15)
    })
  }, [mapInstance])

  return (
    <LegendWrapper>
      <StyledLabel
        disabled={isDisabled}
        htmlFor="mapLegendWior"
        label={
          <span>
            Werkzaamheden In de <br />
            Openbare Ruimte (WIOR)
          </span>
        }
      >
        <Legend />
        <Checkbox
          id="mapLegendWior"
          onChange={() =>
            updateActiveMapLayers({
              type: 'TOGGLE',
              layerId: wiorLayerId,
            })
          }
          checked={activeMapLayers[wiorLayerId]}
        />
      </StyledLabel>
    </LegendWrapper>
  )
}
