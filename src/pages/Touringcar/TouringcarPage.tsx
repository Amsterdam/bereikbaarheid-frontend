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

import { LoadUnloadMapLayers } from './components/MapLayers'
import ParkingSpacesMapSettingsDisplay from './components/MapSettingsDisplay'
import { LoadUnloadViewerContainer } from './components/ViewerContainer'
import { LoadUnloadMapProvider } from './contexts/MapProvider'
import { LoadUnloadPageProvider } from './contexts/PageProvider'

const { SnapPoint } = mapPanelConstants

const StyledMap = styled(Map<typeof Map>)`
  flex-grow: 1;
`

const StyledMapPanelDrawer = styled(MapPanelDrawer)`
  & > div > div {
    z-index: 1;
  }
`

const LoadUnloadPage = () => {
  const { t } = useTranslation()

  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'tabletM' })

  useEffect(() => {
    if (mapInstance) {
      setMapDefaults(mapInstance)
    }
  }, [mapInstance])

  useDocumentTitle('Laden en lossen')

  const { trackPageVisit } = useAnalytics()
  useEffect(trackPageVisit)

  const Element = showDesktopVariant ? MapPanel : StyledMapPanelDrawer

  return (
    <LoadUnloadPageProvider>
      <PageWrapper>
        <Header title={t('_pageLoadUnload.title')} />

        <MainContent data-testid="load-unload-page">
          <MapStyle />
          <StyledMap
            options={{ ...defaultMapOptions, maxZoom: 21 }}
            setInstance={setMapInstance}
          >
            <LoadUnloadMapProvider>
              <MapPanelProvider
                variant={showDesktopVariant ? 'panel' : 'drawer'}
                initialPosition={SnapPoint.Halfway}
                topOffset={HEADER_HEIGHT}
              >
                <Element>
                  <ParkingSpacesMapSettingsDisplay />
                </Element>

                <LoadUnloadViewerContainer {...{ showDesktopVariant }} />
              </MapPanelProvider>

              <LoadUnloadMapLayers />
            </LoadUnloadMapProvider>
          </StyledMap>
        </MainContent>
      </PageWrapper>
    </LoadUnloadPageProvider>
  )
}

export default LoadUnloadPage
