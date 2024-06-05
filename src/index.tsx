import React from 'react'

import ReactDOM from 'react-dom'

import App, { isProd } from './App'
import './i18n'
import { createPiwikInstance } from './shared/hooks/useAnalytics'
import TelemetryProvider from './telemetry-provider'
import { getAppInsights } from './TelemetryService'

createPiwikInstance(isProd)

let appInsights = null
declare global {
  interface Window {
    _env_: any
  }
}

ReactDOM.render(
  <React.StrictMode>
    <TelemetryProvider
      connectionString={window?._env_?.REACT_APP_APPLICATIONINSIGHTS_CONNECTION_STRING}
      after={() => {
        appInsights = getAppInsights
      }}
    >
      <App />
    </TelemetryProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
