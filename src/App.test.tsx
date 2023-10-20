import { render } from '@testing-library/react'

import App from './App'

import { withAppContext } from '../test/utils/withAppContext'

test('renders the app correctly', () => {
  const view = render(withAppContext(<App />))

  expect(view).toMatchSnapshot()
})
