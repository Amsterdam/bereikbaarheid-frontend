import { useEffect } from 'react'

import { useParkingSpaceInfo } from '../../../shared/hooks/useParkingSpaceInfo'
import { useSearchAllDataSets } from '../../../shared/hooks/useSearchAllDataSets'

import { DetailFeatureActionType } from '../contexts/detailFeatureReducer'
import { useLoadUnloadMapContext } from '../contexts/MapContext'

export const useDetailFeatureData = () => {
  const { detailFeature, setDetailFeature } = useLoadUnloadMapContext()

  const searchResults = useSearchAllDataSets({
    enabled: Boolean(detailFeature.location),
    datasets: 'parkeervakken',
    lat: detailFeature.location?.[0],
    lon: detailFeature.location?.[1],
    radius: 0,
  })

  const parkingSpace = useParkingSpaceInfo({
    enabled: Boolean(detailFeature.featureType === 'parkingSpace'),
    id: detailFeature.featureId,
  })

  useEffect(() => {
    if (searchResults.data && searchResults.data.features.length > 0) {
      setDetailFeature({
        type: DetailFeatureActionType.SET_FEATURE,
        featureId: searchResults.data.features[0].properties.id,
        featureType: 'parkingSpace',
      })
    }
  }, [searchResults.data, setDetailFeature])

  return {
    searchResults,
    parkingSpace,
  }
}
