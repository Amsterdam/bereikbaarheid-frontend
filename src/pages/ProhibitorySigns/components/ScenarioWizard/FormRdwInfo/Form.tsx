import { ChevronLeft } from '@amsterdam/asc-assets'
import { Alert, Button, Column, CompactThemeProvider, Link, Paragraph } from '@amsterdam/asc-ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { DeepMap, FieldError, FieldValues, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form'
import { RouteIds } from 'routes'
import LoadingSpinner from 'shared/components/LoadingSpinner'
import { getGeneratedPath } from 'shared/utils/path'
import { z } from 'zod'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { useRdwInfo } from '../../../hooks/useRdwInfo'

import ScenarioWizardNav from './../ScenarioWizardNav'
import { RdwInfoFormInnerContainer, RdwInfoFormRow } from './FormStyle'
import FormRdwInfoIntroText from './IntroText'
import { useRdwInfoValidationSchema } from './useValidationSchema'
import FormRdwInfoVehicleAxleWeight from './VehicleAxleWeight'
import FormRdwInfoVehicleCurbWeight from './VehicleCurbWeight'
import FormRdwInfoVehicleLength from './VehicleLength'
import FormRdwInfoVehiclePayload from './VehiclePayload'
import FormRdwInfoVehicleSummary from './VehicleSummary'
import FormRdwInfoVehicleTotalWeight from './VehicleTotalWeight'
import FormRdwInfoVehicleWidth from './VehicleWidth'

export type FormRdwInfoInputs = {
  vehicleCurbWeight: number
  vehiclePayload: number
  vehicleTotalWeight: number
  vehicleAxleWeight: number
  vehicleLength: number
  vehicleWidth: number
}

export interface FormRdwInfoInputProps<TFormValues extends FieldValues> {
  errors: Partial<DeepMap<TFormValues, FieldError>>
  register: UseFormRegister<TFormValues>
}

export interface ProhibitorySignsFormScenarioRdwInfoProps {
  addressInputEnabled: boolean
}

export const ProhibitorySignsFormScenarioRdwInfo = ({
  addressInputEnabled,
}: ProhibitorySignsFormScenarioRdwInfoProps) => {
  const { setActiveStepWizard, setShowScenarioWizard, vehicle, setVehicle } = useProhibitorySignsPageContext()
  const previousFormStep = addressInputEnabled ? 1 : 0
  const { generalInfo, rdwDataIsLoading } = useRdwInfo()
  const validationSchema = useRdwInfoValidationSchema()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormRdwInfoInputs>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<z.infer<typeof validationSchema>> = data => {
    setVehicle({
      ...vehicle,
      axleWeight: data.vehicleAxleWeight,
      length: data.vehicleLength,
      payload: data.vehiclePayload,
      weight: data.vehicleTotalWeight,
      width: data.vehicleWidth,
    })

    setShowScenarioWizard(false)
  }

  return (
    <CompactThemeProvider>
      <Paragraph>
        Uw voertuiggegevens volgens{' '}
        <Link
          variant="inline"
          href={`https://ovi.rdw.nl/default.aspx?kenteken=${vehicle.licensePlate}`}
          target="_blank"
        >
          RDW
        </Link>
      </Paragraph>

      {rdwDataIsLoading && <LoadingSpinner />}

      {!rdwDataIsLoading && (
        <>
          <FormRdwInfoVehicleSummary />

          {generalInfo?.data?.[0].derived.isTourBus && (
            <Alert
              level="info"
              heading="Het ingevoerde kenteken is van een bus of touringcar"
              style={{ marginBlockEnd: '1em' }}
              data-testid="alert-touringcar"
            >
              <Paragraph style={{ paddingBlockStart: '1em' }}>
                <Link variant="with-chevron" href={getGeneratedPath(RouteIds.TOURINGCAR_PAGE)}>
                  Ga naar de Touringcar-pagina
                </Link>
              </Paragraph>
            </Alert>
          )}

          <FormRdwInfoIntroText />

          <form onSubmit={handleSubmit(onSubmit)} data-testid="form-scenario-rdw-info">
            <RdwInfoFormInnerContainer>
              <RdwInfoFormRow hasMargin={false}>
                <Column push={4} span={4}>
                  <Paragraph gutterBottom={0} strong>
                    RDW gegevens
                  </Paragraph>
                </Column>
                <Column span={4}>
                  <Paragraph gutterBottom={0} strong>
                    Uw gegevens
                  </Paragraph>
                </Column>
              </RdwInfoFormRow>

              <FormRdwInfoVehicleCurbWeight errors={errors} register={register} />

              <FormRdwInfoVehiclePayload errors={errors} register={register} setValue={setValue} />

              <FormRdwInfoVehicleTotalWeight errors={errors} register={register} />

              <FormRdwInfoVehicleAxleWeight errors={errors} register={register} />

              <FormRdwInfoVehicleLength errors={errors} register={register} />

              <FormRdwInfoVehicleWidth errors={errors} register={register} />
            </RdwInfoFormInnerContainer>

            <ScenarioWizardNav>
              <Button
                variant="textButton"
                iconSize={14}
                iconLeft={<ChevronLeft />}
                onClick={() => setActiveStepWizard(previousFormStep)}
              >
                Vorige
              </Button>

              <Button variant="secondary" type="submit">
                Kaart bekijken
              </Button>
            </ScenarioWizardNav>
          </form>
        </>
      )}
    </CompactThemeProvider>
  )
}
