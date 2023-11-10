import { format, getDay, parse, parseISO } from 'date-fns'
import nlLocale from 'date-fns/locale/nl'

type Year = `${number}${number}${number}${number}`
type Month = `${number}${number}`
type Day = `${number}${number}`
type Hours = `${number}${number}`
type Minutes = `${number}${number}`
type Seconds = `${number}${number}`
type FractionOfSecond = `${number}${number}${number}`

type DateHumanReadable_Year_Month_Day = `${Year}-${Month}-${Day}`
type DateHumanReadable_Day_Month_Year = `${Day}-${Month}-${Year}`

type TimeHumanReadable_Hours_Minutes = `${Hours}:${Minutes}`
type TimeHumanReadable_Hours_Minutes_Seconds = `${TimeHumanReadable_Hours_Minutes}:${Seconds}`
type TimeHumanReadable_Hours_Minutes_Seconds_FractionOfSecond =
  `${TimeHumanReadable_Hours_Minutes_Seconds}:${FractionOfSecond}`

type DateTimeHumanReadable_dd_MM_yyyy_HH_mm = `${DateHumanReadable_Day_Month_Year} ${TimeHumanReadable_Hours_Minutes}`

type DateTimeISO_UTCString =
  `${DateHumanReadable_Year_Month_Day}T${TimeHumanReadable_Hours_Minutes_Seconds_FractionOfSecond}Z`

const DATETIME_FORMAT_DEFAULT = 'dd-MM-yyyy HH:mm'
const DATE_FORMAT_REVERSED = 'yyyy-MM-dd'
const DATE_FNS_OPTIONS = { locale: nlLocale }
const INDEX_TO_DUTCH_ABBR = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']

/**
 * Format a ISO 8601 date string to a human-readable version.
 *
 * @param dateTimeString The date to format.
 * @param formatString The format, for options see https://date-fns.org/v2.28.0/docs/format.
 */
function formatISODate(
  dateTimeString: string,
  formatString = DATETIME_FORMAT_DEFAULT
): DateTimeHumanReadable_dd_MM_yyyy_HH_mm {
  const dateTimeISO = dateTimeString as DateTimeISO_UTCString

  return format(parseISO(dateTimeISO), formatString, DATE_FNS_OPTIONS) as DateTimeHumanReadable_dd_MM_yyyy_HH_mm
}

/**
 * Strip seconds from a human-readable time format.
 *
 * @param time - Format: 'HH:mm:ss'
 * @returns time - Format: 'HH:mm'
 */
function stripSecondsFromTime(time: TimeHumanReadable_Hours_Minutes_Seconds): TimeHumanReadable_Hours_Minutes {
  return format(parse(time, 'HH:mm:ss', new Date()), 'HH:mm', DATE_FNS_OPTIONS) as TimeHumanReadable_Hours_Minutes
}

/**
 * Translates a date to a Dutch abbrevation of the day of the week.
 *
 * @param date The date to translate
 * @param format The date format. By default the format 'yyyy-MM-dd' is used.
 *   For more options see https://date-fns.org/v2.28.0/docs/format.
 * @returns 'zo', 'ma', 'di', 'wo', 'do', 'vr' or 'za'
 */
function getDayOfTheWeekInDutch(date: string, format = DATE_FORMAT_REVERSED) {
  const dayIndex = getDay(parse(date, format, new Date()))

  return INDEX_TO_DUTCH_ABBR[dayIndex]
}

export type {
  Year,
  Month,
  Day,
  Hours,
  Minutes,
  Seconds,
  FractionOfSecond,
  DateHumanReadable_Year_Month_Day,
  DateHumanReadable_Day_Month_Year,
  TimeHumanReadable_Hours_Minutes,
  TimeHumanReadable_Hours_Minutes_Seconds,
  TimeHumanReadable_Hours_Minutes_Seconds_FractionOfSecond,
  DateTimeHumanReadable_dd_MM_yyyy_HH_mm,
  DateTimeISO_UTCString,
}
export { formatISODate, stripSecondsFromTime, getDayOfTheWeekInDutch }
