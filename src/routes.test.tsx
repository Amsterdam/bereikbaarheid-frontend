import { screen } from '@testing-library/react'
import { generatePath } from 'react-router-dom'

import { getPathTo } from './routes'

import { withApp } from '../test/utils/withApp'

describe('routes', () => {
  it('redirects /verbodsborden to the home page', async () => {
    const pathToPage = generatePath(getPathTo('PROHIBITORY_SIGNS_PAGE'))

    withApp(pathToPage)

    expect(
      await screen.findByTestId('prohibitory-signs-page')
    ).toBeInTheDocument()
  })
})
