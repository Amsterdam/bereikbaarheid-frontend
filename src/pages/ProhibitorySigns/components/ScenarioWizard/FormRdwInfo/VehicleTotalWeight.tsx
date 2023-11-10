import { ErrorMessage, Input, Label, Paragraph, styles, themeSpacing } from '@amsterdam/asc-ui'
import InputWithSuffix from 'shared/components/InputWithSuffix'
import styled from 'styled-components'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { useRdwInfo } from '../../../hooks/useRdwInfo'

import { FormRdwInfoInputProps, FormRdwInfoInputs } from './Form'
import { RdwInfoFormColumn, RdwInfoFormRow } from './FormStyle'

const StyledFormRow = styled(RdwInfoFormRow)`
  border-top: 1px solid ${props => props.theme.colors.tint?.level6};
  font-weight: 700;
  margin-bottom: ${themeSpacing(4)};
  position: relative;

  ${styles.InputStyle} {
    font-weight: 700;
  }

  &:after {
    content: '\\002B';
    position: absolute;
    right: -${themeSpacing(4)};
    top: -${themeSpacing(4)};
  }
`

const FormRdwInfoVehicleTotalWeight = ({ errors, register }: FormRdwInfoInputProps<FormRdwInfoInputs>) => {
  const { vehicle } = useProhibitorySignsPageContext()
  const { generalInfo } = useRdwInfo()

  const rdwTotalWeight = () => {
    let vehicleTotalWeight = `${generalInfo.data?.[0].derived.curbWeight} kg`

    if (generalInfo.data?.[0].derived.maxAllowedWeight) {
      vehicleTotalWeight = `${generalInfo.data?.[0].derived.maxAllowedWeight} kg (max)`
    }

    return vehicleTotalWeight
  }

  const registerTotalWeight = register('vehicleTotalWeight', {
    value: vehicle?.weight ?? generalInfo.data?.[0].derived.maxAllowedWeight,
  })

  return (
    <StyledFormRow hasMargin={false} valign="center">
      <RdwInfoFormColumn span={4}>
        <Label htmlFor="vehicleTotalWeight" label="Totaal gewicht" />
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <Paragraph gutterBottom={0} strong>
          {rdwTotalWeight()}
        </Paragraph>
      </RdwInfoFormColumn>
      <RdwInfoFormColumn span={4}>
        <InputWithSuffix displayAsText suffix="kg">
          <Input
            data-testid="rdw-form-vehicle-total-weight"
            id="vehicleTotalWeight"
            disabled
            error={Boolean(errors.vehicleTotalWeight)}
            {...registerTotalWeight}
          />
        </InputWithSuffix>

        {errors.vehicleTotalWeight && <ErrorMessage message={errors.vehicleTotalWeight.message!} />}
      </RdwInfoFormColumn>
    </StyledFormRow>
  )
}

export default FormRdwInfoVehicleTotalWeight
