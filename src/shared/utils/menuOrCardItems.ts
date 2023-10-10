import { RouteIds } from '../../routes'

interface MenuItemData {
  title: string
  titleShort?: string
  description?: string
  route?: RouteIds
  path: string
  target?: string
  secondary?: boolean
}

interface MenuOrCardItemData extends MenuItemData {
  image?: string
  imageFallback?: string
}

const menuOrCardItems: MenuOrCardItemData[] = [
  {
    title: 'Bereikbaarheid op kenteken',
    titleShort: 'Op kenteken',
    route: 'LICENCE_PLATE_PAGE' as RouteIds,
    path: '',
    image: 'bereikbaarheid-op-kenteken.webp',
    imageFallback: 'bereikbaarheid-op-kenteken.jpg',
  },
  {
    title: 'Stremmingen',
    route: 'ROAD_OBSTRUCTIONS_PAGE' as RouteIds,
    path: '',
    image: 'stremmingen.webp',
    imageFallback: 'stremmingen.jpg',
  },
  {
    title: 'Laden en lossen',
    route: 'LOAD_UNLOAD_PAGE' as RouteIds,
    path: '',
    image: 'laden-en-lossen.webp',
    imageFallback: 'laden-en-lossen.jpg',
  },
  {
    title: 'Touringcars (Tour Buzz)',
    titleShort: 'Touringcars',
    path: 'https://tourbuzz.amsterdam.nl/',
    target: '_blank',
    image: 'tour-buzz.webp',
    imageFallback: 'tour-buzz.jpg',
  },
  {
    title: 'Databronnen',
    route: 'DATA' as RouteIds,
    path: '',
    image: 'json.webp',
    imageFallback: 'json.jpg',
    secondary: true,
  },
  {
    title: 'Contact en uitleg',
    route: 'CONTACT' as RouteIds,
    path: '',
    secondary: true,
  },
]

export type { MenuItemData, MenuOrCardItemData }
export { menuOrCardItems }
