import {
  Button,
  Column,
  CompactThemeProvider,
  Link,
  Row,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import { getGeneratedPath } from '../../../../shared/utils/path'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import {
  linkToPermitCheck,
  RvvDetailExplanation,
  RvvDetailToggle,
} from '../RvvDetail'

import { PropertiesContainer } from './DetailFeatureStyles'
import ProhibitorySignsDetailFeatureTrafficSignImage from './TrafficSignImage'
import { RouteIds } from '../../../../routes'

const AdditionalInfo = styled.div`
  border: 1px solid ${props => props.theme.colors.tint?.level5};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 60%;
  padding: ${themeSpacing(1)} ${themeSpacing(2)};
  text-align: center;
  word-break: break-word;
`

const AdditionalInfoColumn = styled(Column)`
  word-break: break-word;
`

const windDirectionLabel = (degrees: number | undefined) => {
  if (!degrees) return 'Onbekend'

  let label = ''

  if (degrees <= 45 || degrees > 315) {
    label = 'Noord'
  }

  if (degrees > 45 && degrees <= 135) {
    label = 'Oost'
  }

  if (degrees > 135 && degrees <= 225) {
    label = 'Zuid'
  }

  if (degrees > 225 && degrees <= 315) {
    label = 'West'
  }

  return `${label} (${degrees}°)`
}

const ProhibitorySignsDetailFeatureTrafficSign = () => {
  const { currentTrafficSign } = useProhibitorySignsMapContext()
  const { expertMode } = useProhibitorySignsPageContext()
  const [showRvvDetails, setShowRvvDetails] = useState(false)

  return (
    <>
      <ProhibitorySignsDetailFeatureTrafficSignImage />

      {currentTrafficSign?.properties.additional_info && (
        <AdditionalInfo>
          {currentTrafficSign.properties.additional_info}
        </AdditionalInfo>
      )}

      <PropertiesContainer>
        <CompactThemeProvider>
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Bordnummer</Column>
            <Column span={6}>{currentTrafficSign?.properties.id}</Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Straatnaam</Column>
            <Column span={6}>
              {currentTrafficSign?.properties.street_name}
            </Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Kijkrichting</Column>
            <Column span={6}>
              {windDirectionLabel(
                currentTrafficSign?.properties.view_direction_in_degrees
              )}
            </Column>
          </Row>

          {expertMode && (
            <Row halign="flex-start" hasMargin={false} valign="center">
              <Column span={6}>Link nummer</Column>
              <Column span={6}>
                <Link
                  variant="inline"
                  as={RouterLink}
                  to={getGeneratedPath(RouteIds.ROAD_SECTION_DETAIL_PAGE, {
                    id: String(
                      Math.abs(currentTrafficSign!.properties.network_link_id)
                    ),
                  })}
                >
                  {currentTrafficSign!.properties.network_link_id}
                </Link>
              </Column>
            </Row>
          )}

          {currentTrafficSign?.properties.additional_info && (
            <Row halign="flex-start" hasMargin={false} valign="center">
              <Column span={6}>Onderbord</Column>
              <AdditionalInfoColumn span={6}>
                {currentTrafficSign?.properties.additional_info}
              </AdditionalInfoColumn>
            </Row>
          )}

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Geldigheid</Column>
            <Column span={6}>{currentTrafficSign?.properties.category}</Column>
          </Row>

          {currentTrafficSign?.properties.traffic_decree_id && (
            <Row halign="flex-start" hasMargin={false} valign="center">
              <Column span={6}>Link verkeersbesluit</Column>
              <Column span={6}>
                <Link
                  href={`https://zoek.officielebekendmakingen.nl/${currentTrafficSign?.properties.traffic_decree_id}.html`}
                  target="_blank"
                  variant="inline"
                >
                  {currentTrafficSign?.properties.traffic_decree_id}
                </Link>
              </Column>
            </Row>
          )}

          {expertMode &&
            currentTrafficSign?.properties.link_to_panoramic_image && (
              <Row halign="flex-start" hasMargin={false} valign="center">
                <Column span={6}>Bekijk foto</Column>
                <Column span={6}>
                  <Link
                    href={
                      currentTrafficSign?.properties.link_to_panoramic_image
                    }
                    target="_blank"
                    variant="inline"
                  >
                    panoramabeeld
                  </Link>
                </Column>
              </Row>
            )}

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Bekijk in Google</Column>
            <Column span={6}>
              <Link
                href={`https://www.google.com/maps/place/${currentTrafficSign?.geometry.coordinates[1]}+${currentTrafficSign?.geometry.coordinates[0]}`}
                target="_blank"
                variant="inline"
              >
                Streetview
              </Link>
            </Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>
              <RvvDetailToggle
                showDetails={showRvvDetails}
                setShowDetails={setShowRvvDetails}
                title="RVV-ontheffing"
              />
            </Column>
            <Column span={6}>
              <Button
                onClick={() => window.open(linkToPermitCheck, '_blank')}
                variant="primary"
              >
                RVV aanvragen
              </Button>
            </Column>

            {showRvvDetails && (
              <Column span={12}>
                <RvvDetailExplanation />
              </Column>
            )}
          </Row>
        </CompactThemeProvider>
      </PropertiesContainer>
    </>
  )
}

export default ProhibitorySignsDetailFeatureTrafficSign
