import { MenuOrCardItemWithPathOrRoute, mapPathsToMenuOrCardItems } from '.'
import { RouteIds } from '../../../routes'
import { getGeneratedPath } from '../path'

const menuOrCardItems: MenuOrCardItemWithPathOrRoute[] = [
  {
    title: 'Bereikbaarheid op kenteken',
    titleShort: 'Op kenteken',
    route: RouteIds.LICENCE_PLATE_PAGE,
  },
  {
    title: 'Touringcars (Tour Buzz)',
    titleShort: 'Touringcars',
    path: 'https://tourbuzz.amsterdam.nl/',
    target: '_blank',
  },
  {
    title: 'Contact en uitleg',
    route: RouteIds.CONTACT,
    secondary: true,
  },
]

test('give back correct menu or card objects', () => {
  expect(mapPathsToMenuOrCardItems(menuOrCardItems)).toStrictEqual([
    {
      title: 'Op kenteken',
      titleShort: 'Op kenteken',
      path: getGeneratedPath(RouteIds.LICENCE_PLATE_PAGE),
    },
    {
      title: 'Touringcars',
      titleShort: 'Touringcars',
      path: 'https://tourbuzz.amsterdam.nl/',
      target: '_blank',
    },
    {
      title: 'Contact en uitleg',
      path: getGeneratedPath(RouteIds.CONTACT),
      secondary: true,
    },
  ])

  expect(
    mapPathsToMenuOrCardItems(menuOrCardItems, { preferShortTitles: false })
  ).toStrictEqual([
    {
      title: 'Bereikbaarheid op kenteken',
      titleShort: 'Op kenteken',
      path: getGeneratedPath(RouteIds.LICENCE_PLATE_PAGE),
    },
    {
      title: 'Touringcars (Tour Buzz)',
      titleShort: 'Touringcars',
      path: 'https://tourbuzz.amsterdam.nl/',
      target: '_blank',
    },
    {
      title: 'Contact en uitleg',
      path: getGeneratedPath(RouteIds.CONTACT),
      secondary: true,
    },
  ])
})
