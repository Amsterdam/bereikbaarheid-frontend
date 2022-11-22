import { Column, Paragraph, Row } from '@amsterdam/asc-ui'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import {
  getRoadSection,
  RoadSectionFeatureCollection,
} from '../../api/bereikbaarheid/road-elements'
import ContentContainer from '../../shared/components/ContentContainer'
import Header from '../../shared/components/Header'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle'

import RoadSectionDetails from './components/Details'
import RoadSectionMap from './components/Map'

const StyledColumn = styled(Column)`
  flex-direction: column;
`

function NoRoadSection(roadSection: RoadSectionFeatureCollection) {
  return roadSection.features.length === 0
}

function displayDetails(roadSection: RoadSectionFeatureCollection) {
  if (NoRoadSection(roadSection)) {
    return <Paragraph>Wegvak niet gevonden.</Paragraph>
  }

  return <RoadSectionDetails properties={roadSection.features[0].properties} />
}

function displayMap(roadSection: RoadSectionFeatureCollection) {
  if (NoRoadSection(roadSection)) return

  return <RoadSectionMap roadSections={roadSection} />
}

const RoadSectionPage = () => {
  const { id: roadSectionId } = useParams()
  useDocumentTitle(`Wegvak ${roadSectionId}`)
  const {
    data: roadSection,
    error,
    isError,
    isLoading,
  } = useQuery('roadSection', ({ signal }) =>
    getRoadSection(roadSectionId, signal)
  )

  return (
    <>
      <Header />

      <main data-testid="road-section-page">
        <ContentContainer>
          <Row>
            <StyledColumn span={6}>
              {isError && error instanceof Error && <div>{error.message}</div>}
              {isLoading && <LoadingSpinner />}
              {roadSection && displayDetails(roadSection)}
            </StyledColumn>

            <StyledColumn span={6}>
              {roadSection && displayMap(roadSection)}
            </StyledColumn>
          </Row>
        </ContentContainer>
      </main>
    </>
  )
}

export default RoadSectionPage
