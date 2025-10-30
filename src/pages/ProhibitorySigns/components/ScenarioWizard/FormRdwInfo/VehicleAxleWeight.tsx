import { ErrorMessage, Input, Label, Paragraph } from '@amsterdam/asc-ui'
import InputWithSuffix from '../../../../../shared/components/InputWithSuffix'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { useRdwInfo } from '../../../hooks/useRdwInfo'

import { FormRdwInfoInputProps, FormRdwInfoInputs } from './Form'
import { RdwInfoFormColumn, RdwInfoFormRow } from './FormStyle'

const FormRdwInfoVehicleAxleWeight = ({ errors, register }: FormRdwInfoInputProps<FormRdwInfoInputs>) => {
  const { vehicle } = useProhibitorySignsPageContext()
  const { axlesInfo, subcategoryInfo } = useRdwInfo()

  const rdwMaxAxleWeight = () => {
    const suffix = vehicle.hasTrailer ? '(voertuig)' : '(max)'
    let maxAxleWeight = 'onbekend'

    if (axlesInfo.data) {
      maxAxleWeight = `${axlesInfo.data.derived.maxAxleWeight} kg ${suffix}`
    }

    return maxAxleWeight
  }

  const defaultAxleWeight = () => {
    let defaultWeight = axlesInfo.data?.derived.maxAxleWeight ?? 0
    let maxDefaultWeight = 10000

    if (subcategoryInfo.data && subcategoryInfo.data.length > 0) {
      maxDefaultWeight = subcategoryInfo.data[0].derived.isMobileCrane ? 12000 : 10000
    }

    if ((defaultWeight && defaultWeight > maxDefaultWeight) || vehicle.hasTrailer) {
      defaultWeight = maxDefaultWeight
    }

    return defaultWeight
  }

  const registerAxleWeight = register('vehicleAxleWeight', {
    value: vehicle?.axleWeight ?? defaultAxleWeight(),
  })

  return (
    <RdwInfoFormRow hasMargin={false} valign="center">
      <RdwInfoFormColumn span={4}>
        <Label htmlFor="vehicleAxleWeight" label="Aslast" />
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <Paragraph gutterBottom={0}>{rdwMaxAxleWeight()}</Paragraph>
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <InputWithSuffix suffix="kg">
          <Input
            data-testid="rdw-form-vehicle-axle-weight"
            id="vehicleAxleWeight"
            error={Boolean(errors.vehicleAxleWeight)}
            {...registerAxleWeight}
          />
        </InputWithSuffix>

        {errors.vehicleAxleWeight && <ErrorMessage message={errors.vehicleAxleWeight.message!} />}
      </RdwInfoFormColumn>
    </RdwInfoFormRow>
  )
}

export default FormRdwInfoVehicleAxleWeight
