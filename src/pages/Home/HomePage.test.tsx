import { withApp } from '../../../test/utils/withApp'
import { RouteIds } from '../../routes'
import { getGeneratedPath } from '../../shared/utils/path'

describe('HomePage', () => {
  it('renders correctly', () => {
    const pathToPage = getGeneratedPath(RouteIds.HOME)
    const page = withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })
})
