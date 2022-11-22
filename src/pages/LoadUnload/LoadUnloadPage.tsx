import {
  Map,
  MapPanel,
  mapPanelConstants,
  MapPanelDrawer,
  MapPanelProvider,
} from '@amsterdam/arm-core'
import { useMatchMedia } from '@amsterdam/asc-ui'
import type L from 'leaflet'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'

import { HEADER_HEIGHT } from '../../shared/constants'
import FeedbackModal from '../../shared/components/FeedbackModal'
import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'
import { MapStyle } from '../../shared/map/mapStyle'
import { defaultMapOptions, setMapDefaults } from '../../shared/map/mapDefaults'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle'

import { LoadUnloadHeader } from './components/Header'
import { LoadUnloadDetailFeature } from './components/DetailFeature/DetailFeature'
import { LoadUnloadMapLayers } from './components/MapLayers'
import { LoadUnloadViewerContainer } from './components/ViewerContainer'
import { LoadUnloadMapProvider } from './contexts/MapProvider'

const { SnapPoint } = mapPanelConstants

const StyledMap = styled(Map<typeof Map>)`
  flex-grow: 1;
`

const LoadUnloadPage = () => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'tabletM' })

  useEffect(() => {
    if (mapInstance) {
      setMapDefaults(mapInstance)
    }
  }, [mapInstance])

  useDocumentTitle('Laden en lossen')

  const [openFeedbackModal, setOpenFeedbackModal] = useState(false)
  const Element = showDesktopVariant ? MapPanel : MapPanelDrawer

  return (
    <>
      <PageWrapper>
        <LoadUnloadHeader
          setOpenFeedbackModal={setOpenFeedbackModal}
          title="Laden en lossen"
        />

        <MainContent data-testid="load-unload-page">
          <MapStyle />
          <StyledMap options={defaultMapOptions} setInstance={setMapInstance}>
            <LoadUnloadMapProvider>
              <MapPanelProvider
                variant={showDesktopVariant ? 'panel' : 'drawer'}
                initialPosition={SnapPoint.Closed}
                topOffset={HEADER_HEIGHT}
              >
                <Element>
                  <LoadUnloadDetailFeature />
                </Element>

                <LoadUnloadViewerContainer {...{ showDesktopVariant }} />
              </MapPanelProvider>

              <LoadUnloadMapLayers />
            </LoadUnloadMapProvider>
          </StyledMap>
        </MainContent>
      </PageWrapper>

      <FeedbackModal setOpen={setOpenFeedbackModal} open={openFeedbackModal} />
    </>
  )
}

export default LoadUnloadPage
