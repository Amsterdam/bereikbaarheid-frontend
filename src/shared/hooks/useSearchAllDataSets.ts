import { useQuery } from '@tanstack/react-query'

import { SearchAllDatasetsProps, searchAllDatasets } from '../../api/geosearch'

interface UseSearchAllDataSetsProps extends SearchAllDatasetsProps {
  enabled: boolean
}

export const useSearchAllDataSets = ({
  enabled,
  datasets,
  lat,
  lon,
  radius,
}: UseSearchAllDataSetsProps) => {
  const params = {
    datasets: datasets,
    lat: lat,
    lon: lon,
    radius: radius,
  }

  const queryResult = useQuery({
    enabled: enabled,
    queryKey: ['searchAllDatasets', lat, lon],
    queryFn: ({ signal }) => searchAllDatasets(params, signal),
  })

  return queryResult
}
