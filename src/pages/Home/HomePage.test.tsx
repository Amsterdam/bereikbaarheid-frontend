import { withApp } from '../../../test/utils/withApp'
import { RouteIds } from '../../routes'
import { getGeneratedPath } from '../../shared/utils/path'

describe('HomePage', () => {
  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.HOME)
    const page = await withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })
})
