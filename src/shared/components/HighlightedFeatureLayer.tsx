import { GeoJSON } from '@amsterdam/arm-core'
import { Geometry } from 'geojson'
import { useTheme } from 'styled-components'

interface DetailFeature {
  id: string
  geometry: Geometry
}

interface HighlightedFeatureLayerProps {
  detailFeature: DetailFeature | undefined
}

export const HighlightedFeatureLayer = ({
  detailFeature,
}: HighlightedFeatureLayerProps) => {
  const theme = useTheme()
  const isALine = () =>
    detailFeature?.geometry.type === 'LineString' ||
    detailFeature?.geometry.type === 'MultiLineString'

  if (!detailFeature) return null

  return (
    <GeoJSON
      key={detailFeature.id}
      args={[detailFeature.geometry]}
      options={{
        interactive: false,
        style: () => {
          return {
            color: theme.colors.secondary?.main,
            weight: isALine() ? 5 : 2,
          }
        },
      }}
    />
  )
}
