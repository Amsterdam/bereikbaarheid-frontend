import {
  mapPanelConstants,
  MapPanelContent,
  MapPanelContentProps,
  MapPanelContext,
} from '@amsterdam/arm-core'
import { useContext, useEffect } from 'react'

import { useProhibitorySignsPageContext } from '../../contexts/PageContext'

import ScenarioDisplayRdwInfo from './RdwInfo'
import ScenarioDisplayResult from './Result'
import ScenarioDisplayStartAndAddress from './StartAndAddress'

const ScenarioDisplay = ({ ...otherProps }: MapPanelContentProps) => {
  const { showScenarioWizard } = useProhibitorySignsPageContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

  useEffect(() => {
    const mapPanelPosition = !showScenarioWizard
      ? mapPanelConstants.SnapPoint.Halfway
      : mapPanelConstants.SnapPoint.Closed

    setPositionFromSnapPoint(mapPanelPosition)
  }, [setPositionFromSnapPoint, showScenarioWizard])

  return (
    <MapPanelContent {...otherProps}>
      {/* only display scenario outcome when needed info is available
          for hooks embedded in included components */}
      {!showScenarioWizard && (
        <>
          <ScenarioDisplayStartAndAddress />

          <ScenarioDisplayRdwInfo />

          <ScenarioDisplayResult />
        </>
      )}
    </MapPanelContent>
  )
}

export default ScenarioDisplay
