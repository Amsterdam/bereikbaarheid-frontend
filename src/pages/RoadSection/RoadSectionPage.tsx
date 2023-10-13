import { useEffect } from 'react'

import { Column, Row } from '@amsterdam/asc-ui'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { RoadSectionDetails } from './components/Details'
import { RoadSectionMap } from './components/Map'

import { getRoadSection } from '../../api/bereikbaarheid/road-elements'
import ContentContainer from '../../shared/components/ContentContainer'
import { Header } from '../../shared/components/Header'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import useAnalytics from '../../shared/hooks/useAnalytics'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle'

const StyledColumn = styled(Column)`
  flex-direction: column;
`

const RoadSectionPage = () => {
  const { id: roadSectionId } = useParams()
  useDocumentTitle(`Wegvak ${roadSectionId}`)
  const roadSection = useQuery({
    queryKey: ['roadSection', roadSectionId],
    queryFn: ({ signal }) => getRoadSection(roadSectionId, signal),
    useErrorBoundary: true,
  })

  const { trackPageVisit } = useAnalytics()
  useEffect(trackPageVisit)

  if (roadSection.isLoading) {
    return <LoadingSpinner />
  }

  if (!roadSection.data || roadSection.data.features.length === 0) {
    throw new Response('Not Found', {
      status: 404,
      statusText: 'Wegvak niet gevonden.',
    })
  }

  return (
    <>
      <Header />

      <main data-testid="road-section-page">
        <ContentContainer>
          <Row>
            <StyledColumn span={6}>
              <RoadSectionDetails
                properties={roadSection.data.features[0].properties}
              />
            </StyledColumn>

            <StyledColumn span={6}>
              <RoadSectionMap roadSection={roadSection.data.features[0]} />
            </StyledColumn>
          </Row>
        </ContentContainer>
      </main>
    </>
  )
}

export default RoadSectionPage
