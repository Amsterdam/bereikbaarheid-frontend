import { useEffect } from 'react'
import { Column, Heading, Paragraph, Row } from '@amsterdam/asc-ui'
import { useRouteError } from 'react-router-dom'
import styled from 'styled-components'
import useAnalytics from '../shared/hooks/useAnalytics'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
`

const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  const { trackPageVisit } = useAnalytics()
  useEffect(() => {
    trackPageVisit()
  })

  return (
    <Container data-testid="error-page">
      <Row>
        <Column span={12}>
          <Heading as="h1">Helaas</Heading>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          {error instanceof Response && error.status === 404 && (
            <Paragraph>
              {error.statusText ?? 'De pagina kon niet worden gevonden.'}
            </Paragraph>
          )}

          {!(error instanceof Response) && (
            <Paragraph>Er ging iets fout.</Paragraph>
          )}
        </Column>
      </Row>
    </Container>
  )
}

export default ErrorPage
