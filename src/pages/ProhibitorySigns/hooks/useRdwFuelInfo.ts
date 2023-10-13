import { useQuery } from '@tanstack/react-query'

import { getFuelInfo, rdwFuelData } from '../../../api/rdw/fuel'
import { useProhibitorySignsPageContext } from '../contexts/PageContext'

export interface rdwFuelInfo {
  server: rdwFuelData
  derived: {}
}

export const useRdwFuelInfo = () => {
  const { vehicle } = useProhibitorySignsPageContext()

  // setting a higher stale time, so that if the user works with the
  // application for a while - and using the same licenseplate -
  // the RDW API doesn't get queried on every render of a component.
  const queryResult = useQuery({
    enabled: !!vehicle.licensePlate,
    queryKey: ['rdw', 'fuel', vehicle.licensePlate],
    queryFn: ({ signal }) => getFuelInfo(vehicle.licensePlate, signal),
    staleTime: 1000 * 60 * 15,
  })

  const parsedItem = (item: rdwFuelData): rdwFuelInfo => {
    return {
      server: item,
      derived: {},
    }
  }

  return {
    data: queryResult.data?.map(item => parsedItem(item)),
    isLoading: queryResult.isLoading,
  }
}
