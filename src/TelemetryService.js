import { ReactPlugin } from '@microsoft/applicationinsights-react-js'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

let reactPlugin = null
let appInsights = null

const createTelemetryService = () => {
  const initialize = connectionString => {
    if (!connectionString) {
      throw new Error('Connection string for Application Insights not provided')
    }

    reactPlugin = new ReactPlugin()

    appInsights = new ApplicationInsights({
      config: {
        connectionString: connectionString,
        maxBatchInterval: 0,
        disableFetchTracking: false,
        enableAutoRouteTracking: true,
        extensions: [reactPlugin],
      },
    })

    appInsights.loadAppInsights()
  }

  return { reactPlugin, appInsights, initialize }
}

export const ai = createTelemetryService()
export const getAppInsights = () => appInsights
