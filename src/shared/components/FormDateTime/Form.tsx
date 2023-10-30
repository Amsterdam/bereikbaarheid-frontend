import {
  breakpoint,
  Button,
  ErrorMessage,
  Input,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { FormLabel } from '../FormLabel'

import { FormDateTimeValidationSchema } from './ValidationSchema'

const FormFieldWrapper = styled.div`
  margin-bottom: ${themeSpacing(3)};

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    width: 70%;
  }
`

const SubmitButton = styled(Button)`
  margin-top: ${themeSpacing(4)};
`

export interface FormDateTimeValues {
  date: string
  timeFrom: string
  timeTo: string
}

export interface FormDateTimeProps {
  formValues: FormDateTimeValues
  onSubmitForm: (data: FormDateTimeValues) => void
}

export const FormDateTime = ({
  formValues,
  onSubmitForm,
}: FormDateTimeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDateTimeValues>({
    resolver: zodResolver(FormDateTimeValidationSchema),
  })

  const onSubmit: SubmitHandler<FormDateTimeValues> = data => onSubmitForm(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldWrapper>
        <FormLabel htmlFor="date" label="Kies een datum" />
        <Input
          data-testid="date-input"
          defaultValue={formValues.date}
          error={Boolean(errors.date)}
          type="date"
          {...register('date')}
        />
        {errors.date && <ErrorMessage message={errors.date.message!} />}
      </FormFieldWrapper>

      <FormFieldWrapper>
        <FormLabel htmlFor="timeFrom" label="Van" />
        <Input
          data-testid="time-from-input"
          defaultValue={formValues.timeFrom}
          error={Boolean(errors.timeFrom)}
          type="time"
          {...register('timeFrom')}
        />
        {errors.timeFrom && <ErrorMessage message={errors.timeFrom.message!} />}
      </FormFieldWrapper>

      <FormFieldWrapper>
        <FormLabel htmlFor="timeTo" label="Tot" />
        <Input
          data-testid="time-to-input"
          defaultValue={formValues.timeTo}
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
  )
}
