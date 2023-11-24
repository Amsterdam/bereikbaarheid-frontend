import { useContext, useEffect, useState } from 'react'

import { mapPanelConstants, MapPanelContent, MapPanelContext } from '@amsterdam/arm-core'
import { DetailFeatureLoadUnloadSpace } from 'shared/components/DetailFeature/LoadUnloadSpace'
import LoadingSpinner from 'shared/components/LoadingSpinner'

import { DetailFeatureActionType } from '../../contexts/detailFeatureReducer'
import useLoadUnloadMapContext from '../../contexts/MapContext'
import { useSearchForParkingSpace } from '../../hooks/useSearchForParkingSpace'

import { LoadUnloadDetailFeatureRoadSectionLoadUnload } from './RoadSectionLoadUnload'

const { Overlay, SnapPoint } = mapPanelConstants

export const LoadUnloadDetailFeature = () => {
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)
  const { detailFeature, setDetailFeature } = useLoadUnloadMapContext()
  const searchForParkingSpace = useSearchForParkingSpace()
  const [currentOverlay, setCurrentOverlay] = useState(Overlay.None)

  useEffect(() => {
    if (!detailFeature.feature && !detailFeature.location) {
      setCurrentOverlay(Overlay.None)
    } else {
      setPositionFromSnapPoint(SnapPoint.Halfway)
      setCurrentOverlay(Overlay.Results)
    }
    // missing useEffect dependency setPositionFromSnapPoint is left out
    // on purpose because otherwise the drawer cannot be closed at all.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailFeature, setCurrentOverlay])

  if (!detailFeature.feature && !detailFeature.location) return null

  return (
    <MapPanelContent
      animate
      stackOrder={currentOverlay === mapPanelConstants.Overlay.Results ? 2 : 1}
      onClose={() => {
        setDetailFeature({ type: DetailFeatureActionType.RESET })
      }}
    >
      {searchForParkingSpace.isInitialLoading && <LoadingSpinner />}

      {searchForParkingSpace.isError && <div>Er ging helaas iets mis.</div>}

      {searchForParkingSpace.results.data && searchForParkingSpace.results.data.features.length === 0 && (
        <div>Geen objecten gevonden op deze locatie.</div>
      )}

      {detailFeature.feature && detailFeature.feature.type === 'parkingSpace' && (
        <DetailFeatureLoadUnloadSpace parkingSpace={detailFeature.feature.data}></DetailFeatureLoadUnloadSpace>
      )}

      {detailFeature.feature && detailFeature.feature.type === 'roadSectionLoadUnload' && (
        <LoadUnloadDetailFeatureRoadSectionLoadUnload
          roadSectionLoadUnload={detailFeature.feature.data}
        ></LoadUnloadDetailFeatureRoadSectionLoadUnload>
      )}
    </MapPanelContent>
  )
}
