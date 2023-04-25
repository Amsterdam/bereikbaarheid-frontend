import { mapPanelConstants, MapPanelContent } from '@amsterdam/arm-core'
import {
  Card,
  CardContent,
  DescriptionList,
  DescriptionListItem,
  Heading,
  Link,
  Paragraph,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { Dispatch, SetStateAction } from 'react'
import { generatePath, Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { getPathTo } from '../../../../routes'
import { formatISODate } from '../../../../shared/utils/formatDate'

import {
  DetailFeature,
  DetailFeatureRoadSection,
} from '../../types/detailFeature'
import { RoadObstruction } from '../../../../api/bereikbaarheid/road-obstructions'

function formatActivity(item: RoadObstruction) {
  if (!item.url) {
    return item['activity']
  }

  return (
    <Link variant="inline" href={item.url} target="_blank">
      {item['activity']}
    </Link>
  )
}

const StyledDescriptionList = styled(DescriptionList)`
  margin-bottom: ${themeSpacing(6)};
`

const StyledCard = styled(Card)`
  margin-top: ${themeSpacing(4)};
`

interface RoadSectionInfoProps {
  currentOverlay: mapPanelConstants.Overlay
  detailFeature: DetailFeatureRoadSection
  setDetailFeature: Dispatch<SetStateAction<DetailFeature | undefined>>
}

const RoadSectionInfo = ({
  currentOverlay,
  detailFeature,
  setDetailFeature,
}: RoadSectionInfoProps) => {
  return (
    <MapPanelContent
      title={`Wegvak ${detailFeature.data.properties.road_element_id}`}
      data-testid="detail-feature-road-section"
      animate
      stackOrder={currentOverlay === mapPanelConstants.Overlay.Results ? 2 : 1}
      onClose={() => {
        setDetailFeature(undefined)
      }}
    >
      <StyledDescriptionList>
        <DescriptionListItem term="Straatnaam">
          {detailFeature.data.properties['road_element_street_name']}
        </DescriptionListItem>

        <Link
          variant="inline"
          as={RouterLink}
          to={generatePath(getPathTo('ROAD_SECTION_DETAIL_PAGE'), {
            id: String(detailFeature.data.properties.road_element_id),
          })}
        >
          Meer informatie
        </Link>
      </StyledDescriptionList>

      <Heading as="h2">Stremmingen</Heading>

      {detailFeature.data.properties['obstructions'].length > 0 ? (
        detailFeature.data.properties['obstructions'].map((item, index) => {
          return (
            <StyledCard backgroundColor="level2" key={index}>
              <CardContent>
                <Paragraph strong>{formatActivity(item)}</Paragraph>
                {item.reference && <Paragraph>{item.reference}</Paragraph>}
                <Paragraph>
                  van {formatISODate(item['start_date'])} tot{' '}
                  {formatISODate(item['end_date'])}
                </Paragraph>
              </CardContent>
            </StyledCard>
          )
        })
      ) : (
        <Paragraph>
          Klik op het nabij gelegen donker gekleurde wegvak voor meer
          informatie.
        </Paragraph>
      )}
    </MapPanelContent>
  )
}

export default RoadSectionInfo
