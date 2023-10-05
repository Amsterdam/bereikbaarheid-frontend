import { RouteIds } from '../../../../../routes'

interface CardDataBase {
  title: string
  target?: string
}

interface CardDataRaw extends CardDataBase {
  route?: RouteIds
  path?: string
}

interface CardDataWithPath extends CardDataBase {
  path: string
}

const cardData: CardDataRaw[] = [
  {
    title: 'Bereikbaarheid op kenteken',
    route: 'LICENCE_PLATE_PAGE' as RouteIds,
  },
  {
    title: 'Stremmingen',
    route: 'ROAD_OBSTRUCTIONS_PAGE' as RouteIds,
  },
  {
    title: 'Laden en lossen',
    route: 'LOAD_UNLOAD_PAGE' as RouteIds,
  },
  {
    title: 'Tour Buzz',
    path: 'https://tourbuzz.amsterdam.nl/',
    target: '_blank',
  },
  {
    title: 'API & data',
    route: 'HOME' as RouteIds,
  },
  {
    title: 'Contact & feedback',
    route: 'CONTACT' as RouteIds,
  },
]

export type { CardDataWithPath }
export { cardData }
