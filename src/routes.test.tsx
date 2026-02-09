import { screen } from '@testing-library/react'
import { getGeneratedPath } from './shared/utils/path'

import { withApp } from '../test/utils/withApp'

import { RouteIds } from './routes'

describe('routes', { timeout: 30000 }, () => {
  it('redirects /verbodsborden to the /op-kenteken', async () => {
    const pathToPage = getGeneratedPath(RouteIds.PROHIBITORY_SIGNS_PAGE)

    withApp(pathToPage)

    expect(await screen.findByTestId('prohibitory-signs-page')).toBeInTheDocument()
  })
})
