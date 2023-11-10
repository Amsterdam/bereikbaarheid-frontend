import { GeoJSON } from '@amsterdam/arm-core'
import { useTheme } from 'styled-components'

import { DetailFeature } from '../types/detailFeature'

interface HighlightedFeatureLayerProps {
  detailFeature: DetailFeature | undefined
}

export const RoadObstructionsHighlightedFeatureLayer = ({ detailFeature }: HighlightedFeatureLayerProps) => {
  const featureKey = () => {
    if (!detailFeature) return null

    return detailFeature.type === 'wior'
      ? detailFeature.data.properties.id
      : detailFeature.data.properties.road_element_id
  }
  const theme = useTheme()

  if (!detailFeature) return null

  return (
    <GeoJSON
      key={featureKey()}
      args={[detailFeature.data]}
      options={{
        interactive: false,
        style: () => {
          return {
            color: theme.colors.secondary?.main,
            weight: 5,
          }
        },
      }}
    />
  )
}
