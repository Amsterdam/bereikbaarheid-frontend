import { ErrorMessage, Input, Label, Paragraph } from '@amsterdam/asc-ui'

import InputWithSuffix from '../../../../../shared/components/InputWithSuffix'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { useRdwInfo } from '../../../hooks/useRdwInfo'

import { FormRdwInfoInputProps, FormRdwInfoInputs } from './FormRdwInfo'
import { RdwInfoFormColumn, RdwInfoFormRow } from './FormRdwInfoStyle'

const FormRdwInfoVehicleWidth = ({
  errors,
  register,
}: FormRdwInfoInputProps<FormRdwInfoInputs>) => {
  const { vehicle } = useProhibitorySignsPageContext()
  const { generalInfo } = useRdwInfo()

  const rdwWidth = () => {
    let vehicleWidth = 'onbekend'

    if (generalInfo.data) {
      vehicleWidth = `${generalInfo.data[0].derived.width} m`
    }

    return vehicleWidth
  }

  const defaultWidth = () => {
    let defaultWidth: number | undefined =
      generalInfo.data?.[0].derived.width ?? 0

    if (vehicle.hasTrailer) {
      defaultWidth = undefined
    }

    return defaultWidth
  }

  const registerWidth = register('vehicleWidth', {
    value: vehicle?.width ?? defaultWidth(),
  })

  return (
    <RdwInfoFormRow hasMargin={false} valign="center">
      <RdwInfoFormColumn span={4}>
        <Label htmlFor="vehicleWidth" label="Breedte" />
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <Paragraph gutterBottom={0}>{rdwWidth()}</Paragraph>
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <InputWithSuffix suffix="m">
          <Input
            id="vehicleWidth"
            error={Boolean(errors.vehicleWidth)}
            placeholder="0.00"
            {...registerWidth}
          />
        </InputWithSuffix>

        {errors.vehicleWidth && (
          <ErrorMessage message={errors.vehicleWidth.message!} />
        )}
      </RdwInfoFormColumn>
    </RdwInfoFormRow>
  )
}

export default FormRdwInfoVehicleWidth
