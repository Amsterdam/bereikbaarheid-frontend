import { loadUnloadLink } from '../../LoadUnload/data/dataLinks'

const trafficSignsLink = (url: string) => {
  return {
    beta: true,
    href: url,
    title: 'Verbodsborden',
  }
}

const dataLinks = (url: string) => [loadUnloadLink, trafficSignsLink(url)]

export { loadUnloadLink, trafficSignsLink }
export default dataLinks
