import React from 'react'

import ReactDOM from 'react-dom'

import App, { isProd } from './App'
import './i18n'
import { createPiwikInstance } from './shared/hooks/useAnalytics'

createPiwikInstance(isProd)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
