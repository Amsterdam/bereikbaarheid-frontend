import { useEffect, useState } from 'react'

import {
  Map,
  MapPanel,
  mapPanelConstants,
  MapPanelDrawer,
  MapPanelProvider,
} from '@amsterdam/arm-core'
import { useMatchMedia } from '@amsterdam/asc-ui'
import L from 'leaflet'
import { useTranslation } from 'react-i18next'
import { MainContent, PageWrapper } from 'shared/components/FullPageSize'
import Header from 'shared/components/Header'
import { HEADER_HEIGHT } from 'shared/constants'
import useAnalytics from 'shared/hooks/useAnalytics'
import { useDocumentTitle } from 'shared/hooks/useDocumentTitle'
import { defaultMapOptions, setMapDefaults } from 'shared/map/mapDefaults'
import { MapStyle } from 'shared/map/mapStyle'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'

import ProhibitorySignsDetailFeature from './components/DetailFeature'
import ProhibitorySignsMapLayers from './components/MapLayers'
import ScenarioDisplay from './components/ScenarioDisplay'
import ProhibitorySignsScenarioWizard from './components/ScenarioWizard'
import ProhibitorySignsViewerContainer from './components/ViewerContainer'
import ProhibitorySignsMapProvider from './contexts/MapProvider'
import ProhibitorySignsPageProvider from './contexts/PageProvider'

const { SnapPoint } = mapPanelConstants

const StyledMap = styled(Map<typeof Map>)`
  flex-grow: 1;
`

const StyledMapPanelDrawer = styled(MapPanelDrawer)`
  & > div > div {
    z-index: 1;
  }
`

const ProhibitorySignsPage = () => {
  const { t } = useTranslation()
  useDocumentTitle(t('_pageLicencePlate.title'))

  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'tabletM' })

  useEffect(() => {
    if (mapInstance) {
      setMapDefaults(mapInstance)
    }
  }, [mapInstance])

  const { trackPageVisit } = useAnalytics()
  useEffect(trackPageVisit)

  const Element = showDesktopVariant ? MapPanel : StyledMapPanelDrawer

  return (
    <PageWrapper>
      <ProhibitorySignsPageProvider>
        <Header title={t('_pageLicencePlate.title')} />

        <MainContent data-testid="prohibitory-signs-page">
          <MapStyle />
          <StyledMap options={defaultMapOptions} setInstance={setMapInstance}>
            <ProhibitorySignsMapProvider>
              <MapPanelProvider
                variant={showDesktopVariant ? 'panel' : 'drawer'}
                initialPosition={SnapPoint.Closed}
                topOffset={HEADER_HEIGHT}
              >
                <Element>
                  <ScenarioDisplay />

                  <ProhibitorySignsDetailFeature />
                </Element>

                <ProhibitorySignsViewerContainer {...{ showDesktopVariant }} />
              </MapPanelProvider>

              <ProhibitorySignsMapLayers />
            </ProhibitorySignsMapProvider>
          </StyledMap>
        </MainContent>

        <ProhibitorySignsScenarioWizard />
      </ProhibitorySignsPageProvider>
    </PageWrapper>
  )
}

export default ProhibitorySignsPage
