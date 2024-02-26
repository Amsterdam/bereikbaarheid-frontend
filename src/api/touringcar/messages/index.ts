import config from 'config'
import { Feature, FeatureCollection, Point } from 'geojson'
import { DateHumanReadable_Year_Month_Day } from 'shared/utils/dateTime'

import { api } from '../../bereikbaarheid'

interface TouringcarMessage extends Feature {
  geometry: Point
  properties: {
    title: string
    body: string
    advice: string
    title_en: string
    body_en: string
    advice_en: string
    title_fr: string
    body_fr: string
    advice_fr: string
    title_de: string
    body_de: string
    advice_de: string
    title_es: string
    body_es: string
    advice_es: string
    startdate: DateHumanReadable_Year_Month_Day
    enddate: DateHumanReadable_Year_Month_Day
    category: string
    link: string
    image_url: string
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

export type { TouringcarMessage, TouringcarMessageCollection }
export { ENDPOINT, getTouringcarMessages, getUrl }
export default getTouringcarMessages
