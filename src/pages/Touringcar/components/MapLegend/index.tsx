import { Checkbox, Label } from '@amsterdam/asc-ui'
import {
  MapLayerId,
  layerFeatureProps,
  useTouringcarMapContext,
} from 'pages/Touringcar/contexts/MapContext'
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
          htmlFor={MapLayerId.touringcarStopsLayerId}
          label={t('_pageTouringcar._legend.stops')}
        >
          <StyledCheckbox
            id={MapLayerId.touringcarStopsLayerId}
            onChange={() =>
              updateActiveMapLayers({
                type: 'TOGGLE',
                layerId: MapLayerId.touringcarStopsLayerId,
              })
            }
            checked={activeMapLayers[MapLayerId.touringcarStopsLayerId]}
          />
        </Label>

        <Label
          htmlFor={MapLayerId.touringcarParkingSpacesLayerId}
          label={t('_pageTouringcar._legend.parking')}
        >
          <StyledCheckbox
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
