import { MapPanelContent, MapPanelContentProps } from '@amsterdam/arm-core'
import { Paragraph, Tab, Tabs } from '@amsterdam/asc-ui'
import parse from 'html-react-parser'
import { t } from 'i18next'
import { PretendHeading } from 'shared/components/CompactElements'
import styled from 'styled-components'

import { DataSourcesAside } from '../../DataSources/components/DataSourcesBlocks'
import { MapPanelTab, useTouringcarMapContext } from '../contexts/MapContext'
import TouringcarPageProvider from '../contexts/PageProvider'
import dataLinks from '../data/dataLinks'

import ParkingSpacesList from './LocationsList/ParkingSpaces'
import StopsList from './LocationsList/Stops'
// TODO: temporarily hide Messages functionality.
// import Messages from './Messages'

const PaddedContent = styled.div`
  padding-top: 1em;
`

interface MapSettingsDisplayProps extends MapPanelContentProps {}

function TouringcarMapSettingsDisplay({ ...otherProps }: MapSettingsDisplayProps) {
  const { activeMapLayers, activeTab, setActiveTab } = useTouringcarMapContext()

  return (
    // @ts-ignore
    <MapPanelContent data-testid="map-settings" {...otherProps}>
      <Tabs label={t('_pageTouringcar._mapPanel.label')} activeTab={activeTab}>
        {/* TODO: temporarily hide Messages functionality. */}
        {/* <Tab
          id={MapPanelTab.MESSAGES}
          label={t('_pageTouringcar._mapPanel.messages')}
          onClick={() => setActiveTab(MapPanelTab.MESSAGES)}
        >
          <PaddedContent>
            <Messages />

            <Link
              href="https://nieuwsbrieven.amsterdam.nl/x/plugin/?pName=subscribe&MIDRID=S7Y1MwYAA87&pLang=nl&Z=-2113214771&pk_vid=906065c3c2209171170125204002d192"
              target="_blank"
              inList
            >
              {t('_pageTouringcar._mapPanel.signUpForNewsletter')}
            </Link>
          </PaddedContent>
        </Tab> */}
        <Tab
          id={MapPanelTab.INFO}
          label={t('_pageTouringcar._mapPanel.info')}
          onClick={() => setActiveTab(MapPanelTab.INFO)}
        >
          <PaddedContent>
            <PretendHeading forwardedAs="h2" isCompact={true}>
              {t('_pageTouringcar._mapPanel.recommendedAndMandatoryRoutes')}
            </PretendHeading>
            <Paragraph style={{ marginBlockEnd: '.5em' }}>
              {parse(t('_pageTouringcar._mapPanel.displayOfRecommendedAndMandatoryRoutes'))}
            </Paragraph>
          </PaddedContent>

          {activeMapLayers.touringcarStops && (
            <PaddedContent>
              <PretendHeading forwardedAs="h2" isCompact={true}>
                {t('_pageTouringcar._mapPanel.stops')}
              </PretendHeading>

              <StopsList />
            </PaddedContent>
          )}

          {activeMapLayers.touringcarParkingSpaces && (
            <PaddedContent style={{ marginBlockEnd: '3em' }}>
              <PretendHeading forwardedAs="h2" isCompact={true}>
                {t('_pageTouringcar._mapPanel.parkingSpaces')}
              </PretendHeading>

              <ParkingSpacesList />
            </PaddedContent>
          )}
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
