import { isBefore, isMatch, parse } from 'date-fns'
import { z } from 'zod'

import { RoadObstructionMapFilters } from '../../types/roadObstructionMapFilters'

const timeFromIsBeforeTimeTo = (data: RoadObstructionMapFilters) => {
  // ignore this check when no date is selected
  if (!data.date) return true

  let startDateTime = parse(
    `${data.date} ${data.timeFrom}`,
    'yyyy-MM-dd HH:mm',
    new Date()
  )
  let endDateTime = parse(
    `${data.date} ${data.timeTo}`,
    'yyyy-MM-dd HH:mm',
    new Date()
  )

  return isBefore(startDateTime, endDateTime)
}

export const RoadObstructionsFiltersValidationSchema = z
  .object({
    date: z
      .string()
      .length(10, 'Voer een datum in')
      .refine(d => isMatch(d, 'yyyy-MM-dd'), {
        message: 'Voer een datum in met het juiste format',
      }),
    timeFrom: z
      .string()
      .length(5, 'Voer een begintijd in')
      .refine(t => isMatch(t, 'HH:mm'), {
        message: 'Voer een begintijd in met het juiste format',
      }),
    timeTo: z
      .string()
      .length(5, 'Voer een eindtijd in')
      .refine(t => isMatch(t, 'HH:mm'), {
        message: 'Voer een eindtijd in met het juiste format',
      }),
  })
  .refine(formData => timeFromIsBeforeTimeTo(formData), {
    message: 'Voer een begintijd in die eerder is dan de eindtijd.',
    path: ['timeFrom'],
  })
