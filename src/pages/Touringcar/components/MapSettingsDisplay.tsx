import { MapPanelContent, MapPanelContentProps } from '@amsterdam/arm-core'
import { Paragraph, Tab, Tabs } from '@amsterdam/asc-ui'
import { useTranslation } from 'react-i18next'
import { PretendHeading } from 'shared/components/CompactElements'

import { DataSourcesAside } from '../../DataSources/components/DataSourcesBlocks'
import { MapPanelTab, useTouringcarMapContext } from '../contexts/MapContext'
import { TouringcarPageProvider } from '../contexts/PageProvider'
import dataLinks from '../data/dataLinks'

interface MapSettingsDisplayProps extends MapPanelContentProps {}

function TouringcarMapSettingsDisplay({
  ...otherProps
}: MapSettingsDisplayProps) {
  const { activeTab, setActiveTab } = useTouringcarMapContext()
  const { t } = useTranslation()

  return (
    <MapPanelContent data-testid="map-settings" {...otherProps}>
      <Tabs label={t('_pageTouringcar._mapPanel.label')} activeTab={activeTab}>
        <Tab
          id={MapPanelTab.MESSAGES}
          label={t('_pageTouringcar._mapPanel.messages')}
          onClick={() => setActiveTab(MapPanelTab.MESSAGES)}
        >
          <br />
          <Paragraph>Berichten</Paragraph>
        </Tab>

        <Tab
          id={MapPanelTab.ROUTE_INFO}
          label={t('_pageTouringcar._mapPanel.routeInfo')}
          onClick={() => setActiveTab(MapPanelTab.ROUTE_INFO)}
        >
          <br />
          <PretendHeading forwardedAs="h2" isCompact={true}>
            {t('_pageTouringcar._mapPanel.recommendedAndMandatoryRoutes')}
          </PretendHeading>
          <Paragraph style={{ marginBlockEnd: '.5em' }}>
            {t(
              '_pageTouringcar._mapPanel.displayOfRecommendedAndMandatoryRoutes'
            )}
          </Paragraph>
          <Paragraph>
            {t('_pageTouringcar._mapPanel.payAttentionToVerhicleHeights')}
          </Paragraph>
        </Tab>

        <Tab
          id={MapPanelTab.DATA}
          label={t('_generic._mapPanel.dataSource')}
          onClick={() => setActiveTab(MapPanelTab.DATA)}
        >
          <TouringcarPageProvider>
            <DataSourcesAside dataLinks={dataLinks} />
          </TouringcarPageProvider>
        </Tab>
      </Tabs>
    </MapPanelContent>
  )
}

export default TouringcarMapSettingsDisplay
