import { MapPanelContent, MapPanelContentProps } from '@amsterdam/arm-core'
import { CompactThemeProvider, Tab, Tabs } from '@amsterdam/asc-ui'
import { useTranslation } from 'react-i18next'

import { DataSourcesAside } from '../../DataSources/components/DataSourcesBlocks'
import { LoadUnloadPageProvider } from '../contexts/PageProvider'
import dataLinks from '../data/dataLinks'

interface MapSettingsDisplayProps extends MapPanelContentProps {}

function ParkingSpacesMapSettingsDisplay({
  ...otherProps
}: MapSettingsDisplayProps) {
  const { t } = useTranslation()

  return (
    <MapPanelContent data-testid="map-settings" {...otherProps}>
      <Tabs label={t('_pageLoadUnload._mapPanel.label')}>
        <Tab id="input" label={t('_generic._mapPanel.input')}>
          <CompactThemeProvider>Even niets te zien hier!</CompactThemeProvider>
        </Tab>

        <Tab id="data" label={t('_generic._mapPanel.dataSource')}>
          <LoadUnloadPageProvider>
            <DataSourcesAside dataLinks={dataLinks} />
          </LoadUnloadPageProvider>
        </Tab>
      </Tabs>
    </MapPanelContent>
  )
}

export default ParkingSpacesMapSettingsDisplay
