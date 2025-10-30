import { Checkbox, Label } from '@amsterdam/asc-ui'
import {
  MapLayerId,
  MapPanelTab,
  layerFeatureProps,
  useTouringcarMapContext,
} from '../../../../pages/Touringcar/contexts/MapContext'
import { useTranslation } from 'react-i18next'
import { MapLegend } from '../../../../shared/components/MapLegend'
import { LegendItemsWrapper } from '../../../../shared/components/MapLegendStyles'
import styled from 'styled-components'

const LEGEND_ITEMS = [
  {
    id: MapLayerId.touringcarMessagesLayerId,
    label: '_pageTouringcar._legend.messages',
  },
  {
    id: MapLayerId.touringcarStopsLayerId,
    label: '_pageTouringcar._legend.stops',
  },
  {
    id: MapLayerId.touringcarParkingSpacesLayerId,
    label: '_pageTouringcar._legend.parking',
  },
  {
    id: MapLayerId.touringcarVehicleHeightsLayerId,
    label: '_pageTouringcar._legend.maxVehicleHeight',
  },
  {
    id: MapLayerId.touringcarRoutesRecommendedLayerId,
    label: '_pageTouringcar._legend.recommendedRoutes',
  },
  {
    id: MapLayerId.touringcarRoutesDestinationTrafficLayerId,
    label: '_pageTouringcar._legend.destinationTraffic',
  },
  {
    id: MapLayerId.touringcarRoutesMandatoryLayerId,
    label: '_pageTouringcar._legend.mandatoryRoutes',
  },
  {
    id: MapLayerId.touringcarEnvironmentalZoneLayerId,
    label: '_pageTouringcar._legend.environmentalZone',
  },
]

const StyledCheckbox = styled(Checkbox)`
  & > span {
    background-color: ${props =>
      props.id && props.checked ? layerFeatureProps[props.id as MapLayerId].color : 'none'};
  }
`

function TouringcarMapLegend() {
  const { t } = useTranslation()
  const { activeMapLayers, updateActiveMapLayers, setActiveTab } = useTouringcarMapContext()

  return (
    <MapLegend>
      <LegendItemsWrapper>
        {LEGEND_ITEMS.map(legendItem => {
          return (
            <Label key={legendItem.id} htmlFor={legendItem.id} label={t(legendItem.label)}>
              <StyledCheckbox
                id={legendItem.id}
                onChange={() => {
                  if (!activeMapLayers[legendItem.id]) {
                    if (legendItem.id === MapLayerId.touringcarMessagesLayerId) {
                      setActiveTab(MapPanelTab.MESSAGES)
                    } else {
                      setActiveTab(MapPanelTab.INFO)
                    }
                  } else if (legendItem.id === MapLayerId.touringcarMessagesLayerId) {
                    setActiveTab(MapPanelTab.INFO)
                  }

                  updateActiveMapLayers({
                    type: 'TOGGLE',
                    layerId: legendItem.id,
                  })
                }}
                checked={activeMapLayers[legendItem.id]}
              />
            </Label>
          )
        })}
      </LegendItemsWrapper>
    </MapLegend>
  )
}

export default TouringcarMapLegend
