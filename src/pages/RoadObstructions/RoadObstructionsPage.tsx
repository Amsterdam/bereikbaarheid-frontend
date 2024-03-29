import { useEffect, useMemo, useState } from 'react'

import { BaseLayer, Map, MapPanel, mapPanelConstants, MapPanelDrawer, MapPanelProvider } from '@amsterdam/arm-core'
import { Modal, useMatchMedia } from '@amsterdam/asc-ui'
import { TileLayer } from '@amsterdam/react-maps'
import { format, parse } from 'date-fns'
import type L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { MainContent, PageWrapper } from 'shared/components/FullPageSize'
import Header from 'shared/components/Header'
import { HEADER_HEIGHT, Z_INDEX_MODAL } from 'shared/constants'
import useAnalytics from 'shared/hooks/useAnalytics'
import { useDocumentTitle } from 'shared/hooks/useDocumentTitle'
import { defaultMapOptions, setMapDefaults } from 'shared/map/mapDefaults'
import { oneWayArrows, roadNetworkNoRestrictions, topoBlackWhite } from 'shared/map/mapLayers'
import { MapStyle } from 'shared/map/mapStyle'
import styled from 'styled-components'

import RoadObstructionsDetailFeature from './components/DetailFeature'
import RoadObstructionsFiltersDisplay from './components/FiltersDisplay'
import { RoadObstructionsFiltersForm } from './components/FiltersForm'
import { RoadObstructionsHighlightedFeatureLayer } from './components/HighlightedFeature'
import RoadObstructionsLayer from './components/RoadObstructionsLayer'
import RoadObstructionsViewerContainer from './components/ViewerContainer'
import WiorLayer from './components/WiorLayer'
import RoadObstructionsMapProvider from './contexts/MapProvider'
import { DetailFeature } from './types/detailFeature'
import { RoadObstructionMapFilters } from './types/roadObstructionMapFilters'

const { SnapPoint } = mapPanelConstants

const StyledMap = styled(Map<typeof Map>)`
  flex-grow: 1;
`

const StyledMapPanelDrawer = styled(MapPanelDrawer)`
  & > div > div {
    z-index: 1;
  }
`

function RoadObstructionsPage() {
  const { t } = useTranslation()

  const [detailFeature, setDetailFeature] = useState<DetailFeature | undefined>(undefined)
  const [showMapFiltersForm, setShowMapFiltersForm] = useState(false)

  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  useEffect(() => {
    if (mapInstance) {
      setMapDefaults(mapInstance)
    }
  }, [mapInstance])

  const [searchParams, setSearchParams] = useSearchParams()
  const initialDate = searchParams.get('date') ?? format(new Date(), 'yyyy-MM-dd')
  const [mapFilters, setMapFilters] = useState<RoadObstructionMapFilters>({
    date: initialDate,
    timeFrom: '00:00',
    timeTo: '23:59',
  })
  useEffect(() => {
    setSearchParams({ date: mapFilters.date })
  }, [mapFilters.date, setSearchParams])

  const dateFormatted = useMemo(
    () => format(parse(mapFilters.date, 'yyyy-MM-dd', new Date()), 'dd-MM-yyyy'),
    [mapFilters.date]
  )

  useDocumentTitle(`${t('_pageRoadObstructions.roadObstructionsOn')} ${dateFormatted}`)

  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'tabletM' })
  const Element = showDesktopVariant ? MapPanel : StyledMapPanelDrawer

  const { trackPageVisit } = useAnalytics()
  useEffect(trackPageVisit)

  return (
    <>
      <PageWrapper>
        <Header title={`${t('_pageRoadObstructions.roadObstructionsOn')} ${dateFormatted}`} />

        <MainContent data-testid="road-obstructions-page">
          <MapStyle />
          <StyledMap options={defaultMapOptions} setInstance={setMapInstance}>
            <RoadObstructionsMapProvider>
              {/* @ts-ignore */}
              <MapPanelProvider
                variant={showDesktopVariant ? 'panel' : 'drawer'}
                initialPosition={SnapPoint.Halfway}
                topOffset={HEADER_HEIGHT}
              >
                <Element>
                  <RoadObstructionsDetailFeature detailFeature={detailFeature} setDetailFeature={setDetailFeature} />

                  <RoadObstructionsFiltersDisplay
                    dateFormatted={dateFormatted}
                    mapFilters={mapFilters}
                    setShowMapFiltersForm={setShowMapFiltersForm}
                  />
                </Element>

                <RoadObstructionsHighlightedFeatureLayer detailFeature={detailFeature} />

                <RoadObstructionsLayer
                  detailFeature={detailFeature}
                  setDetailFeature={setDetailFeature}
                  mapFilters={mapFilters}
                />

                <WiorLayer setDetailFeature={setDetailFeature} mapFilters={mapFilters} />

                <RoadObstructionsViewerContainer {...{ showDesktopVariant }} />
              </MapPanelProvider>
            </RoadObstructionsMapProvider>

            <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

            <TileLayer
              options={{ ...roadNetworkNoRestrictions.options, opacity: 0.65 }}
              args={[roadNetworkNoRestrictions.url]}
            />

            <BaseLayer baseLayer={topoBlackWhite.url} options={topoBlackWhite.options} />
          </StyledMap>
        </MainContent>
      </PageWrapper>

      <Modal
        aria-labelledby="modal"
        disablePortal // to prevent findDOMNode warning, see https://github.com/Amsterdam/amsterdam-styled-components/issues/2389
        open={showMapFiltersForm}
        zIndexOffset={Z_INDEX_MODAL}
      >
        <RoadObstructionsFiltersForm
          mapFilters={mapFilters}
          setMapFilters={setMapFilters}
          setShowMapFiltersForm={setShowMapFiltersForm}
        />
      </Modal>
    </>
  )
}

export default RoadObstructionsPage
