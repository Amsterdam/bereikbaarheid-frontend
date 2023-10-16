import { getUrl } from '../../../api/bereikbaarheid/road-obstructions'
import { RoadObstructionMapFilters } from '../types/roadObstructionMapFilters'

const obstructionsLink = (mapFilters: RoadObstructionMapFilters) => {
  return {
    beta: true,
    href: getUrl(mapFilters),
    title: 'Stremmingen',
  }
}

const wiorLink = {
  href: 'https://data.amsterdam.nl/datasets/1KYHXE2VnNZPvA/werkzaamheden-in-de-openbare-ruimte-wior/',
  title: 'Werkzaamheden in de Openbare Ruimte (WIOR)',
}

const dataLinks = (mapFilters: RoadObstructionMapFilters) => [
  obstructionsLink(mapFilters),
  wiorLink,
]

export { obstructionsLink, wiorLink }
export default dataLinks
