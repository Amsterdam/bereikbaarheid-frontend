import { ErrorMessage, Input, Label, Paragraph } from '@amsterdam/asc-ui'
import InputWithSuffix from 'shared/components/InputWithSuffix'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { useRdwInfo } from '../../../hooks/useRdwInfo'

import { FormRdwInfoInputProps, FormRdwInfoInputs } from './Form'
import { RdwInfoFormColumn, RdwInfoFormRow } from './FormStyle'

const FormRdwInfoVehicleLength = ({
  errors,
  register,
}: FormRdwInfoInputProps<FormRdwInfoInputs>) => {
  const { vehicle } = useProhibitorySignsPageContext()
  const { generalInfo } = useRdwInfo()

  const rdwLength = () => {
    let vehicleLength = 'onbekend'

    if (generalInfo.data) {
      vehicleLength = `${generalInfo.data[0].derived.length} m`
    }

    return vehicleLength
  }

  const defaultLength = () => {
    let defaultLength: number | undefined =
      generalInfo.data?.[0].derived.length ?? 0

    if (vehicle.hasTrailer) {
      defaultLength = undefined
    }

    return defaultLength
  }

  const registerLength = register('vehicleLength', {
    value: vehicle?.length ?? defaultLength(),
  })

  return (
    <RdwInfoFormRow hasMargin={false} valign="center">
      <RdwInfoFormColumn span={4}>
        <Label htmlFor="vehicleLength" label="Lengte" />
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <Paragraph gutterBottom={0}>{rdwLength()}</Paragraph>
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <InputWithSuffix suffix="m">
          <Input
            data-testid="rdw-form-vehicle-length"
            id="vehicleLength"
            error={Boolean(errors.vehicleLength)}
            placeholder="0.00"
            {...registerLength}
          />
        </InputWithSuffix>

        {errors.vehicleLength && (
          <ErrorMessage message={errors.vehicleLength.message!} />
        )}
      </RdwInfoFormColumn>
    </RdwInfoFormRow>
  )
}

export default FormRdwInfoVehicleLength
