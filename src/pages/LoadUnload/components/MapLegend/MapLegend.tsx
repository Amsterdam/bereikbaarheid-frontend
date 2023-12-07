import { useEffect, useState } from 'react'

import { Checkbox, Column, CompactThemeProvider, Label, Row } from '@amsterdam/asc-ui'
import { useMapInstance } from '@amsterdam/react-maps'
import { useTranslation } from 'react-i18next'
import { MapLegend } from 'shared/components/MapLegend'
import { MapLegendLoadUnloadSpaces } from 'shared/components/MapLegendLoadUnloadSpaces'
import styled from 'styled-components'

import useLoadUnloadMapContext, { MapLayerId, layerFeatureProps } from '../../contexts/MapContext'
import { BOLLARDS_ZOOM_LEVEL } from '../MapLayers/BollardsLayer'

import { LoadUnloadMapLegendRoadSectionsLoadUnload } from './RoadSectionsLoadUnload'

const StyledCheckbox = styled(Checkbox)`
  & > span {
    background-color: ${props =>
      props.id && props.checked ? layerFeatureProps[props.id as MapLayerId].color : 'none'};
  }
`

export const LoadUnloadMapLegend = () => {
  const { activeMapLayers, updateActiveMapLayers } = useLoadUnloadMapContext()

  const { t } = useTranslation()

  const mapInstance = useMapInstance()
  const [bollardsAreDisabled, setBollardsAreDisabled] = useState(true)
  useEffect(() => {
    mapInstance.on('zoomend', () => {
      setBollardsAreDisabled(mapInstance.getZoom() < BOLLARDS_ZOOM_LEVEL)
    })
  }, [mapInstance])

  return (
    <MapLegend>
      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <MapLegendLoadUnloadSpaces
            checked={activeMapLayers[MapLayerId.loadUnloadLayerId]}
            onChange={() =>
              updateActiveMapLayers({
                type: 'TOGGLE',
                layerId: MapLayerId.loadUnloadLayerId,
              })
            }
          />
        </Column>
      </Row>

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <CompactThemeProvider>
            <Label
              htmlFor={MapLayerId.bollardsLayerId}
              label={t('_pageLoadUnload._legend.bollards')}
              disabled={bollardsAreDisabled}
            >
              <StyledCheckbox
                id={MapLayerId.bollardsLayerId}
                onChange={() => {
                  updateActiveMapLayers({
                    type: 'TOGGLE',
                    layerId: MapLayerId.bollardsLayerId,
                  })
                }}
                checked={activeMapLayers[MapLayerId.bollardsLayerId]}
              />
            </Label>
          </CompactThemeProvider>
        </Column>
      </Row>

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <LoadUnloadMapLegendRoadSectionsLoadUnload />
        </Column>
      </Row>
    </MapLegend>
  )
}
