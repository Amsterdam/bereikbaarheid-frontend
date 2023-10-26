import { useState } from 'react'

import {
  Column,
  CompactThemeProvider,
  Heading,
  Link,
  Paragraph,
  Row,
  themeSpacing,
} from '@amsterdam/asc-ui'
import LoadingSpinner from 'shared/components/LoadingSpinner'
import { ReactComponent as DistanceToDestinationIcon } from 'shared/icons/bootstrap-icon-flag-fill.svg'
import styled from 'styled-components'

import { usePermitsByLocation } from '../../hooks/usePermitsByLocation'
import { RvvDetailExplanation, RvvDetailToggle } from '../RvvDetail'

import ScenarioDisplayResultIntro from './ResultIntro'
import ScenarioDisplayResultPermitHeavyGoodsVehicleZone from './ResultPermitHeavyGoodsVehicleZone'
import ScenarioDisplayResultPermitLowEmissionZone from './ResultPermitLowEmissionZone'
import ScenarioDisplayResultPermitRVV from './ResultPermitRVV'
import { FiltersContainer } from './ScenarioDisplayStyle'

const HeaderRow = styled(Row)`
  margin-top: ${themeSpacing(4)};
`

const PermitInfoHeader = styled(Paragraph)<{
  $permitLocationData?: boolean
}>`
  margin-top: ${props => (props.$permitLocationData ? themeSpacing(2) : 0)};
`

const DistanceToDestination = styled(Paragraph)`
  font-size: 14px;
  margin-top: ${themeSpacing(3)};
`

const StyledDistanceToDestinationIcon = styled(DistanceToDestinationIcon)`
  position: relative;
  top: 1px;
`

const ScenarioDisplayResult = () => {
  const permitsByLocation = usePermitsByLocation()
  const [showRvvDetails, setShowRvvDetails] = useState(false)

  if (permitsByLocation.isInitialLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <HeaderRow halign="space-between" hasMargin={false}>
        <Column span={12}>
          <Heading as="h4">Resultaat</Heading>
        </Column>
      </HeaderRow>

      <FiltersContainer>
        <CompactThemeProvider>
          <Row halign="flex-start" hasMargin={false}>
            <Column span={12}>
              <ScenarioDisplayResultIntro />
            </Column>
          </Row>

          {permitsByLocation.data?.data && (
            <Row halign="flex-start" hasMargin={false} valign="center">
              <Column span={6}>
                <Link
                  href="https://www.amsterdam.nl/parkeren-verkeer/zone-zwaar-verkeer-amsterdam/soorten-ontheffingen-zwaar-verkeer/#h157f1a10-4dee-4571-8982-95766af6ae79"
                  target="_blank"
                  variant="inline"
                >
                  Breed opgezette weg
                </Link>
              </Column>

              <Column span={6}>
                <Paragraph gutterBottom={0}>
                  {!permitsByLocation.data.data.attributes.wide_road
                    ? 'nee'
                    : 'ja'}
                </Paragraph>
              </Column>
            </Row>
          )}

          {permitsByLocation.data?.data && (
            <Row halign="flex-start" hasMargin={false} valign="center">
              <Column span={6}>
                <Link
                  href="https://www.amsterdam.nl/veelgevraagd/?caseid=%7B839DEE65-CD24-4567-84A5-8DF665BC6384%7D"
                  target="_blank"
                  variant="inline"
                >
                  Laad- en lostijden
                </Link>
              </Column>

              <Column span={6}>
                <Paragraph gutterBottom={0}>
                  {permitsByLocation.data.data.attributes.time_window ??
                    'niet van toepassing'}
                </Paragraph>
              </Column>
            </Row>
          )}

          <Row halign="flex-start" hasMargin={false}>
            <Column span={12}>
              <PermitInfoHeader
                gutterBottom={0}
                strong
                $permitLocationData={Boolean(permitsByLocation.data?.data)}
              >
                Ontheffingen
              </PermitInfoHeader>
            </Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>
              <Link
                href="https://www.amsterdam.nl/parkeren-verkeer/milieuzone-amsterdam/aanscherping-milieuzones/"
                target="_blank"
                variant="inline"
              >
                Milieuzone
              </Link>
            </Column>

            <Column span={6}>
              <ScenarioDisplayResultPermitLowEmissionZone />
            </Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>
              <Link
                href="https://www.amsterdam.nl/parkeren-verkeer/zone-zwaar-verkeer-amsterdam/nieuw-beleid-zwaar-verkeer/"
                target="_blank"
                variant="inline"
              >
                Zone zwaar verkeer
              </Link>
            </Column>

            <Column span={6}>
              <ScenarioDisplayResultPermitHeavyGoodsVehicleZone />
            </Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>
              <RvvDetailToggle
                showDetails={showRvvDetails}
                setShowDetails={setShowRvvDetails}
                title="RVV"
              />
            </Column>

            <Column span={6}>
              <ScenarioDisplayResultPermitRVV />
            </Column>

            {showRvvDetails && (
              <Column span={12}>
                <RvvDetailExplanation />
              </Column>
            )}
          </Row>

          {permitsByLocation.data?.data &&
            permitsByLocation.data?.data.attributes
              .distance_to_destination_in_m && (
              <Row halign="flex-start" hasMargin={false}>
                <Column span={12}>
                  <DistanceToDestination gutterBottom={0}>
                    Let op: afstand tussen adres en dichtsbijzijnde weg{' '}
                    <StyledDistanceToDestinationIcon
                      role="img"
                      title="Een vlaggetje. Hiermee is de dichtsbijzijnde weg gemarkeerd op de kaart."
                    />{' '}
                    is{' '}
                    <span style={{ whiteSpace: 'nowrap' }}>
                      {
                        permitsByLocation.data?.data.attributes
                          .distance_to_destination_in_m
                      }{' '}
                      meter
                    </span>
                    . Controleer of u met dit advies uw bestemming kan bereiken.
                  </DistanceToDestination>
                </Column>
              </Row>
            )}
        </CompactThemeProvider>
      </FiltersContainer>
    </>
  )
}

export default ScenarioDisplayResult
