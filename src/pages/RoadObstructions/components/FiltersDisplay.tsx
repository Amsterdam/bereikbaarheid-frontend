import { MapPanelContent, MapPanelContentProps } from '@amsterdam/arm-core'
import {
  Button,
  Column,
  Heading,
  Paragraph,
  Row,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

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
  function showMapFiltersForm() {
    setShowMapFiltersForm(true)
  }

  return (
    <MapPanelContent {...otherProps}>
      <StyledRow halign="space-between">
        <Column span={12}>
          <Heading as="h3">Filters</Heading>
          <EditFiltersButton variant="textButton" onClick={showMapFiltersForm}>
            wijzig
          </EditFiltersButton>
        </Column>
      </StyledRow>

      <FiltersContainer>
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
    </MapPanelContent>
  )
}

export default RoadObstructionsFiltersDisplay
