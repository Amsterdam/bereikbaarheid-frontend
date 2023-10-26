import { render } from '@testing-library/react'

import { withAppContext } from '../test/utils/withAppContext'

import App from './App'

test('renders the app correctly', () => {
  const view = render(withAppContext(<App />))

  expect(view).toMatchSnapshot()
})
