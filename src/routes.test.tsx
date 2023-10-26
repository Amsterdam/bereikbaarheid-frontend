import { screen } from '@testing-library/react'
import { generatePath } from 'react-router-dom'

import { withApp } from '../test/utils/withApp'

import { getPathTo } from './routes'

describe('routes', () => {
  it('redirects /verbodsborden to the /op-kenteken', async () => {
    const pathToPage = generatePath(getPathTo('PROHIBITORY_SIGNS_PAGE'))

    withApp(pathToPage)

    expect(
      await screen.findByTestId('prohibitory-signs-page')
    ).toBeInTheDocument()
  })
})
