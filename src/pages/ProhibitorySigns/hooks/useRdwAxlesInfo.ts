import { useQuery } from '@tanstack/react-query'
import { getAxlesInfo, rdwAxlesData } from '../../../api/rdw/axles'

import { useProhibitorySignsPageContext } from '../contexts/PageContext'

export interface rdwAxlesInfo {
  server: rdwAxlesData[]
  derived: {
    maxAxleWeight: number
  }
}

export const useRdwAxlesInfo = () => {
  const { vehicle } = useProhibitorySignsPageContext()

  // setting a higher stale time, so that if the user works with the
  // application for a while - and using the same licenseplate -
  // the RDW API doesn't get queried on every render of a component.
  const queryResult = useQuery({
    enabled: !!vehicle.licensePlate,
    queryKey: ['rdw', 'axles', vehicle.licensePlate],
    queryFn: ({ signal }) => getAxlesInfo(vehicle.licensePlate, signal),
    staleTime: 1000 * 60 * 15,
  })

  const parseData = (data: rdwAxlesData[]): rdwAxlesInfo => {
    return {
      server: data,
      derived: {
        maxAxleWeight: Math.max.apply(
          Math,
          data.map(function (item: rdwAxlesData) {
            return Number(item.wettelijk_toegestane_maximum_aslast)
          })
        ),
      },
    }
  }

  return {
    data: queryResult.data ? parseData(queryResult.data) : undefined,
    isLoading: queryResult.isLoading,
  }
}
