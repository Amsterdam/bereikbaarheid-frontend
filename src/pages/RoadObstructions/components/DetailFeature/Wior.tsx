import { Dispatch, SetStateAction } from 'react'

import { mapPanelConstants, MapPanelContent } from '@amsterdam/arm-core'
import { DescriptionList, DescriptionListItem, themeSpacing } from '@amsterdam/asc-ui'
import { formatISODate } from 'shared/utils/dateTime'
import styled from 'styled-components'

import { DetailFeature, DetailFeatureWior } from '../../types/detailFeature'

const StyledDescriptionList = styled(DescriptionList)`
  margin-bottom: ${themeSpacing(6)};
`

const ProjectDescription = styled(DescriptionListItem)`
  dd {
    white-space: pre-wrap;
  }
`

interface RoadObstructionsDetailFeatureWiorProps {
  currentOverlay: mapPanelConstants.Overlay
  detailFeature: DetailFeatureWior
  setDetailFeature: Dispatch<SetStateAction<DetailFeature | undefined>>
}

export const RoadObstructionsDetailFeatureWior = ({
  currentOverlay,
  detailFeature,
  setDetailFeature,
}: RoadObstructionsDetailFeatureWiorProps) => {
  return (
    <MapPanelContent
      title={`WIOR ${detailFeature.data.properties.wior_nummer}`}
      data-testid="detail-feature-wior"
      animate
      stackOrder={currentOverlay === mapPanelConstants.Overlay.Results ? 2 : 1}
      onClose={() => {
        setDetailFeature(undefined)
      }}
    >
      <StyledDescriptionList>
        <DescriptionListItem term="Projectnaam">{detailFeature.data.properties.projectnaam}</DescriptionListItem>

        <ProjectDescription term="Beschrijving">{detailFeature.data.properties.beschrijving}</ProjectDescription>

        <DescriptionListItem term="Datum start uitvoering">
          {formatISODate(detailFeature.data.properties.datum_start_uitvoering, 'dd-MM-yyyy')}
        </DescriptionListItem>

        <DescriptionListItem term="Datum einde uitvoering">
          {formatISODate(detailFeature.data.properties.datum_einde_uitvoering, 'dd-MM-yyyy')}
        </DescriptionListItem>

        <DescriptionListItem term="Hoofdstatus">{detailFeature.data.properties.hoofdstatus}</DescriptionListItem>

        {detailFeature.data.properties.type_werkzaamheden && (
          <DescriptionListItem term="Type werkzaamheden">
            {detailFeature.data.properties.type_werkzaamheden}
          </DescriptionListItem>
        )}
      </StyledDescriptionList>
    </MapPanelContent>
  )
}
