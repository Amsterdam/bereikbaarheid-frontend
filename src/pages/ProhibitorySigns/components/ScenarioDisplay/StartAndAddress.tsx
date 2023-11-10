import { Column, CompactThemeProvider, Heading, Paragraph, Row } from '@amsterdam/asc-ui'

import { useProhibitorySignsPageContext } from '../../contexts/PageContext'

import { EditFiltersButton, FiltersContainer } from './ScenarioDisplayStyle'

const ScenarioDisplayStartAndAddress = () => {
  const { setActiveStepWizard, address, setShowScenarioWizard, vehicle } = useProhibitorySignsPageContext()
  const showScenarioWizard = () => {
    setActiveStepWizard(0)
    setShowScenarioWizard(true)
  }

  return (
    <>
      <Row halign="space-between" hasMargin={false}>
        <Column span={12}>
          <Heading as="h4">Uw invoer, stap 1</Heading>
          <EditFiltersButton variant="textButton" onClick={showScenarioWizard}>
            wijzig
          </EditFiltersButton>
        </Column>
      </Row>

      <FiltersContainer>
        <CompactThemeProvider>
          <Row halign="flex-start" hasMargin={false}>
            <Column span={4}>
              <Paragraph gutterBottom={0} strong>
                Kenteken
              </Paragraph>
            </Column>
            <Column span={8}>
              <Paragraph gutterBottom={0}>{vehicle.licensePlate}</Paragraph>
            </Column>
          </Row>

          <Row halign="flex-start" hasMargin={false}>
            <Column span={4}>
              <Paragraph gutterBottom={0} strong>
                Hoogte
              </Paragraph>
            </Column>
            <Column span={8}>
              <Paragraph gutterBottom={0}>{vehicle.height} meter</Paragraph>
            </Column>
          </Row>

          {vehicle.hasTrailer && (
            <Row halign="flex-start" hasMargin={false}>
              <Column span={4}>
                <Paragraph gutterBottom={0} strong>
                  Aanhanger
                </Paragraph>
              </Column>
              <Column span={8}>
                <Paragraph gutterBottom={0}>Ja</Paragraph>
              </Column>
            </Row>
          )}

          {address.label && (
            <Row halign="flex-start" hasMargin={false}>
              <Column span={4}>
                <Paragraph gutterBottom={0} strong>
                  Adres
                </Paragraph>
              </Column>
              <Column span={8}>
                <Paragraph gutterBottom={0}>{address.label}</Paragraph>
              </Column>
            </Row>
          )}
        </CompactThemeProvider>
      </FiltersContainer>
    </>
  )
}

export default ScenarioDisplayStartAndAddress
