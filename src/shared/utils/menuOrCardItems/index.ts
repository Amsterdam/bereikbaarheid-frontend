import { RouteIds } from 'routes'

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

type MenuOrCardItemWithPathOrRoute = MenuOrCardItemWithPath | MenuOrCardItemWithRoute

const menuOrCardItems: MenuOrCardItemWithPathOrRoute[] = [
  {
    title: '_pageLicencePlate.title',
    titleShort: '_pageLicencePlate.titleShort',
    description: '_pageLicencePlate.description',
    route: 'LICENCE_PLATE_PAGE' as RouteIds,
    image: 'bereikbaarheid-op-kenteken.webp',
    imageFallback: 'bereikbaarheid-op-kenteken.jpg',
  },
  {
    title: '_pageRoadObstructions.title',
    description: '_pageRoadObstructions.description',
    path: 'https://melvin.ndw.nu/public?areas=%5B227,267%5D&sw=52.323170,%204.863541&ne=52.400478,%204.926076',
    target: '_blank',
    image: 'stremmingen.webp',
    imageFallback: 'stremmingen.jpg',
  },
  {
    title: '_pageLoadUnload.title',
    description: '_pageLoadUnload.description',
    route: 'LOAD_UNLOAD_PAGE' as RouteIds,
    image: 'laden-en-lossen.webp',
    imageFallback: 'laden-en-lossen.jpg',
  },
  // {
  //   title: '_linkTouringcar.title',
  //   titleShort: '_linkTouringcar.titleShort',
  //   description: '_linkTouringcar.description',
  //   route: 'TOURINGCAR_PAGE' as RouteIds,
  //   image: 'tour-buzz.webp',
  //   imageFallback: 'tour-buzz.jpg',
  // },
  {
    title: '_linkTouringcar.title',
    titleShort: '_linkTouringcar.titleShort',
    description: '_linkTouringcar.description',
    route: 'TOURINGCAR_PAGE' as RouteIds,
    image: 'tour-buzz.webp',
    imageFallback: 'tour-buzz.jpg',
  },
  {
    title: '_pageData.title',
    description: '_pageData.description',
    route: 'DATA' as RouteIds,
    image: 'json.webp',
    imageFallback: 'json.jpg',
    secondary: true,
  },
  {
    title: '_pageContact.title',
    description: '_pageContact.description',
    route: 'CONTACT' as RouteIds,
    image: 'contact.webp',
    imageFallback: 'contact.jpg',
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
      console.error('Requested image could not be loaded. Does it exist at "./images/"?', error)
    }

    return itemWithPath as MenuOrCardItemWithPath
  })
}

export type { MenuItemObj, MenuOrCardItemWithPathOrRoute, MenuOrCardItemWithPath }
export { menuOrCardItems, mapPathsToMenuOrCardItems }
