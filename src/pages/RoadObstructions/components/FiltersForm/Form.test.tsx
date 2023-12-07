import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { format } from 'date-fns'

import { withAppContext } from '../../../../../test/utils/withAppContext'

import { RoadObstructionsFiltersForm, RoadObstructionsFiltersFormProps } from './Form'

const defaultFormValues = {
  date: format(new Date(), 'yyyy-MM-dd'),
  timeFrom: '00:00',
  timeTo: '23:59',
}

describe('RoadObstructionsFiltersForm', () => {
  const props: RoadObstructionsFiltersFormProps = {
    mapFilters: {
      date: '',
      timeFrom: '',
      timeTo: '',
    },
    setMapFilters: jest.fn(),
    setShowMapFiltersForm: jest.fn(),
  }

  it('displays error messages when no input is provided', async () => {
    render(withAppContext(<RoadObstructionsFiltersForm {...props} />))

    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(3)
    act(() => {
      expect(props.setShowMapFiltersForm).not.toBeCalled()
    })
  })

  it('displays an error message when date is invalid', async () => {
    render(withAppContext(<RoadObstructionsFiltersForm {...props} />))

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
    act(() => {
      expect(props.setMapFilters).not.toBeCalled()
    })
    expect(screen.getByTestId('time-from-input')).toHaveValue(defaultFormValues.timeFrom)
    expect(screen.getByTestId('time-to-input')).toHaveValue(defaultFormValues.timeTo)
  })

  it('displays an error message when start time is invalid', async () => {
    render(withAppContext(<RoadObstructionsFiltersForm {...props} />))

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
    act(() => {
      expect(props.setMapFilters).not.toBeCalled()
    })
    expect(screen.getByTestId('date-input')).toHaveValue(defaultFormValues.date)
    expect(screen.getByTestId('time-to-input')).toHaveValue(defaultFormValues.timeTo)
  })

  it('displays an error message when end time is invalid', async () => {
    render(withAppContext(<RoadObstructionsFiltersForm {...props} />))

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
    act(() => {
      expect(props.setMapFilters).not.toBeCalled()
    })
    expect(screen.getByTestId('date-input')).toHaveValue(defaultFormValues.date)
    expect(screen.getByTestId('time-from-input')).toHaveValue(defaultFormValues.timeFrom)
  })

  it('displays an error message when end time is before start time', async () => {
    render(withAppContext(<RoadObstructionsFiltersForm {...props} />))

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
    act(() => {
      expect(props.setMapFilters).not.toBeCalled()
    })
  })

  it('displays no errors when all values are valid', async () => {
    render(withAppContext(<RoadObstructionsFiltersForm {...props} />))

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
    act(() => {
      expect(props.setMapFilters).toBeCalled()
    })
    expect(screen.getByTestId('date-input')).toHaveValue(defaultFormValues.date)
    expect(screen.getByTestId('time-from-input')).toHaveValue(defaultFormValues.timeFrom)
    expect(screen.getByTestId('time-to-input')).toHaveValue(defaultFormValues.timeTo)
  })
})
