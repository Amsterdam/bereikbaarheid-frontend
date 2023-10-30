import { generatePath } from 'react-router-dom'
import { RouteIds, getPathTo } from 'routes'

import { withApp } from '../../../test/utils/withApp'

describe('TouringcarPage', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo(RouteIds.TOURINGCAR_PAGE))
    const page = withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })
})
