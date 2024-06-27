import React, { Component } from 'react'

import { withAITracking } from '@microsoft/applicationinsights-react-js'

import { ai } from './TelemetryService'

interface Props {
  children: React.ReactNode
  after: () => void
  connectionString: string
}

interface State {
  initialized: boolean
}

class TelemetryProvider extends Component<Props, State> {
  state: State = {
    initialized: false,
  }

  componentDidMount() {
    const { initialized } = this.state
    const AppInsightsConnectionString = this.props.connectionString

    if (!initialized && AppInsightsConnectionString) {
      ai.initialize(AppInsightsConnectionString)
      this.setState({ initialized: true })
    }

    this.props.after()
  }

  render() {
    const { children } = this.props
    return <>{children}</>
  }
}

export default withAITracking(ai.reactPlugin, TelemetryProvider)
