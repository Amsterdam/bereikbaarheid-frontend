import { RouteIds } from '../../../../../routes'

interface CardDataBase {
  title: string
  target?: string
  image?: string
  imageFallback?: string
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
    image: 'bereikbaarheid-op-kenteken.webp',
    imageFallback: 'bereikbaarheid-op-kenteken.jpg',
  },
  {
    title: 'Stremmingen',
    route: 'ROAD_OBSTRUCTIONS_PAGE' as RouteIds,
    image: 'stremmingen.webp',
    imageFallback: 'stremmingen.jpg',
  },
  {
    title: 'Laden en lossen',
    route: 'LOAD_UNLOAD_PAGE' as RouteIds,
    image: 'laden-en-lossen.webp',
    imageFallback: 'laden-en-lossen.jpg',
  },
  {
    title: 'Touringcars (Tour Buzz)',
    path: 'https://tourbuzz.amsterdam.nl/',
    target: '_blank',
    image: 'tour-buzz.webp',
    imageFallback: 'tour-buzz.jpg',
  },
  {
    title: 'Databronnen',
    route: 'DATA' as RouteIds,
    image: 'json.webp',
    imageFallback: 'json.jpg',
  },
  {
    title: 'Contact en hulp',
    route: 'CONTACT' as RouteIds,
  },
]

export type { CardDataWithPath }
export { cardData }
