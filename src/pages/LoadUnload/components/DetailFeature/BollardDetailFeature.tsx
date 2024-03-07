import { useContext, useEffect, useState } from 'react'

import { mapPanelConstants, MapPanelContent, MapPanelContext } from '@amsterdam/arm-core'

import useLoadUnloadMapContext from '../../contexts/MapContext'

import BollardDetails from './BollardDetails'

const { Overlay, SnapPoint } = mapPanelConstants

function BollardDetailsFeature() {
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)
  const { currentBollard, setCurrentBollard } = useLoadUnloadMapContext()
  const [currentOverlay, setCurrentOverlay] = useState(Overlay.None)

  useEffect(() => {
    if (!currentBollard) {
      setCurrentOverlay(Overlay.None)
    } else {
      setPositionFromSnapPoint(SnapPoint.Halfway)
      setCurrentOverlay(Overlay.Results)
    }
    // missing useEffect dependency setPositionFromSnapPoint is left out
    // on purpose because otherwise the drawer cannot be closed at all.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBollard, setCurrentOverlay])

  if (!currentBollard) return null

  return (
    // @ts-ignore
    <MapPanelContent
      animate
      stackOrder={currentOverlay === mapPanelConstants.Overlay.Results ? 2 : 1}
      onClose={() => setCurrentBollard(undefined)}
    >
      {currentBollard && <BollardDetails bollard={currentBollard} />}
    </MapPanelContent>
  )
}

export default BollardDetailsFeature
