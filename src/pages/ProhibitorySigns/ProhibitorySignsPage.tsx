import {
  Map,
  MapPanel,
  mapPanelConstants,
  MapPanelDrawer,
  MapPanelProvider,
} from '@amsterdam/arm-core'
import { useMatchMedia } from '@amsterdam/asc-ui'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'

import { HEADER_HEIGHT } from '../../shared/constants'
import FeedbackModal from '../../shared/components/FeedbackModal'
import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'
import { MapStyle } from '../../shared/map/mapStyle'
import { defaultMapOptions, setMapDefaults } from '../../shared/map/mapDefaults'
import useAnalytics from '../../shared/hooks/useAnalytics'

import ProhibitorySignsHeader from './components/Header'
import ProhibitorySignsDetailFeature from './components/DetailFeature'
import ProhibitorySignsMapLayers from './components/MapLayers'
import ProhibitorySignsScenarioWizard from './components/ScenarioWizard'
import ProhibitorySignsViewerContainer from './components/ViewerContainer'
import ProhibitorySignsPageProvider from './contexts/PageProvider'
import ScenarioDisplay from './components/ScenarioDisplay'
import ProhibitorySignsMapProvider from './contexts/MapProvider'

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
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false)
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
        <ProhibitorySignsHeader
          setOpenFeedbackModal={setOpenFeedbackModal}
          title="Bereikbaarheid Amsterdam op Kenteken"
        />

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

        <ProhibitorySignsScenarioWizard
          setShowFeedbackModal={setOpenFeedbackModal}
        />
      </ProhibitorySignsPageProvider>

      <FeedbackModal setOpen={setOpenFeedbackModal} open={openFeedbackModal} />
    </PageWrapper>
  )
}

export default ProhibitorySignsPage
