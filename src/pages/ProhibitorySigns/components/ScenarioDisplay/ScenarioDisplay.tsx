import { useContext, useEffect, useMemo } from 'react'

import { mapPanelConstants, MapPanelContent, MapPanelContentProps, MapPanelContext } from '@amsterdam/arm-core'
import { Tab, Tabs } from '@amsterdam/asc-ui'
import { DataLink, DataSourcesAside } from 'pages/DataSources/components/DataSourcesBlocks'
import { useProhibitorySignsPageContext } from 'pages/ProhibitorySigns/contexts/PageContext'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import getDataLinks, { loadUnloadLink } from '../../data/dataLinks'
import useUrlTrafficSigns from '../../hooks/useUrlTrafficSigns'

import ScenarioDisplayRdwInfo from './RdwInfo'
import ScenarioDisplayResult from './Result'
import ScenarioDisplayStartAndAddress from './StartAndAddress'

const Spacer = styled.div`
  height: 14px;
`

const ScenarioDisplay = ({ ...otherProps }: MapPanelContentProps) => {
  const { t } = useTranslation()
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
    // @ts-ignore
    <MapPanelContent data-testid="scenario-display" {...otherProps}>
      {!showScenarioWizard && (
        <Tabs label={t('_pageLicencePlate._mapPanel.label')}>
          <Tab id="input" label={t('_generic._mapPanel.input')}>
            <Spacer />

            <ScenarioDisplayStartAndAddress />

            <ScenarioDisplayRdwInfo />

            <ScenarioDisplayResult />
          </Tab>

          <Tab id="data" label={t('_generic._mapPanel.dataSource')}>
            <DataSourcesAside dataLinks={dataLinks} />
          </Tab>
        </Tabs>
      )}
    </MapPanelContent>
  )
}

export default ScenarioDisplay
