import { screen } from '@testing-library/react'
import { getGeneratedPath } from 'shared/utils/path'

import { RouteIds } from './routes'

import { withApp } from '../test/utils/withApp'

describe('routes', () => {
  it('redirects /verbodsborden to the /op-kenteken', async () => {
    const pathToPage = getGeneratedPath(RouteIds.PROHIBITORY_SIGNS_PAGE)

    await withApp(pathToPage)

    expect(
      await screen.findByTestId('prohibitory-signs-page')
    ).toBeInTheDocument()
  })
})
