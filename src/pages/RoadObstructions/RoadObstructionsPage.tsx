import {
  BaseLayer,
  Map,
  MapPanel,
  mapPanelConstants,
  MapPanelDrawer,
  MapPanelProvider,
} from '@amsterdam/arm-core'
import { Modal, useMatchMedia } from '@amsterdam/asc-ui'
import { TileLayer } from '@amsterdam/react-maps'
import { format, parse } from 'date-fns'
import type L from 'leaflet'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'

import { HEADER_HEIGHT, Z_INDEX_MODAL } from '../../shared/constants'
import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'
import { MapStyle } from '../../shared/map/mapStyle'
import { defaultMapOptions, setMapDefaults } from '../../shared/map/mapDefaults'
import {
  oneWayArrows,
  roadNetworkNoRestrictions,
  topoBlackWhite,
} from '../../shared/map/mapLayers'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle'
import useAnalytics from '../../shared/hooks/useAnalytics'

import RoadObstructionsFiltersDisplay from './components/FiltersDisplay'
import { RoadObstructionsFiltersForm } from './components/FiltersForm'
import RoadObstructionsLayer from './components/RoadObstructionsLayer'
import RoadObstructionsViewerContainer from './components/ViewerContainer'
import { DetailFeature } from './types/detailFeature'
import { RoadObstructionMapFilters } from './types/roadObstructionMapFilters'
import WiorLayer from './components/WiorLayer'
import RoadObstructionsMapProvider from './contexts/MapProvider'
import RoadObstructionsDetailFeature from './components/DetailFeature'
import { RoadObstructionsHighlightedFeatureLayer } from './components/HighlightedFeature'
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

const RoadObstructionsPage = () => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const [detailFeature, setDetailFeature] = useState<DetailFeature | undefined>(
    undefined
  )
  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'tabletM' })

  useEffect(() => {
    if (mapInstance) {
      setMapDefaults(mapInstance)
    }
  }, [mapInstance])

  // variables concerning map filters
  const [searchParams, setSearchParams] = useSearchParams()
  let initialDate = searchParams.get('date') ?? format(new Date(), 'yyyy-MM-dd')
  const [mapFilters, setMapFilters] = useState<RoadObstructionMapFilters>({
    date: initialDate,
    timeFrom: '00:00',
    timeTo: '23:59',
  })
  const dateFormatted = useMemo(
    () =>
      format(parse(mapFilters.date, 'yyyy-MM-dd', new Date()), 'dd-MM-yyyy'),
    [mapFilters.date]
  )
  const [showMapFiltersForm, setShowMapFiltersForm] = useState(false)

  useEffect(() => {
    setSearchParams({ date: mapFilters.date })
  }, [mapFilters.date, setSearchParams])

  useDocumentTitle(`Stremmingen op ${dateFormatted}`)

  const Element = showDesktopVariant ? MapPanel : StyledMapPanelDrawer

  const { trackPageVisit } = useAnalytics()
  useEffect(trackPageVisit)

  return (
    <>
      <PageWrapper>
        <Header title={`Stremmingen op ${dateFormatted}`} />

        <MainContent data-testid="road-obstructions-page">
          <MapStyle />
          <StyledMap options={defaultMapOptions} setInstance={setMapInstance}>
            <RoadObstructionsMapProvider>
              <MapPanelProvider
                variant={showDesktopVariant ? 'panel' : 'drawer'}
                initialPosition={SnapPoint.Halfway}
                topOffset={HEADER_HEIGHT}
              >
                <Element>
                  <RoadObstructionsDetailFeature
                    detailFeature={detailFeature}
                    setDetailFeature={setDetailFeature}
                  />

                  <RoadObstructionsFiltersDisplay
                    dateFormatted={dateFormatted}
                    mapFilters={mapFilters}
                    setShowMapFiltersForm={setShowMapFiltersForm}
                  />
                </Element>

                <RoadObstructionsHighlightedFeatureLayer
                  detailFeature={detailFeature}
                />

                <RoadObstructionsLayer
                  detailFeature={detailFeature}
                  setDetailFeature={setDetailFeature}
                  mapFilters={mapFilters}
                />

                <WiorLayer
                  setDetailFeature={setDetailFeature}
                  mapFilters={mapFilters}
                />

                <RoadObstructionsViewerContainer {...{ showDesktopVariant }} />
              </MapPanelProvider>
            </RoadObstructionsMapProvider>

            <TileLayer
              options={oneWayArrows.options}
              args={[oneWayArrows.url]}
            />

            <TileLayer
              options={{ ...roadNetworkNoRestrictions.options, opacity: 0.65 }}
              args={[roadNetworkNoRestrictions.url]}
            />

            <BaseLayer
              baseLayer={topoBlackWhite.url}
              options={topoBlackWhite.options}
            />
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
