import { getDay, parse } from 'date-fns'

const defaultFormat = 'yyyy-MM-dd'
const indexToDutchAbbr = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']

/**
 * Translates a date to a Dutch abbrevation of the day of the week.
 *
 * @param date The date to translate
 * @param format The date format. By default the format 'yyyy-MM-dd' is used.
 *   For more options see https://date-fns.org/v2.28.0/docs/format.
 * @returns 'zo', 'ma', 'di', 'wo', 'do', 'vr' or 'za'
 */
export const useDateToDayOfTheWeek = (date: string, format = defaultFormat) => {
  const dayIndex = getDay(parse(date, format, new Date()))

  return indexToDutchAbbr[dayIndex]
}
