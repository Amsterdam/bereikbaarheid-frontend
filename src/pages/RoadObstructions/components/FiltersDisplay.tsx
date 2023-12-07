import { Dispatch, SetStateAction } from 'react'

import { MapPanelContent, MapPanelContentProps } from '@amsterdam/arm-core'
import { Button, Column, Heading, Paragraph, Row, Tab, Tabs, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { DataSourcesAside } from '../../DataSources/components/DataSourcesBlocks'
import ProhibitorySignsPageProvider from '../../ProhibitorySigns/contexts/PageProvider'
import dataLinks from '../data/dataLinks'
import { RoadObstructionMapFilters } from '../types/roadObstructionMapFilters'

const FiltersContainer = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  padding: 0.625rem 1.875rem 0.625rem 0.625rem;

  > div:not(:last-child) {
    margin-bottom: ${themeSpacing(2)};
  }
`

const StyledRow = styled(Row)`
  padding: 0;
`

const EditFiltersButton = styled(Button)`
  align-self: stretch;
  margin-bottom: ${themeSpacing(2)};
`

interface FiltersDisplayProps extends MapPanelContentProps {
  dateFormatted: string
  mapFilters: RoadObstructionMapFilters
  setShowMapFiltersForm: Dispatch<SetStateAction<boolean>>
}

const RoadObstructionsFiltersDisplay = ({
  dateFormatted,
  mapFilters,
  setShowMapFiltersForm,
  ...otherProps
}: FiltersDisplayProps) => {
  const { t } = useTranslation()

  function showMapFiltersForm() {
    setShowMapFiltersForm(true)
  }

  return (
    <MapPanelContent {...otherProps}>
      <Tabs label={t('_pageRoadObstructions._mapPanel.label')}>
        <Tab id="input" label={t('_generic._mapPanel.input')}>
          <StyledRow halign="space-between">
            <Column span={12}>
              <Heading as="h3"></Heading>
              <EditFiltersButton variant="textButton" onClick={showMapFiltersForm} style={{ marginTop: 16 }}>
                wijzig
              </EditFiltersButton>
            </Column>
          </StyledRow>

          <FiltersContainer data-testid="map-filters">
            <StyledRow halign="flex-start">
              <Column span={4}>
                <Paragraph gutterBottom={0} strong>
                  Datum
                </Paragraph>
              </Column>
              <Column span={6}>
                <Paragraph gutterBottom={0}>{dateFormatted}</Paragraph>
              </Column>
            </StyledRow>

            <StyledRow halign="flex-start">
              <Column span={4}>
                <Paragraph gutterBottom={0} strong>
                  Van
                </Paragraph>
              </Column>
              <Column span={6}>
                <Paragraph gutterBottom={0}>{mapFilters.timeFrom}</Paragraph>
              </Column>
            </StyledRow>

            <StyledRow halign="flex-start">
              <Column span={4}>
                <Paragraph gutterBottom={0} strong>
                  Tot
                </Paragraph>
              </Column>
              <Column span={6}>
                <Paragraph gutterBottom={0}>{mapFilters.timeTo}</Paragraph>
              </Column>
            </StyledRow>
          </FiltersContainer>
        </Tab>

        <Tab id="data" label={t('_generic._mapPanel.dataSource')}>
          <ProhibitorySignsPageProvider>
            <DataSourcesAside dataLinks={dataLinks(mapFilters)} />
          </ProhibitorySignsPageProvider>
        </Tab>
      </Tabs>
    </MapPanelContent>
  )
}

export default RoadObstructionsFiltersDisplay
