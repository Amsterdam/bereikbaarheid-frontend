import { vi, describe, it, expect } from 'vitest'
import { RouteIds } from '../../../../routes'
import { getGeneratedPath } from '../../../../shared/utils/path'

import { withApp } from '../../../../../test/utils/withApp'

describe('Touringcar Messages', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2024-03-12T10:00:00.000Z'))

  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.TOURINGCAR_PAGE)
    const page = withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })
})
