import { Checkbox, Label } from '@amsterdam/asc-ui'
import { useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import {
  layerFeatureProps,
  layerIds,
} from 'pages/Touringcar/contexts/mapLayersReducer'
import { useTranslation } from 'react-i18next'
import { MapLegend } from 'shared/components/MapLegend'
import { LegendItemsWrapper } from 'shared/components/MapLegendStyles'
import styled from 'styled-components'

const StyledCheckbox = styled(Checkbox)`
  & > span {
    background-color: ${props =>
      props.id && props.checked
        ? layerFeatureProps[props.id as layerIds].color
        : 'none'};
  }
`

function TouringcarMapLegend() {
  const { t } = useTranslation()
  const { activeMapLayers, updateActiveMapLayers } = useTouringcarMapContext()

  return (
    <MapLegend>
      <LegendItemsWrapper>
        <Label
          htmlFor={layerIds.touringcarParkingSpacesLayerId}
          label={t('_pageTouringcar._legend.parking')}
        >
          <Checkbox
            id={layerIds.touringcarParkingSpacesLayerId}
            onChange={() =>
              updateActiveMapLayers({
                type: 'TOGGLE',
                layerId: layerIds.touringcarParkingSpacesLayerId,
              })
            }
            checked={activeMapLayers[layerIds.touringcarParkingSpacesLayerId]}
          />
        </Label>

        <Label
          htmlFor={layerIds.touringcarRoutesMandatoryLayerId}
          label={t('_pageTouringcar._legend.mandatoryRoutes')}
        >
          <StyledCheckbox
            id={layerIds.touringcarRoutesMandatoryLayerId}
            onChange={() =>
              updateActiveMapLayers({
                type: 'TOGGLE',
                layerId: layerIds.touringcarRoutesMandatoryLayerId,
              })
            }
            checked={activeMapLayers[layerIds.touringcarRoutesMandatoryLayerId]}
          />
        </Label>
      </LegendItemsWrapper>
    </MapLegend>
  )
}

export default TouringcarMapLegend
