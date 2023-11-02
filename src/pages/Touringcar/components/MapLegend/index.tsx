import { Checkbox, Label } from '@amsterdam/asc-ui'
import {
  MapLayerId,
  useTouringcarMapContext,
} from 'pages/Touringcar/contexts/MapContext'
import { layerFeatureProps } from 'pages/Touringcar/contexts/mapLayersReducer'
import { useTranslation } from 'react-i18next'
import { MapLegend } from 'shared/components/MapLegend'
import { LegendItemsWrapper } from 'shared/components/MapLegendStyles'
import styled from 'styled-components'

const StyledCheckbox = styled(Checkbox)`
  & > span {
    background-color: ${props =>
      props.id && props.checked
        ? layerFeatureProps[props.id as MapLayerId].color
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
          htmlFor={MapLayerId.touringcarParkingSpacesLayerId}
          label={t('_pageTouringcar._legend.parking')}
        >
          <Checkbox
            id={MapLayerId.touringcarParkingSpacesLayerId}
            onChange={() =>
              updateActiveMapLayers({
                type: 'TOGGLE',
                layerId: MapLayerId.touringcarParkingSpacesLayerId,
              })
            }
            checked={activeMapLayers[MapLayerId.touringcarParkingSpacesLayerId]}
          />
        </Label>

        <Label
          htmlFor={MapLayerId.touringcarRoutesMandatoryLayerId}
          label={t('_pageTouringcar._legend.mandatoryRoutes')}
        >
          <StyledCheckbox
            id={MapLayerId.touringcarRoutesMandatoryLayerId}
            onChange={() =>
              updateActiveMapLayers({
                type: 'TOGGLE',
                layerId: MapLayerId.touringcarRoutesMandatoryLayerId,
              })
            }
            checked={
              activeMapLayers[MapLayerId.touringcarRoutesMandatoryLayerId]
            }
          />
        </Label>
      </LegendItemsWrapper>
    </MapLegend>
  )
}

export default TouringcarMapLegend
