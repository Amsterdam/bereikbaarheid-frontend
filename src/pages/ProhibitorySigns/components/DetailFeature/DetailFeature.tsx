import { mapPanelConstants, MapPanelContent } from '@amsterdam/arm-core'
import { useEffect, useState } from 'react'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'

import ProhibitorySignsDetailFeatureSearchResults from './DetailFeatureSearchResults'
import ProhibitorySignsDetailFeatureTrafficSign from './TrafficSign'

const { Overlay } = mapPanelConstants

const ProhibitorySignsDetailFeature = () => {
  const { currentTrafficSign, setCurrentTrafficSign, location, setLocation } =
    useProhibitorySignsMapContext()
  const [currentOverlay, setCurrentOverlay] = useState(Overlay.None)

  useEffect(() => {
    if (!currentTrafficSign || !location) {
      setCurrentOverlay(Overlay.None)
    } else {
      setCurrentOverlay(Overlay.Results)
    }
  }, [currentTrafficSign, location])

  useEffect(() => {
    if (location) {
      setCurrentTrafficSign(undefined)
    }
  }, [location, setCurrentTrafficSign])

  useEffect(() => {
    if (currentTrafficSign) {
      setLocation(undefined)
    }
  }, [currentTrafficSign, setLocation])

  if (!currentTrafficSign && !location) return null

  return (
    <MapPanelContent
      animate
      stackOrder={currentOverlay === mapPanelConstants.Overlay.Results ? 2 : 1}
      onClose={() => {
        setCurrentTrafficSign(undefined)
        setLocation(undefined)
      }}
    >
      {currentTrafficSign && <ProhibitorySignsDetailFeatureTrafficSign />}

      {!currentTrafficSign && location && (
        <ProhibitorySignsDetailFeatureSearchResults
          lat={location[0]}
          lon={location[1]}
        />
      )}
    </MapPanelContent>
  )
}

export default ProhibitorySignsDetailFeature
