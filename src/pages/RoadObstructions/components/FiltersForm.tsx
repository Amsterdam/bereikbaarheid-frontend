import {
  breakpoint,
  Button,
  Divider,
  ErrorMessage,
  Heading,
  Input,
  themeSpacing,
  TopBar,
} from '@amsterdam/asc-ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { FormLabel } from '../../../shared/components/FormLabel'
import ModalBlock from '../../../shared/components/ModalBlock'

import { RoadObstructionMapFilters } from '../types/roadObstructionMapFilters'
import { RoadObstructionsFiltersValidationSchema } from './FiltersValidationSchema'

const FormFieldWrapper = styled.div`
  margin-bottom: ${themeSpacing(3)};

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    width: 70%;
  }
`

const SubmitButton = styled(Button)`
  margin-top: ${themeSpacing(4)};
`

interface FiltersFormProps {
  mapFilters: RoadObstructionMapFilters
  setMapFilters: Dispatch<SetStateAction<RoadObstructionMapFilters>>
  setShowMapFiltersForm: Dispatch<SetStateAction<boolean>>
}

const RoadObstructionsFiltersForm = ({
  mapFilters,
  setMapFilters,
  setShowMapFiltersForm,
}: FiltersFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoadObstructionMapFilters>({
    resolver: zodResolver(RoadObstructionsFiltersValidationSchema),
  })

  const onSubmit: SubmitHandler<RoadObstructionMapFilters> = data => {
    setMapFilters({
      date: data.date,
      timeFrom: data.timeFrom,
      timeTo: data.timeTo,
    })

    setShowMapFiltersForm(false)
  }

  return (
    <>
      <TopBar>
        <Heading as="h2">Filter de stremmingen</Heading>
      </TopBar>
      <Divider />
      <ModalBlock>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldWrapper>
            <FormLabel htmlFor="date" label="Kies een datum" />
            <Input
              defaultValue={mapFilters.date}
              error={Boolean(errors.date)}
              type="date"
              {...register('date')}
            />
            {errors.date && <ErrorMessage message={errors.date.message!} />}
          </FormFieldWrapper>

          <FormFieldWrapper>
            <FormLabel htmlFor="timeFrom" label="Van" />
            <Input
              defaultValue={mapFilters.timeFrom}
              error={Boolean(errors.timeFrom)}
              type="time"
              {...register('timeFrom')}
            />
            {errors.timeFrom && (
              <ErrorMessage message={errors.timeFrom.message!} />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper>
            <FormLabel htmlFor="timeTo" label="Tot" />
            <Input
              defaultValue={mapFilters.timeTo}
              error={Boolean(errors.timeTo)}
              type="time"
              {...register('timeTo')}
            />
            {errors.timeTo && <ErrorMessage message={errors.timeTo.message!} />}
          </FormFieldWrapper>

          <SubmitButton variant="primary" type="submit">
            Kaart bekijken
          </SubmitButton>
        </form>
      </ModalBlock>
    </>
  )
}

export default RoadObstructionsFiltersForm
