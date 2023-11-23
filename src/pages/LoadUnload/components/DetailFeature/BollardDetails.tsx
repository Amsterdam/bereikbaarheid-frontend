import { Column, CompactThemeProvider, Row } from '@amsterdam/asc-ui'
import { Bollard } from 'api/bereikbaarheid/bollards'
import useLoadUnloadMapContext from 'pages/LoadUnload/contexts/MapContext'
import { PropertiesContainer } from 'shared/components/DetailFeature/DetailFeatureStyles'
import styled from 'styled-components'

const PropContainer = styled(PropertiesContainer)`
  margin-top: 0;
`

function BollardDetails({ bollard }: { bollard: Bollard }) {
  const { setCurrentBollard } = useLoadUnloadMapContext()

  if (!bollard?.properties) {
    setCurrentBollard(undefined)
    return <></>
  }

  return (
    <PropContainer data-testid="detail-feature-road-section">
      <CompactThemeProvider>
        {bollard.properties.id && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>ID</Column>
            <Column span={6}>{bollard.properties.id}</Column>
          </Row>
        )}

        {bollard.properties.type && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Type</Column>
            <Column span={6}>{bollard.properties.type}</Column>
          </Row>
        )}

        {bollard.properties.location && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Locatie</Column>
            <Column span={6}>{bollard.properties.location}</Column>
          </Row>
        )}

        {bollard.properties.days && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Dagen</Column>
            <Column span={6}>
              {bollard.properties.days.reduce((acc, cur) => {
                if (!acc) return cur
                return `${acc}, ${cur}`
              }, '')}
            </Column>
          </Row>
        )}

        {bollard.properties.window_times && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Venstertijden</Column>
            <Column span={6}>{bollard.properties.window_times}</Column>
          </Row>
        )}

        {bollard.properties.entry_system && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Toegangssysteem</Column>
            <Column span={6}>{bollard.properties.entry_system}</Column>
          </Row>
        )}

        {bollard.properties.details && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Details</Column>
            <Column span={6}>{bollard.properties.details}</Column>
          </Row>
        )}
      </CompactThemeProvider>
    </PropContainer>
  )
}

export default BollardDetails
