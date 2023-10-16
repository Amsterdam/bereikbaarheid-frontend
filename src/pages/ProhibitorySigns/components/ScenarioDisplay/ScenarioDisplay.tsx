import { useContext, useEffect, useMemo } from 'react'

import {
  mapPanelConstants,
  MapPanelContent,
  MapPanelContentProps,
  MapPanelContext,
} from '@amsterdam/arm-core'
import { Tab, Tabs } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import ScenarioDisplayRdwInfo from './RdwInfo'
import ScenarioDisplayResult from './Result'
import ScenarioDisplayStartAndAddress from './StartAndAddress'

import {
  DataLink,
  DataSourcesAside,
} from '../../../DataSources/components/DataSourcesBlocks'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import getDataLinks, { loadUnloadLink } from '../../data/dataLinks'
import useUrlTrafficSigns from '../../hooks/useUrlTrafficSigns'

const Spacer = styled.div`
  height: 14px;
`

const ScenarioDisplay = ({ ...otherProps }: MapPanelContentProps) => {
  const { showScenarioWizard, vehicle } = useProhibitorySignsPageContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

  const { urlTrafficSigns } = useUrlTrafficSigns(vehicle)

  const dataLinks = useMemo<DataLink[]>(() => {
    const url = urlTrafficSigns(showScenarioWizard, vehicle)

    if (url) {
      return getDataLinks(url)
    }

    return [loadUnloadLink]
  }, [showScenarioWizard, vehicle, urlTrafficSigns])

  useEffect(() => {
    const mapPanelPosition = !showScenarioWizard
      ? mapPanelConstants.SnapPoint.Halfway
      : mapPanelConstants.SnapPoint.Closed

    setPositionFromSnapPoint(mapPanelPosition)
  }, [setPositionFromSnapPoint, showScenarioWizard])

  return (
    <MapPanelContent data-testid="scenario-display" {...otherProps}>
      {!showScenarioWizard && (
        <Tabs label="Voer voertuiggegevens in of bekijk dataverantwoording">
          <Tab id="input" label="Invoer">
            <Spacer />

            <ScenarioDisplayStartAndAddress />

            <ScenarioDisplayRdwInfo />

            <ScenarioDisplayResult />
          </Tab>

          <Tab id="data" label="Brondata">
            <DataSourcesAside dataLinks={dataLinks} />
          </Tab>
        </Tabs>
      )}
    </MapPanelContent>
  )
}

export default ScenarioDisplay
