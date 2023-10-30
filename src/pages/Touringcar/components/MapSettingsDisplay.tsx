import { MapPanelContent, MapPanelContentProps } from '@amsterdam/arm-core'
import { Paragraph, Tab, Tabs } from '@amsterdam/asc-ui'
import { useTranslation } from 'react-i18next'

import { DataSourcesAside } from '../../DataSources/components/DataSourcesBlocks'
import { TouringcarPageProvider } from '../contexts/PageProvider'
import dataLinks from '../data/dataLinks'

interface MapSettingsDisplayProps extends MapPanelContentProps {}

function ParkingSpacesMapSettingsDisplay({
  ...otherProps
}: MapSettingsDisplayProps) {
  const { t } = useTranslation()

  return (
    <MapPanelContent data-testid="map-settings" {...otherProps}>
      <Tabs label={t('_pageTouringcar._mapPanel.label')}>
        {/* TODO: Replace with Tab for Touringcar messages */}
        {/* <Tab id="messages" label={t('_pageTouringcar._mapPanel.messages')}>
          <br />
          <Paragraph>Here be messages!</Paragraph>
        </Tab> */}

        <Tab id="routeInfo" label={t('_pageTouringcar._mapPanel.routeInfo')}>
          <br />
          <Paragraph>
            Weergave van de aanbevolen en verplichte routes voor touringcars.
            Let op de doorrijhoogtes.
          </Paragraph>
        </Tab>

        <Tab id="data" label={t('_generic._mapPanel.dataSource')}>
          <TouringcarPageProvider>
            <DataSourcesAside dataLinks={dataLinks} />
          </TouringcarPageProvider>
        </Tab>
      </Tabs>
    </MapPanelContent>
  )
}

export default ParkingSpacesMapSettingsDisplay
