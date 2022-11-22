import { useQuery } from 'react-query'

import {
  getParkingSpaceById,
  GetParkingSpaceProps,
} from '../../api/parkeervakken'

interface UseParkingSpaceInfoProps extends GetParkingSpaceProps {
  enabled: boolean
}

export const useParkingSpaceInfo = ({
  enabled,
  id,
}: UseParkingSpaceInfoProps) => {
  return useQuery({
    enabled: enabled,
    queryKey: ['parkingSpace', id],
    queryFn: ({ signal }) => getParkingSpaceById(id, signal),
    staleTime: 1000 * 60 * 15,
  })
}
