import { generatePath } from 'react-router'
import { RouteIds, getPathTo } from '../../routes'

function getGeneratedPath(route: RouteIds, params?: {} | undefined) {
  return generatePath(getPathTo(route), params)
}

export { getGeneratedPath }
