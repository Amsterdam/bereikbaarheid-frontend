import { useEffect, useState } from 'react'

import {
  Map,
  MapPanel,
  mapPanelConstants,
  MapPanelDrawer,
  MapPanelProvider,
} from '@amsterdam/arm-core'
import { useMatchMedia } from '@amsterdam/asc-ui'
import type L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTranslation } from 'react-i18next'
import { MainContent, PageWrapper } from 'shared/components/FullPageSize'
import Header from 'shared/components/Header'
import { HEADER_HEIGHT } from 'shared/constants'
import useAnalytics from 'shared/hooks/useAnalytics'
import { useDocumentTitle } from 'shared/hooks/useDocumentTitle'
import { defaultMapOptions, setMapDefaults } from 'shared/map/mapDefaults'
import { MapStyle } from 'shared/map/mapStyle'
import styled from 'styled-components'

import TouringcarMapLayers from './components/MapLayers'
import TouringcarMapPanel from './components/MapPanel'
import ParkingSpacesMapSettingsDisplay from './components/MapSettingsDisplay'
import { TouringcarViewerContainer } from './components/ViewerContainer'
import { TouringcarMapProvider } from './contexts/MapProvider'
import { TouringcarPageProvider } from './contexts/PageProvider'

const StyledMap = styled(Map<typeof Map>)`
  flex-grow: 1;
`

const StyledMapPanelDrawer = styled(MapPanelDrawer)`
  & > div > div {
    z-index: 1;
  }
`

const TouringcarPage = () => {
  const { t } = useTranslation()
  useDocumentTitle(t('_pageTouringcar.title'))

  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  useEffect(() => {
    if (mapInstance) {
      setMapDefaults(mapInstance)
    }
  }, [mapInstance])

  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'tabletM' })
  const Element = showDesktopVariant ? MapPanel : StyledMapPanelDrawer

  const { trackPageVisit } = useAnalytics()
  useEffect(trackPageVisit)

  return (
    <TouringcarPageProvider>
      <PageWrapper>
        <Header title={t('_pageTouringcar.title')} />

        <MainContent data-testid="load-unload-page">
          <MapStyle />

          <StyledMap
            options={{ ...defaultMapOptions, maxZoom: 21 }}
            setInstance={setMapInstance}
          >
            <TouringcarMapProvider>
              <MapPanelProvider
                variant={showDesktopVariant ? 'panel' : 'drawer'}
                initialPosition={mapPanelConstants.SnapPoint.Closed}
                topOffset={HEADER_HEIGHT}
              >
                <Element>
                  <ParkingSpacesMapSettingsDisplay />

                  <TouringcarMapPanel />
                </Element>

                <TouringcarViewerContainer {...{ showDesktopVariant }} />

                <TouringcarMapLayers />
              </MapPanelProvider>
            </TouringcarMapProvider>
          </StyledMap>
        </MainContent>
      </PageWrapper>
    </TouringcarPageProvider>
  )
}

export default TouringcarPage
