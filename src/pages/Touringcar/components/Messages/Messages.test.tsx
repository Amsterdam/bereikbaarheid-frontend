import { RouteIds } from 'routes'
import { getGeneratedPath } from 'shared/utils/path'

import { withApp } from '../../../../../test/utils/withApp'

describe('Touringcar Messages', () => {
  jest.useFakeTimers({ legacyFakeTimers: false })
  jest.setSystemTime(new Date('2024-02-01T10:00:00.000Z'))

  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.TOURINGCAR_PAGE)
    const page = withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })
})
