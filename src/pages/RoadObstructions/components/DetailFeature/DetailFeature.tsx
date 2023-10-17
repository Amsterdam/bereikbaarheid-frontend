import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

import { mapPanelConstants, MapPanelContext } from '@amsterdam/arm-core'

import RoadSectionInfo from './RoadSectionInfo'
import { RoadObstructionsDetailFeatureWior } from './Wior'

import { DetailFeature } from '../../types/detailFeature'

const { Overlay } = mapPanelConstants

interface RoadObstructionsDetailFeatureProps {
  detailFeature: DetailFeature | undefined
  setDetailFeature: Dispatch<SetStateAction<DetailFeature | undefined>>
}

const RoadObstructionsDetailFeature = ({
  detailFeature,
  setDetailFeature,
}: RoadObstructionsDetailFeatureProps) => {
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)
  const [currentOverlay, setCurrentOverlay] = useState(Overlay.None)

  useEffect(() => {
    if (!detailFeature) {
      setCurrentOverlay(Overlay.None)
    } else {
      setPositionFromSnapPoint(mapPanelConstants.SnapPoint.Halfway)
      setCurrentOverlay(Overlay.Results)
    }
  }, [detailFeature, setCurrentOverlay, setPositionFromSnapPoint])

  if (detailFeature && detailFeature.type === 'roadSectionObstructions') {
    return (
      <RoadSectionInfo
        currentOverlay={currentOverlay}
        detailFeature={detailFeature}
        setDetailFeature={setDetailFeature}
      />
    )
  }

  if (detailFeature && detailFeature.type === 'wior') {
    return (
      <RoadObstructionsDetailFeatureWior
        currentOverlay={currentOverlay}
        detailFeature={detailFeature}
        setDetailFeature={setDetailFeature}
      />
    )
  }

  return null
}

export default RoadObstructionsDetailFeature
