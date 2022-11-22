import { format, parseISO } from 'date-fns'

const defaultFormat = 'dd-MM-yyyy HH:mm'

/**
 * Format a ISO 8601 date string to a human-readable version.
 *
 * @param date The date to format.
 * @param formatString The format, for options see https://date-fns.org/v2.28.0/docs/format.
 */
export function formatISODate(date: string, formatString = defaultFormat) {
  return format(parseISO(date), formatString)
}
