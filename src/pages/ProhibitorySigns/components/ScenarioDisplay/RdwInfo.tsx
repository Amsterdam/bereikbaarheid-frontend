import {
  Column,
  CompactThemeProvider,
  Heading,
  Paragraph,
  Row,
  styles,
  themeSpacing,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { EditFiltersButton, FiltersContainer } from './ScenarioDisplayStyle'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { useRdwGeneralInfo } from '../../hooks/useRdwGeneralInfo'

const RdwInfoFiltersContainer = styled(FiltersContainer)`
  > ${styles.RowStyle}.scenario-display-payload {
    margin-bottom: ${themeSpacing(1)};
  }
`

const HeaderRow = styled(Row)`
  margin-top: ${themeSpacing(4)};
`

const TotalWeightRow = styled(Row)`
  ${styles.ColumnStyle} {
    border-top: 1px solid ${props => props.theme.colors.tint?.level6};
    margin-bottom: ${themeSpacing(2)};
    margin-top: ${themeSpacing(1)};
    padding-top: ${themeSpacing(1)};
    position: relative;

    &:after {
      content: '\\002B';
      position: absolute;
      right: -${themeSpacing(4)};
      top: -${themeSpacing(4)};
    }
  }
`

const ScenarioDisplayRdwInfo = () => {
  const { setActiveStepWizard, setShowScenarioWizard, vehicle } =
    useProhibitorySignsPageContext()

  const rdwGeneralInfo = useRdwGeneralInfo()

  const showScenarioWizard = () => {
    setActiveStepWizard(2)
    setShowScenarioWizard(true)
  }

  return (
    <>
      <HeaderRow halign="space-between" hasMargin={false}>
        <Column span={12}>
          <Heading as="h4">Uw invoer, stap 2</Heading>
          <EditFiltersButton variant="textButton" onClick={showScenarioWizard}>
            wijzig
          </EditFiltersButton>
        </Column>
      </HeaderRow>

      <RdwInfoFiltersContainer>
        <CompactThemeProvider>
          <Row halign="space-between" hasMargin={false}>
            <Column span={11}>
              <Paragraph gutterBottom={0}>Rijklaar gewicht</Paragraph>

              <Paragraph gutterBottom={0}>
                {rdwGeneralInfo.data?.[0].derived.curbWeight} kg
              </Paragraph>
            </Column>
          </Row>

          <Row
            className="scenario-display-payload"
            halign="space-between"
            hasMargin={false}
          >
            <Column span={11}>
              <Paragraph gutterBottom={0}>Lading</Paragraph>

              <Paragraph gutterBottom={0}>{vehicle.payload} kg</Paragraph>
            </Column>
          </Row>

          <TotalWeightRow halign="space-between" hasMargin={false}>
            <Column span={11}>
              <Paragraph gutterBottom={0} strong>
                Totaal gewicht
              </Paragraph>

              <Paragraph gutterBottom={0} strong>
                {vehicle.weight} kg
              </Paragraph>
            </Column>
          </TotalWeightRow>

          <Row halign="space-between" hasMargin={false}>
            <Column span={11}>
              <Paragraph gutterBottom={0}>Aslast</Paragraph>

              <Paragraph gutterBottom={0}>{vehicle.axleWeight} kg</Paragraph>
            </Column>
          </Row>

          <Row halign="space-between" hasMargin={false}>
            <Column span={11}>
              <Paragraph gutterBottom={0}>Lengte</Paragraph>

              <Paragraph gutterBottom={0}>{vehicle.length} m</Paragraph>
            </Column>
          </Row>

          <Row halign="space-between" hasMargin={false}>
            <Column span={11}>
              <Paragraph gutterBottom={0}>Breedte</Paragraph>

              <Paragraph gutterBottom={0}>{vehicle.width} m</Paragraph>
            </Column>
          </Row>
        </CompactThemeProvider>
      </RdwInfoFiltersContainer>
    </>
  )
}

export default ScenarioDisplayRdwInfo
