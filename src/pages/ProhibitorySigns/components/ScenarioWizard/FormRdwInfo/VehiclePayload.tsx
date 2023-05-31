import { ErrorMessage, Input, Label, Paragraph } from '@amsterdam/asc-ui'

import InputWithSuffix from '../../../../../shared/components/InputWithSuffix'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { useRdwInfo } from '../../../hooks/useRdwInfo'

import { FormRdwInfoInputProps, FormRdwInfoInputs } from './Form'
import {
  RdwInfoFormColumn,
  RdwInfoFormLabelHelpText,
  RdwInfoFormRow,
} from './FormStyle'
import { FormEvent } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

interface FormRdwInfoVehiclePayloadProps<TFormValues extends FieldValues>
  extends FormRdwInfoInputProps<TFormValues> {
  setValue: UseFormSetValue<TFormValues>
}

const FormRdwInfoVehiclePayload = ({
  errors,
  register,
  setValue,
}: FormRdwInfoVehiclePayloadProps<FormRdwInfoInputs>) => {
  const { vehicle } = useProhibitorySignsPageContext()
  const { generalInfo } = useRdwInfo()

  const rdwPayload = () => {
    let vehiclePayload = 'onbekend'

    if (generalInfo.data) {
      vehiclePayload = `${generalInfo.data?.[0].derived.payload} kg (max)`
    }

    return vehiclePayload
  }

  const registerVehiclePayload = register('vehiclePayload', {
    value: vehicle?.payload ?? generalInfo.data?.[0].derived.payload,
  })

  // update vehicle total weight on change payload
  const calculateTotalWeight = (e: FormEvent<HTMLInputElement>) => {
    const payloadInputValue = e.currentTarget.value
    let curbWeight = generalInfo.data?.[0].derived.curbWeight
    let payload = payloadInputValue
      ? Number(payloadInputValue.replace(',', '.'))
      : 0

    setValue('vehicleTotalWeight', (curbWeight ?? 0) + (payload ?? 0), {
      shouldValidate: true,
    })
  }

  return (
    <RdwInfoFormRow hasMargin={false} valign="center">
      <RdwInfoFormColumn span={4}>
        <Label htmlFor="vehiclePayload" label="Lading" />
        {vehicle.hasTrailer && (
          <RdwInfoFormLabelHelpText>
            incl. ledig gewicht oplegger en/of aanhanger
          </RdwInfoFormLabelHelpText>
        )}
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <Paragraph gutterBottom={0}>{rdwPayload()}</Paragraph>
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <InputWithSuffix suffix="kg">
          <Input
            id="vehiclePayload"
            error={Boolean(errors.vehiclePayload)}
            {...registerVehiclePayload}
            onChange={e => {
              registerVehiclePayload.onChange(e)
              calculateTotalWeight(e)
            }}
          />
        </InputWithSuffix>

        {errors.vehiclePayload && (
          <ErrorMessage message={errors.vehiclePayload.message!} />
        )}
      </RdwInfoFormColumn>
    </RdwInfoFormRow>
  )
}

export default FormRdwInfoVehiclePayload
