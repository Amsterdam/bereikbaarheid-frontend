import LoadingSpinner from '../../../../shared/components/LoadingSpinner'
import { useSearchAllDataSets } from '../../../../shared/hooks/useSearchAllDataSets'

import ProhibitorySignsDetailFeatureParkingSpace from './ParkingSpace'

interface FeatureSearchResultsProps {
  lat: number
  lon: number
}

const ProhibitorySignsDetailFeatureSearchResults = ({
  lat,
  lon,
}: FeatureSearchResultsProps) => {
  const searchResults = useSearchAllDataSets({
    enabled: !!lat && !!lon,
    datasets: 'parkeervakken',
    lat: lat,
    lon: lon,
    radius: 0,
  })

  if (searchResults.isLoading) return <LoadingSpinner />

  if (searchResults.isError) return <div>Er ging helaas iets mis.</div>

  return (
    <>
      {searchResults.data!.features.length === 0 && (
        <div>Geen parkeerplaats gevonden op deze locatie.</div>
      )}

      {searchResults.data!.features.length > 0 && (
        <ProhibitorySignsDetailFeatureParkingSpace
          id={searchResults.data!.features[0].properties.id}
        />
      )}
    </>
  )
}

export default ProhibitorySignsDetailFeatureSearchResults
