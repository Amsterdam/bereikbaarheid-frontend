import { Input, Label, Paragraph } from '@amsterdam/asc-ui'
import InputWithSuffix from 'shared/components/InputWithSuffix'
import styled from 'styled-components'

import { FormRdwInfoInputProps, FormRdwInfoInputs } from './Form'
import {
  RdwInfoFormColumn,
  RdwInfoFormLabelHelpText,
  RdwInfoFormRow,
} from './FormStyle'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { useRdwInfo } from '../../../hooks/useRdwInfo'

const StyledFormRow = styled(RdwInfoFormRow)`
  margin-bottom: 0;
`

const FormRdwInfoVehicleCurbWeight = ({
  register,
}: FormRdwInfoInputProps<FormRdwInfoInputs>) => {
  const { vehicle } = useProhibitorySignsPageContext()
  const { generalInfo } = useRdwInfo()

  const registerCurbWeight = register('vehicleCurbWeight', {
    value: generalInfo.data?.[0].derived.curbWeight,
  })

  return (
    <StyledFormRow hasMargin={false} valign="center">
      <RdwInfoFormColumn span={4}>
        <Label htmlFor="vehicleCurbWeight" label="Rijklaar gewicht" />
        {vehicle.hasTrailer && (
          <RdwInfoFormLabelHelpText>voertuig</RdwInfoFormLabelHelpText>
        )}
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <Paragraph gutterBottom={0}>
          {generalInfo.data?.[0].derived.curbWeight} kg
        </Paragraph>
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <InputWithSuffix displayAsText suffix="kg">
          <Input id="vehicleCurbWeight" disabled {...registerCurbWeight} />
        </InputWithSuffix>
      </RdwInfoFormColumn>
    </StyledFormRow>
  )
}

export default FormRdwInfoVehicleCurbWeight
