import React from 'react'

import ReactDOM from 'react-dom'

import App, { isProd } from './App'
import { createPiwikInstance } from './shared/hooks/useAnalytics'

import './i18n'

createPiwikInstance(isProd)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
