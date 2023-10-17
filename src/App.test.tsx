import { render, screen } from '@testing-library/react'

import App from './App'

import { withAppContext } from '../test/utils/withAppContext'

test('renders the app correctly', () => {
  render(withAppContext(<App />))

  expect(screen.getByTestId('header')).toBeInTheDocument()
})
