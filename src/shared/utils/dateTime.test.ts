import { formatISODate, stripSecondsFromTime } from './dateTime'

test('format ISO date-time as human-readable string', () => {
  expect(formatISODate('2023-10-10T15:54:23.481Z', 'dd-MM-yyyy HH:mm')).toBe(
    '10-10-2023 17:54'
  )

  expect(formatISODate('2023-10-10T15:54:23.481Z', 'dd-MM-yyyy')).toBe(
    '10-10-2023'
  )

  expect(formatISODate('2023-10-10T15:54:23.481Z', 'HH:mm')).toBe('17:54')

  expect(formatISODate('2023-10-10T15:54', 'dd-MM-yyyy HH:mm')).toBe(
    '10-10-2023 15:54'
  )
})

test('time string is stripped of seconds', () => {
  expect(stripSecondsFromTime('15:54:23')).toBe('15:54')
})
