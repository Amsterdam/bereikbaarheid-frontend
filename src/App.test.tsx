import { render, screen } from '@testing-library/react'

import { withAppContext } from '../test/utils/withAppContext'
import App from './App'

test('renders the app correctly', () => {
  render(withAppContext(<App />))

  expect(screen.getByTestId('header')).toBeInTheDocument()
})
