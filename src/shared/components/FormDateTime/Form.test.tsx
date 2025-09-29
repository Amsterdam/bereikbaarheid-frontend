import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { format } from 'date-fns'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

import { withAppContext } from '../../../../test/utils/withAppContext'

import { FormDateTime, FormDateTimeProps } from './Form'

const defaultFormValues = {
  date: format(new Date(), 'yyyy-MM-dd'),
  timeFrom: '00:00',
  timeTo: '23:59',
}

describe('FormDateTime', () => {
  const props: FormDateTimeProps = {
    formValues: {
      date: '',
      timeFrom: '',
      timeTo: '',
    },
    onSubmitForm: vi.fn(),
  }

  it('should display error messages when no input is provided', async () => {
    render(withAppContext(<FormDateTime {...props} />))

    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(3)
    expect(props.onSubmitForm).not.toBeCalled()
  })

  it('should display an error message when date is invalid', async () => {
    render(withAppContext(<FormDateTime {...props} />))

    fireEvent.input(screen.getByTestId('date-input'), {
      target: {
        value: '31-12-2022',
      },
    })

    fireEvent.input(screen.getByTestId('time-from-input'), {
      target: {
        value: defaultFormValues.timeFrom,
      },
    })

    fireEvent.input(screen.getByTestId('time-to-input'), {
      target: {
        value: defaultFormValues.timeTo,
      },
    })

    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(props.onSubmitForm).not.toBeCalled()
    expect(screen.getByTestId('time-from-input')).toHaveValue(defaultFormValues.timeFrom)
    expect(screen.getByTestId('time-to-input')).toHaveValue(defaultFormValues.timeTo)
  })

  it('should display an error message when start time is invalid', async () => {
    render(withAppContext(<FormDateTime {...props} />))

    fireEvent.input(screen.getByTestId('date-input'), {
      target: {
        value: defaultFormValues.date,
      },
    })

    fireEvent.input(screen.getByTestId('time-from-input'), {
      target: {
        value: '28:00',
      },
    })

    fireEvent.input(screen.getByTestId('time-to-input'), {
      target: {
        value: defaultFormValues.timeTo,
      },
    })

    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(props.onSubmitForm).not.toBeCalled()
    expect(screen.getByTestId('date-input')).toHaveValue(defaultFormValues.date)
    expect(screen.getByTestId('time-to-input')).toHaveValue(defaultFormValues.timeTo)
  })

  it('should display an error message when end time is invalid', async () => {
    render(withAppContext(<FormDateTime {...props} />))

    fireEvent.input(screen.getByTestId('date-input'), {
      target: {
        value: defaultFormValues.date,
      },
    })

    fireEvent.input(screen.getByTestId('time-from-input'), {
      target: {
        value: defaultFormValues.timeFrom,
      },
    })

    fireEvent.input(screen.getByTestId('time-to-input'), {
      target: {
        value: '34:00',
      },
    })

    fireEvent.submit(screen.getByRole('button'))

    // two errors should be triggered:
    // - invalid end time and because of this
    // - the validation rule 'begin time is not before end time' is triggered
    expect(await screen.findAllByRole('alert')).toHaveLength(2)
    expect(props.onSubmitForm).not.toBeCalled()
    expect(screen.getByTestId('date-input')).toHaveValue(defaultFormValues.date)
    expect(screen.getByTestId('time-from-input')).toHaveValue(defaultFormValues.timeFrom)
  })

  it('should display an error message when end time is before end time', async () => {
    render(withAppContext(<FormDateTime {...props} />))

    fireEvent.input(screen.getByTestId('date-input'), {
      target: {
        value: defaultFormValues.date,
      },
    })

    fireEvent.input(screen.getByTestId('time-from-input'), {
      target: {
        value: '18:00',
      },
    })

    fireEvent.input(screen.getByTestId('time-to-input'), {
      target: {
        value: '10:00',
      },
    })

    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(props.onSubmitForm).not.toBeCalled()
  })

  it('should not display error when all values are valid', async () => {
    render(withAppContext(<FormDateTime {...props} />))

    fireEvent.input(screen.getByTestId('date-input'), {
      target: {
        value: defaultFormValues.date,
      },
    })

    fireEvent.input(screen.getByTestId('time-from-input'), {
      target: {
        value: defaultFormValues.timeFrom,
      },
    })

    fireEvent.input(screen.getByTestId('time-to-input'), {
      target: {
        value: defaultFormValues.timeTo,
      },
    })

    fireEvent.submit(screen.getByRole('button'))

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0))
    expect(props.onSubmitForm).toBeCalled()
    expect(screen.getByTestId('date-input')).toHaveValue(defaultFormValues.date)
    expect(screen.getByTestId('time-from-input')).toHaveValue(defaultFormValues.timeFrom)
    expect(screen.getByTestId('time-to-input')).toHaveValue(defaultFormValues.timeTo)
  })
})
