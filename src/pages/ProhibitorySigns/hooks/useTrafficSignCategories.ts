import { TrafficSignCategoryApi } from '../../../api/bereikbaarheid/traffic-signs'

import { useProhibitorySignsPageContext } from '../contexts/PageContext'

export const useTrafficSignCategories = () => {
  const { expertMode } = useProhibitorySignsPageContext()

  let trafficSignCategories: TrafficSignCategoryApi[] = [
    'prohibition',
    'prohibition with exception',
  ]

  if (expertMode) {
    trafficSignCategories.push('prohibition ahead')
  }

  return trafficSignCategories
}
