import { Dispatch, SetStateAction } from 'react'

import {
  breakpoint,
  Button,
  Checkbox,
  ErrorMessage,
  Input,
  Label,
  Paragraph,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { zodResolver } from '@hookform/resolvers/zod'
import debounce from 'lodash/debounce'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FormLabel } from 'shared/components/FormLabel'
import InputWithSuffix from 'shared/components/InputWithSuffix'
import styled from 'styled-components'
import { z } from 'zod'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { Vehicle } from '../../../types/vehicle'
import {
  FormInputLicensePlate,
  FormInputLicensePlateWidth,
} from '../FormInputLicensePlate/Style'
import ScenarioWizardNav from '../ScenarioWizardNav'

import { FormScenarioStartSampleLicensePlates } from './SampleLicensePlates'
import { FormScenarioStartValidationSchema } from './ValidationSchema'

const FormFieldWrapper = styled.div`
  margin-bottom: ${themeSpacing(3)};
`

const StyledParagraph = styled(Paragraph)`
  display: inherit;
  font-size: inherit;
  margin-bottom: ${themeSpacing(2)};
`

const LicensePlateInnerContainer = styled.div`
  display: flex;
  align-items: end;
`

const VehicleHeightStyledInput = styled(Input)`
  @media screen and ${breakpoint('min-width', 'laptop')} {
    width: ${FormInputLicensePlateWidth};
  }
`

const debouncedHandler = debounce((e, handler) => handler(e), 500)

export interface ProhibitorySignsFormScenarioStartProps {
  addressInputEnabled: boolean
  setAddressInputEnabled: Dispatch<SetStateAction<boolean>>
}

export type FormScenarioStartInputs = {
  addressInputEnabled: ProhibitorySignsFormScenarioStartProps['addressInputEnabled']
  licensePlate: Vehicle['licensePlate']
  vehicleHasTrailer: Vehicle['hasTrailer']
  vehicleHeight: Vehicle['height']
}

export const ProhibitorySignsFormScenarioStart = ({
  addressInputEnabled,
  setAddressInputEnabled,
}: ProhibitorySignsFormScenarioStartProps) => {
  const { setActiveStepWizard, expertMode, vehicle, setVehicle } =
    useProhibitorySignsPageContext()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormScenarioStartInputs>({
    defaultValues: {
      licensePlate: vehicle?.licensePlate,
      vehicleHeight: vehicle?.height,
    },
    resolver: zodResolver(FormScenarioStartValidationSchema),
  })
  const { onChange, onBlur, name, ref } = register('licensePlate')

  const onSubmit: SubmitHandler<
    z.infer<typeof FormScenarioStartValidationSchema>
  > = data => {
    const nextFormStep = data.addressInputEnabled ? 1 : 2

    setAddressInputEnabled(data.addressInputEnabled ?? false)

    setVehicle({
      licensePlate: data.licensePlate,
      hasTrailer: data.vehicleHasTrailer ?? false,
      height: data.vehicleHeight,
    } as Vehicle)

    setActiveStepWizard(nextFormStep)
  }

  // the form below uses the react-hook-form Controller component for checkboxes,
  // because useForm defaultValues didn't work with the ASC Checkbox component
  return (
    <>
      <StyledParagraph>
        Na het invoeren van uw gegevens ziet u op de kaart of uw bestemming
        bereikbaar is.
      </StyledParagraph>

      <form onSubmit={handleSubmit(onSubmit)} data-testid="form-scenario-start">
        <FormFieldWrapper>
          <LicensePlateInnerContainer>
            <div>
              <FormLabel htmlFor="licensePlate" label="Kenteken" />
              <FormInputLicensePlate
                aria-label="Kenteken"
                id="licensePlate"
                error={Boolean(errors.licensePlate)}
                onChange={e => debouncedHandler(e, onChange)}
                onBlur={onBlur}
                name={name}
                ref={ref}
              />
            </div>

            {expertMode && (
              <div>
                <FormScenarioStartSampleLicensePlates setValue={setValue} />
              </div>
            )}
          </LicensePlateInnerContainer>

          {errors.licensePlate && (
            <ErrorMessage message={errors.licensePlate.message!} />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper>
          <FormLabel htmlFor="vehicleHeight" label="Hoogte van uw voertuig" />
          <InputWithSuffix suffix="m">
            <VehicleHeightStyledInput
              aria-label="Hoogte van uw voertuig"
              id="vehicleHeight"
              error={Boolean(errors.vehicleHeight)}
              placeholder="0.00"
              {...register('vehicleHeight')}
            />
          </InputWithSuffix>
          {errors.vehicleHeight && (
            <ErrorMessage message={errors.vehicleHeight.message!} />
          )}
        </FormFieldWrapper>

        <div>
          <Label
            htmlFor="vehicleHasTrailer"
            label="Ik heb een oplegger en/of aanhanger"
          >
            <Controller
              control={control}
              name="vehicleHasTrailer"
              defaultValue={vehicle.hasTrailer ?? false}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Checkbox
                  id="vehicleHasTrailer"
                  onChange={onChange}
                  onBlur={onBlur}
                  checked={value}
                  ref={ref}
                />
              )}
            />
          </Label>
        </div>

        <FormFieldWrapper>
          <Controller
            control={control}
            name="addressInputEnabled"
            defaultValue={addressInputEnabled}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Label
                htmlFor="addressInputEnabled"
                label="Ik wil een adres invoeren"
              >
                <Checkbox
                  id="addressInputEnabled"
                  onChange={onChange}
                  onBlur={onBlur}
                  checked={value}
                  ref={ref}
                />
              </Label>
            )}
          />
        </FormFieldWrapper>

        <ScenarioWizardNav halign="flex-end">
          <Button variant="secondary" taskflow type="submit">
            Volgende
          </Button>
        </ScenarioWizardNav>
      </form>
    </>
  )
}
