import config from 'config'
import { Feature, FeatureCollection, Point } from 'geojson'
import { DateHumanReadable_Year_Month_Day } from 'shared/utils/dateTime'

import { api } from '../../bereikbaarheid'

interface TouringcarMessagePart {
  title: string
  body: string
  advice: string
}

interface TouringcarMessage extends Feature {
  geometry: Point
  properties: {
    nl: TouringcarMessagePart
    en: TouringcarMessagePart
    de: TouringcarMessagePart
    es: TouringcarMessagePart
    fr: TouringcarMessagePart
    startdate: DateHumanReadable_Year_Month_Day
    enddate: DateHumanReadable_Year_Month_Day
    category: string | null
    link: string | null
    image_url: string | null
    important: boolean
    is_live: boolean
    omschrijving?: string
    maximaleDoorrijhoogte?: string
  }
}

interface TouringcarMessageCollection extends FeatureCollection {
  features: [] | TouringcarMessage[]
}

interface TouringcarMessagesParams {
  datum?: DateHumanReadable_Year_Month_Day
}

const ENDPOINT = `${config.API_ROOT}/touringcar/berichten`

function getTouringcarMessages(
  params?: TouringcarMessagesParams,
  signal?: AbortSignal
): Promise<TouringcarMessageCollection> {
  return api.get(ENDPOINT, { params, signal }).then(response => response.data)
}

function getUrl(params?: TouringcarMessagesParams) {
  return api.getUri({
    params,
    url: ENDPOINT,
  })
}

export type { TouringcarMessage, TouringcarMessagePart, TouringcarMessageCollection }
export { ENDPOINT, getTouringcarMessages, getUrl }
export default getTouringcarMessages
