import { withApp } from '../../../test/utils/withApp'
import { RouteIds } from '../../routes'
import { getGeneratedPath } from '../../shared/utils/path'

describe('DataSourcesPage', () => {
  jest.setSystemTime(new Date('2023-10-20T10:58:17.683Z'))

  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.DATA)
    const view = await withApp(pathToPage)

    expect(view).toMatchSnapshot()
  })
})
