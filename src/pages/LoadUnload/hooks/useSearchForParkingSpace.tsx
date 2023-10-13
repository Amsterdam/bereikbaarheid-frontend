import { useEffect } from 'react'

import { useParkingSpaceInfo } from '../../../shared/hooks/useParkingSpaceInfo'
import { useSearchAllDataSets } from '../../../shared/hooks/useSearchAllDataSets'
import { DetailFeatureActionType } from '../contexts/detailFeatureReducer'
import { useLoadUnloadMapContext } from '../contexts/MapContext'

export const useSearchForParkingSpace = () => {
  const { detailFeature, setDetailFeature } = useLoadUnloadMapContext()

  const searchResults = useSearchAllDataSets({
    enabled: Boolean(detailFeature.location),
    datasets: 'parkeervakken',
    lat: detailFeature.location?.[0],
    lon: detailFeature.location?.[1],
    radius: 0,
  })

  let enabled = !!searchResults.data && searchResults.data.features.length > 0
  const parkingSpace = useParkingSpaceInfo({
    enabled: enabled,
    id: enabled ? searchResults.data?.features[0].properties.id : undefined,
  })

  useEffect(() => {
    if (parkingSpace.data) {
      setDetailFeature({
        type: DetailFeatureActionType.SET_FEATURE,
        feature: {
          id: parkingSpace.data.id,
          data: parkingSpace.data,
          type: 'parkingSpace',
        },
      })
    }
  }, [parkingSpace.data, setDetailFeature])

  return {
    isError: parkingSpace.isError || searchResults.isError,
    isInitialLoading:
      parkingSpace.isInitialLoading || searchResults.isInitialLoading,
    results: searchResults,
  }
}
