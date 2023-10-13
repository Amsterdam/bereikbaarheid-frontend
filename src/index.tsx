import React from 'react'
import ReactDOM from 'react-dom'
import { createPiwikInstance } from './shared/hooks/useAnalytics'

import App, { isProd } from './App'

createPiwikInstance(true || isProd)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
