import { generatePath } from 'react-router'
import { RouteIds, getPathTo } from 'routes'

function getGeneratedPath(
  route: RouteIds,
  params?: Record<string, string> | undefined
) {
  return generatePath(
    `${getPathTo(route)}${
      params
        ? Object.keys(params).reduce((acc, key) => {
            console.log(acc, key)

            return acc ? `${acc}/${key}` : `:${key}`
          }, '')
        : ''
    }`,
    params
  )
}

export { getGeneratedPath }
