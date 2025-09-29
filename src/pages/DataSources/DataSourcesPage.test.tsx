import { vi, describe, it, expect } from 'vitest'
import { withApp } from '../../../test/utils/withApp'
import { RouteIds } from '../../routes'
import { getGeneratedPath } from '../../shared/utils/path'

describe('DataSourcesPage', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2023-10-01T10:00:00.000Z'))

  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.DATA)
    const page = await withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })
})
