import {
  mapPanelConstants,
  MapPanelContent,
  MapPanelContext,
} from '@amsterdam/arm-core'
import { useContext, useEffect, useState } from 'react'

import { DetailFeatureLoadUnloadSpace } from '../../../../shared/components/DetailFeature/LoadUnloadSpace'
import LoadingSpinner from '../../../../shared/components/LoadingSpinner'

import { DetailFeatureActionType } from '../../contexts/detailFeatureReducer'
import { useLoadUnloadMapContext } from '../../contexts/MapContext'
import { useDetailFeatureData } from '../../hooks/useDetailFeatureData'

const { Overlay, SnapPoint } = mapPanelConstants

export const LoadUnloadDetailFeature = () => {
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)
  const { detailFeature, setDetailFeature } = useLoadUnloadMapContext()
  const [currentOverlay, setCurrentOverlay] = useState(Overlay.None)
  const { parkingSpace, searchResults } = useDetailFeatureData()

  useEffect(() => {
    if (!detailFeature.location && !detailFeature.featureId) {
      setCurrentOverlay(Overlay.None)
    } else {
      setPositionFromSnapPoint(SnapPoint.Halfway)
      setCurrentOverlay(Overlay.Results)
    }
    // missing useEffect dependency setPositionFromSnapPoint is left out
    // on purpose because otherwise the drawer cannot be closed at all.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailFeature, setCurrentOverlay])

  if (searchResults.isLoading || parkingSpace.isLoading) {
    return <LoadingSpinner />
  }

  if (parkingSpace.isError || searchResults.isError) {
    return <div>Er ging helaas iets mis.</div>
  }

  if (!detailFeature.location && !detailFeature.featureId) return null

  return (
    <MapPanelContent
      animate
      stackOrder={currentOverlay === mapPanelConstants.Overlay.Results ? 2 : 1}
      onClose={() => {
        setDetailFeature({ type: DetailFeatureActionType.RESET })
      }}
    >
      {searchResults.data && searchResults.data.features.length === 0 && (
        <div>Geen objecten gevonden op deze locatie.</div>
      )}

      {parkingSpace.data && (
        <DetailFeatureLoadUnloadSpace
          parkingSpace={parkingSpace.data}
        ></DetailFeatureLoadUnloadSpace>
      )}
    </MapPanelContent>
  )
}
