import { zToNumber } from '../../../../../shared/utils/zodPreprocess'
import { z } from 'zod'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { useRdwInfo } from '../../../hooks/useRdwInfo'

export const useRdwInfoValidationSchema = () => {
  const { vehicle } = useProhibitorySignsPageContext()
  const { axlesInfo, generalInfo, subcategoryInfo } = useRdwInfo()

  const maxAxleWeight = () => {
    // allowed general maximum axle weight (by law)
    let maxAxleWeight = 10000

    if (subcategoryInfo.data && subcategoryInfo.data.length > 0 && subcategoryInfo.data[0].derived.isMobileCrane) {
      maxAxleWeight = 12000
    }

    // Allowed maximum axle weight for vehicle, determined by RDW.
    // Defaults to the general allowed weight if the RDW has no
    // axle weight on record for this vehicle
    let rdwAxleWeight = axlesInfo.data?.derived.maxAxleWeight ?? maxAxleWeight

    // if vehicle has a trailer, take the general maximum weight
    if (vehicle.hasTrailer) return maxAxleWeight

    // Cap the validated weight to the general allowed weight,
    // even if (RDW) the axle weight of the vehicle is higher.
    return rdwAxleWeight >= maxAxleWeight ? maxAxleWeight : rdwAxleWeight
  }

  const maxTotalWeight = () => {
    if (subcategoryInfo.data && subcategoryInfo.data.length > 0) {
      return subcategoryInfo.data[0].derived.isMobileCrane ? 60000 : 50000
    }
    return 50000
  }

  const minWidth = () => generalInfo.data?.[0].derived.width ?? 0

  const schema = z.object({
    vehicleCurbWeight: z.number(),
    vehiclePayload: zToNumber(
      z
        .number({
          required_error: !vehicle.hasTrailer ? 'Voer lading voertuig in' : 'Voer lading van combinatie in',
          invalid_type_error: 'Voer een nummer in',
        })
        .min(0, 'Lading moet minimaal 0 kg zijn')
        .refine(
          val => {
            let rdwMaxPayload = generalInfo.data?.[0].derived.payload
            if (!rdwMaxPayload) return

            return !(val > rdwMaxPayload)
          },
          {
            message: `Lading mag niet meer zijn dan ${generalInfo.data?.[0].derived.payload} kg`,
          }
        )
    ),
    vehicleTotalWeight: z.preprocess(
      val => Number(String(val).replace(',', '.')),
      z
        .number({
          invalid_type_error: 'Voer een nummer in voor lading',
        })
        .min(
          generalInfo.data?.[0].derived.curbWeight!,
          `Totaal gewicht moet meer zijn dan ${generalInfo.data?.[0].derived.curbWeight} kg`
        )
        .max(
          maxTotalWeight(),
          `Totaal gewicht mag niet meer zijn dan ${maxTotalWeight()} kg. Neem contact op met het RDW.`
        )
    ),
    vehicleAxleWeight: zToNumber(
      z
        .number({
          required_error: !vehicle.hasTrailer ? 'Voer aslast voertuig in' : 'Voer maximale aslast van combinatie in',
          invalid_type_error: 'Voer een nummer in',
        })
        .min(0, 'Aslast moet minimaal 0 kg zijn')
        .max(maxAxleWeight(), `Aslast mag niet meer zijn dan ${maxAxleWeight()} kg. Neem contact op met het RDW.`)
    ),
    vehicleLength: zToNumber(
      z
        .number({
          required_error: !vehicle.hasTrailer ? 'Voer lengte voertuig in' : 'Voer lengte van combinatie in',
          invalid_type_error: 'Voer een nummer in',
        })
        .min(0, 'Lengte moet minimaal 0 m zijn')
        .max(22, 'Lengte mag maximaal 22 m zijn. Neem contact op met het RDW.')
    ),
    vehicleWidth: zToNumber(
      z
        .number({
          required_error: !vehicle.hasTrailer ? 'Voer breedte voertuig in' : 'Voer maximale breedte van combinatie in',
          invalid_type_error: 'Voer een nummer in',
        })
        .min(minWidth(), `Breedte moet minimaal ${minWidth()} m zijn`)
        .max(3, 'Breedte mag maximaal 3 m zijn. Neem contact op met het RDW.')
    ),
  })

  return schema
}
