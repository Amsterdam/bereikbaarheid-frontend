import { TrafficSignCategoryApi } from 'api/bereikbaarheid/traffic-signs'

export const useTrafficSignCategories = (expertMode = false) => {
  let trafficSignCategories: TrafficSignCategoryApi[] = ['prohibition', 'prohibition with exception']

  if (expertMode) {
    trafficSignCategories.push('prohibition ahead')
  }

  return trafficSignCategories
}
