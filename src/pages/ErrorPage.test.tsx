import { screen } from '@testing-library/react'
import { generatePath } from 'react-router-dom'

import { withApp } from '../../test/utils/withApp'

describe('LoadUnloadPage', () => {
  jest.setTimeout(15000)

  test('renders a 404 error page correctly', async () => {
    const pathToPage = generatePath('/does-not-exist')

    withApp(pathToPage)

    expect(
      await screen.findByText('De pagina kon niet worden gevonden.')
    ).toBeInTheDocument()

    expect(await screen.findByText('Status code: 404')).toBeInTheDocument()
  })
})
