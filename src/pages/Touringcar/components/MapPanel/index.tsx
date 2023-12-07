import { useEffect, useMemo, useState } from 'react'

import { mapPanelConstants, MapPanelContent } from '@amsterdam/arm-core'
import styled from 'styled-components'

import { useTouringcarMapContext } from '../../contexts/MapContext'

import ParkingSpaceDetails from './ParkingSpaceDetails'
import StopDetails from './StopDetails'

const { Overlay } = mapPanelConstants

const StyledMapPanelContent = styled(MapPanelContent)`
  padding: 0;
`

const TouringcarMapPanel = () => {
  const { currentStop, currentParkingSpace, unsetDetailsPane } = useTouringcarMapContext()
  const [currentOverlay, setCurrentOverlay] = useState(Overlay.None)

  const stopOrParkingSpace = useMemo(() => currentStop || currentParkingSpace, [currentParkingSpace, currentStop])

  useEffect(() => {
    if (!stopOrParkingSpace) {
      setCurrentOverlay(Overlay.None)
    } else {
      setCurrentOverlay(Overlay.Results)
    }
  }, [stopOrParkingSpace])

  if (!stopOrParkingSpace) return null

  return (
    <StyledMapPanelContent
      animate
      stackOrder={currentOverlay === mapPanelConstants.Overlay.Results ? 2 : 1}
      onClose={() => {
        unsetDetailsPane()
      }}
    >
      {currentParkingSpace && <ParkingSpaceDetails />}
      {currentStop && <StopDetails />}
    </StyledMapPanelContent>
  )
}

export default TouringcarMapPanel
