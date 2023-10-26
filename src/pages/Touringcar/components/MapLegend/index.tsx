import { Checkbox, Label } from '@amsterdam/asc-ui'
import { useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { touringcarParkingSpacesLayerId } from 'pages/Touringcar/contexts/mapLayersReducer'
import { useTranslation } from 'react-i18next'
import { MapLegend } from 'shared/components/MapLegend'
import { LegendItemsWrapper } from 'shared/components/MapLegendStyles'

function TouringcarMapLegend() {
  const { t } = useTranslation()
  const { activeMapLayers, updateActiveMapLayers } = useTouringcarMapContext()

  return (
    <MapLegend>
      <LegendItemsWrapper>
        <Label
          htmlFor={touringcarParkingSpacesLayerId}
          label={t('_pageTouringcar._legend.parking')}
        >
          <Checkbox
            id={touringcarParkingSpacesLayerId}
            onChange={() =>
              updateActiveMapLayers({
                type: 'TOGGLE',
                layerId: touringcarParkingSpacesLayerId,
              })
            }
            checked={activeMapLayers[touringcarParkingSpacesLayerId]}
          />
        </Label>
      </LegendItemsWrapper>
    </MapLegend>
  )
}

export default TouringcarMapLegend
