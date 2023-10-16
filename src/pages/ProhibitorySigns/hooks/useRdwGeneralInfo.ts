import { useQuery } from '@tanstack/react-query'

import { getVehicle, rdwGeneralData } from '../../../api/rdw/vehicle'
import { Vehicle } from '../types/vehicle'

export interface rdwGeneralInfo {
  server: rdwGeneralData
  derived: {
    buildDate: number
    curbWeight: number
    isBus: boolean
    isCompanyCar: boolean
    isHeavyGoodsVehicle: boolean
    isPrivateCar: boolean
    isTaxi: boolean
    length: number
    maxAllowedWeight: number
    payload: number
    vehicleType: string
    width: number
  }
}

export const DUMMY_VEHICLE = {
  axleWeight: 10000,
  hasTrailer: false,
  height: 2.65,
  length: 8.23,
  licensePlate: 'BXLS14',
  payload: 9590,
  weight: 26500,
  width: 2.55,
}

export const useRdwGeneralInfo = (vehicle: Vehicle = DUMMY_VEHICLE) => {
  // Setting a higher stale time, so that if the user works with the
  // application for a while - and using the same licenseplate -
  // the RDW API doesn't get queried on every render of a component.
  const queryResult = useQuery({
    enabled: !!vehicle.licensePlate,
    queryKey: ['rdw', 'general', vehicle.licensePlate],
    queryFn: () => getVehicle(vehicle.licensePlate),
    staleTime: 1000 * 60 * 15,
  })

  const parsedItem = (item: rdwGeneralData): rdwGeneralInfo => {
    let curbWeight = Number(item.massa_rijklaar)
    let maxAllowedWeight = Number(item.toegestane_maximum_massa_voertuig)

    if (
      vehicle.hasTrailer &&
      item.maximum_massa_samenstelling &&
      // bus in expert mode has a maximum_massa_samenstelling of 0
      Number(item.maximum_massa_samenstelling) !== 0
    ) {
      maxAllowedWeight = Number(item.maximum_massa_samenstelling)
    }

    return {
      server: item,
      derived: {
        buildDate: parseInt(item.datum_eerste_toelating.substring(0, 4)),
        curbWeight: curbWeight,
        isBus: item.voertuigsoort === 'Bus',
        isCompanyCar: item.voertuigsoort === 'Bedrijfsauto',
        isHeavyGoodsVehicle: Boolean(
          item.voertuigsoort === 'Bedrijfsauto' && maxAllowedWeight > 3500
        ),
        isPrivateCar: item.voertuigsoort === 'Personenauto',
        isTaxi: item.taxi_indicator === 'Ja',
        length: item.lengte ? Number(item.lengte) / 100.0 : 0,
        maxAllowedWeight: maxAllowedWeight,
        payload: maxAllowedWeight - curbWeight,
        vehicleType: item.voertuigsoort,
        width: item.breedte ? Number(item.breedte) / 100.0 : 0,
      },
    }
  }

  return {
    data: queryResult.data?.map(item => parsedItem(item)),
    isLoading: queryResult.isLoading,
  }
}
