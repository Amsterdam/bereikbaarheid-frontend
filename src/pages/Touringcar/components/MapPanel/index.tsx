import { useEffect, useState } from 'react'

import { mapPanelConstants, MapPanelContent } from '@amsterdam/arm-core'
import styled from 'styled-components'

import { useTouringcarMapContext } from '../../contexts/MapContext'

import ParkingSpaceDetails from './ParkingSpaceDetails'

const { Overlay } = mapPanelConstants

const StyledMapPanelContent = styled(MapPanelContent)`
  padding: 0;
`

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
    <StyledMapPanelContent
      animate
      stackOrder={currentOverlay === mapPanelConstants.Overlay.Results ? 2 : 1}
      onClose={() => {
        setCurrentParkingSpace(undefined)
      }}
    >
      <ParkingSpaceDetails />
    </StyledMapPanelContent>
  )
}

export default TouringcarMapPanel
