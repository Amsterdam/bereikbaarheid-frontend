import { useEffect, useState } from 'react'

import { mapPanelConstants, MapPanelContent } from '@amsterdam/arm-core'

import ParkingSpaceDetailFeature from './ParkingSpaceDetailFeature'

import { useTouringcarMapContext } from '../../contexts/MapContext'

const { Overlay } = mapPanelConstants

const TouringcarMapPanel = () => {
  const { currentParkingSpace, setCurrentParkingSpace } =
    useTouringcarMapContext()
  const [currentOverlay, setCurrentOverlay] = useState(Overlay.None)

  useEffect(() => {
    if (!currentParkingSpace) {
      setCurrentOverlay(Overlay.None)
    } else {
      setCurrentOverlay(Overlay.Results)
    }
  }, [currentParkingSpace])

  if (!currentParkingSpace) return null

  return (
    <MapPanelContent
      animate
      stackOrder={currentOverlay === mapPanelConstants.Overlay.Results ? 2 : 1}
      onClose={() => {
        setCurrentParkingSpace(undefined)
      }}
    >
      {currentParkingSpace && <ParkingSpaceDetailFeature />}

      {!currentParkingSpace && <ParkingSpaceDetailFeature />}
    </MapPanelContent>
  )
}

export default TouringcarMapPanel
