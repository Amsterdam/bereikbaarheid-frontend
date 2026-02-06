import { afterEach, beforeEach, vi, describe, it, expect } from 'vitest'
import { RouteIds } from '../../routes'
import { getGeneratedPath } from '../../shared/utils/path'

import { withApp } from '../../../test/utils/withApp'

describe('TouringcarPage', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useRealTimers()
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date('2023-10-01T10:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly', () => {
    const pathToPage = getGeneratedPath(RouteIds.TOURINGCAR_PAGE)
    const page = withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })
})
