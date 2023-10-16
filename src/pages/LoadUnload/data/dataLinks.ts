import { getUrl } from 'api/bereikbaarheid/road-sections/load-unload'

const loadUnloadLink = {
  href: 'https://data.amsterdam.nl/datasets/D6rMG5CdGBfp2Q/parkeervakken/',
  title: 'Laad- en losplekken',
}

const roadSectionLink = {
  beta: true,
  href: getUrl(),
  title: 'Wegvakken met venstertijden',
}

const dataLinks = [loadUnloadLink, roadSectionLink]

export { loadUnloadLink, roadSectionLink }
export default dataLinks
