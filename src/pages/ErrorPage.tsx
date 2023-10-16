import { useEffect } from 'react'
import { Column, Heading, Paragraph, Row } from '@amsterdam/asc-ui'
import { useRouteError } from 'react-router-dom'
import styled from 'styled-components'
import useAnalytics from '../shared/hooks/useAnalytics'
import Header from '../shared/components/Header'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
`

const StyledColumn = styled(Column)`
  padding-block-start: 1em;
  flex-direction: column;
  align-items: center;
`

const ErrorPage = () => {
  let error = useRouteError()

  if (!error) {
    error = new Response('Not Found', {
      status: 404,
      statusText: 'De pagina kon niet worden gevonden.',
    })
  }

  console.error(error)

  const { trackPageVisit } = useAnalytics()
  useEffect(() => {
    trackPageVisit(error instanceof Response ? `${error.status}` : '404')
  })

  return (
    <>
      <Header title="Er ging iets fout" />

      <Container data-testid="error-page">
        <Row>
          <Column span={12}>
            <Heading as="h1">Helaas</Heading>
          </Column>
        </Row>

        <Row>
          <StyledColumn span={12}>
            {error instanceof Response && error.status === 404 && (
              <Paragraph>
                {error.statusText ?? 'De pagina kon niet worden gevonden.'}
              </Paragraph>
            )}

            {error instanceof Response && error.status && (
              <Paragraph>Status code: {error.status}</Paragraph>
            )}

            {!(error instanceof Response) && (
              <Paragraph>Er ging iets fout.</Paragraph>
            )}
          </StyledColumn>
        </Row>
      </Container>
    </>
  )
}

export default ErrorPage
