import { HighlightedFeatureLayer } from '../../../../shared/components/HighlightedFeatureLayer'

import { useDetailFeatureData } from '../../hooks/useDetailFeatureData'

export const LoadUnloadHighlightedFeatureLayer = () => {
  const { parkingSpace } = useDetailFeatureData()

  if (!parkingSpace.data) return null

  return (
    <HighlightedFeatureLayer
      detailFeature={{
        id: parkingSpace.data.id,
        geometry: parkingSpace.data.geometry,
      }}
    />
  )
}
