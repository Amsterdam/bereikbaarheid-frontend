import { RouteIds } from '../../../routes'
import { getGeneratedPath } from '../path'

interface MenuItemObj {
  title: string
  titleShort?: string
  description?: string
  route?: RouteIds
  path?: string
  target?: string
  secondary?: boolean
}

interface MenuOrCardItem extends MenuItemObj {
  image?: string
  imageFallback?: string
}

interface MenuOrCardItemWithPath extends MenuOrCardItem {
  path: string
}

interface MenuOrCardItemWithRoute extends MenuOrCardItem {
  route: RouteIds
}

type MenuOrCardItemWithPathOrRoute =
  | MenuOrCardItemWithPath
  | MenuOrCardItemWithRoute

const menuOrCardItems: MenuOrCardItemWithPathOrRoute[] = [
  {
    title: 'Bereikbaarheid op kenteken',
    titleShort: 'Op kenteken',
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
    titleShort: 'Touringcars',
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
    secondary: true,
  },
  {
    title: 'Contact en uitleg',
    route: 'CONTACT' as RouteIds,
    secondary: true,
  },
]

function mapPathsToMenuOrCardItems(
  items: MenuOrCardItemWithPathOrRoute[],
  options = { preferShortTitles: true }
): MenuOrCardItemWithPath[] {
  return items.map(item => {
    const itemWithPath: MenuOrCardItemWithPathOrRoute = { ...item }

    if (options.preferShortTitles) {
      itemWithPath.title = item.titleShort ?? item.title
    }

    if (!itemWithPath.path && item.route) {
      itemWithPath.path = getGeneratedPath(item.route)
      delete itemWithPath.route
    }

    if (!itemWithPath.path) {
      throw new Error('Menu items should have a path')
    }

    try {
      if (item.image) {
        itemWithPath.image = require(`./images/${item.image}`)
      }
      if (item.imageFallback) {
        itemWithPath.imageFallback = require(`./images/${item.imageFallback}`)
      }
    } catch (error) {
      console.error(
        'Requested image could not be loaded. Does it exist at "./images/"?',
        error
      )
    }

    return itemWithPath as MenuOrCardItemWithPath
  })
}

export type {
  MenuItemObj,
  MenuOrCardItemWithPathOrRoute,
  MenuOrCardItemWithPath,
}
export { menuOrCardItems, mapPathsToMenuOrCardItems }
