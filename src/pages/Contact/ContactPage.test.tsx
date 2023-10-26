import { withApp } from '../../../test/utils/withApp'
import { RouteIds } from '../../routes'
import { getGeneratedPath } from '../../shared/utils/path'

describe('ContactPage', () => {
  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.CONTACT)
    const page = await withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })
})
