import { z } from 'zod'

import { getVehicle } from '../../../../api/rdw/vehicle'
import { zToNumber } from '../../../../shared/utils/zodPreprocess'

function isPermittedVehicleType(vehicleType: string) {
  const permittedVehicleTypes = ['Bedrijfsauto', 'Bus', 'Personenauto']

  return permittedVehicleTypes.includes(vehicleType)
}

const isValidLicensePlate = async (val: string, ctx: z.RefinementCtx) => {
  const rdwApi = await getVehicle(val)

  if (rdwApi.length === 0) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'Kenteken niet gevonden bij RDW. Probeer het nog eens met een geldig Nederlands kenteken',
    })
  }

  if (!isPermittedVehicleType(rdwApi[0].voertuigsoort)) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Voer een kenteken in van een trekkend voertuig',
    })
  }

  if (!rdwApi[0].toegestane_maximum_massa_voertuig) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `RDW kent geen toegestaan maximum gewicht voor dit voertuig\
        waardoor u deze kaart niet kan gebruiken. We werken aan een oplossing.`,
    })
  }
}

export const FormScenarioStartValidationSchema = z.object({
  addressInputEnabled: z.boolean(),
  licensePlate: z
    .preprocess(
      val =>
        String(val)
          .replace(/ |-|\t/g, '')
          .toUpperCase(),
      z.string()
    )
    .superRefine((val, ctx) => {
      if (val.length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Voer een kenteken in',
          fatal: true,
        })
      }
    })
    .superRefine(isValidLicensePlate),
  vehicleHasTrailer: z.boolean(),
  vehicleHeight: zToNumber(
    z
      .number({
        required_error: 'Voer hoogte voertuig in',
        invalid_type_error: 'Voer een getal in tussen 0 m en 4 m',
      })
      .gt(0, 'Hoogte moet vallen tussen 0 m en 4 m')
      .max(
        4,
        'Hoogte moet vallen tussen 0 m en 4 m. Neem contact op met het RDW.'
      )
  ),
})
