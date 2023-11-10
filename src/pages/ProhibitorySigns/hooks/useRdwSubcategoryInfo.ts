import { useQuery } from '@tanstack/react-query'
import { getVehicleSubcategory, rdwSubcategoryData } from 'api/rdw/subcategory'

import { useProhibitorySignsPageContext } from '../contexts/PageContext'

export interface rdwSubcategoryInfo {
  server: rdwSubcategoryData
  derived: {
    isMobileCrane: boolean
  }
}

export const useRdwSubcategoryInfo = () => {
  const { vehicle } = useProhibitorySignsPageContext()

  // setting a higher stale time, so that if the user works with the
  // application for a while - and using the same licenseplate -
  // the RDW API doesn't get queried on every render of a component.
  const queryResult = useQuery({
    enabled: !!vehicle.licensePlate,
    queryKey: ['rdw', 'subcategory', vehicle.licensePlate],
    queryFn: ({ signal }) => getVehicleSubcategory(vehicle.licensePlate, signal),
    staleTime: 1000 * 60 * 15,
  })

  const parsedItem = (item: rdwSubcategoryData): rdwSubcategoryInfo => {
    return {
      server: item,
      derived: {
        isMobileCrane: item.subcategorie_voertuig_europees === 'SF',
      },
    }
  }

  return {
    data: queryResult.data?.map(item => parsedItem(item)),
    isLoading: queryResult.isLoading,
  }
}
