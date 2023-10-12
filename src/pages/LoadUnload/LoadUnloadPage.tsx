import {
  Map,
  MapPanel,
  mapPanelConstants,
  MapPanelDrawer,
  MapPanelProvider,
} from '@amsterdam/arm-core'
import { Modal, useMatchMedia } from '@amsterdam/asc-ui'
import type L from 'leaflet'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'

import { HEADER_HEIGHT, Z_INDEX_MODAL } from '../../shared/constants'
import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'
import { MapStyle } from '../../shared/map/mapStyle'
import { defaultMapOptions, setMapDefaults } from '../../shared/map/mapDefaults'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle'
import useAnalytics from '../../shared/hooks/useAnalytics'

import { LoadUnloadAddressForm } from './components/AddressForm'
import { LoadUnloadDetailFeature } from './components/DetailFeature'
import { LoadUnloadMapLayers } from './components/MapLayers'
import { ModalDateTime } from './components/ModalDateTime'
import { LoadUnloadViewerContainer } from './components/ViewerContainer'
import { LoadUnloadMapSettingsDisplay } from './components/MapSettingsDisplay'
import { LoadUnloadMapProvider } from './contexts/MapProvider'
import { LoadUnloadPageProvider } from './contexts/PageProvider'
import { Header } from '../../shared/components/Header'

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
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'tabletM' })

  useEffect(() => {
    if (mapInstance) {
      setMapDefaults(mapInstance)
    }
  }, [mapInstance])

  useDocumentTitle('Laden en lossen')

  const [showAddressForm, setShowAddressForm] = useState(false)
  const [showDateTimeModal, setShowDateTimeModal] = useState(false)

  const { trackPageVisit } = useAnalytics()
  useEffect(trackPageVisit)

  const Element = showDesktopVariant ? MapPanel : StyledMapPanelDrawer

  return (
    <LoadUnloadPageProvider>
      <PageWrapper>
        <Header title="Laden en lossen" />

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
                  <LoadUnloadDetailFeature />

                  <LoadUnloadMapSettingsDisplay
                    setShowAddressForm={setShowAddressForm}
                    setShowDateTimeModal={setShowDateTimeModal}
                  />
                </Element>

                <LoadUnloadViewerContainer {...{ showDesktopVariant }} />
              </MapPanelProvider>

              <LoadUnloadMapLayers />
            </LoadUnloadMapProvider>
          </StyledMap>
        </MainContent>
      </PageWrapper>

      <Modal
        aria-labelledby="modal"
        disablePortal // to prevent findDOMNode warning, see https://github.com/Amsterdam/amsterdam-styled-components/issues/2389
        open={showAddressForm}
        zIndexOffset={Z_INDEX_MODAL}
      >
        <LoadUnloadAddressForm setShowAddressForm={setShowAddressForm} />
      </Modal>

      <ModalDateTime
        showModal={showDateTimeModal}
        setShowModal={setShowDateTimeModal}
      />
    </LoadUnloadPageProvider>
  )
}

export default LoadUnloadPage
