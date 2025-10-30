import { Column, Heading, Paragraph, Row } from '@amsterdam/asc-ui'
import { useTranslation } from 'react-i18next'
import { useRouteError } from 'react-router-dom'
import Header from '../shared/components/Header'
import styled from 'styled-components'

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
  const { t } = useTranslation()

  let error = useRouteError()

  if (!error) {
    error = new Response('Not Found', {
      status: 404,
      statusText: t('_error.pageCouldNotBeFound'),
    })
  }

  return (
    <>
      <Header title={t('_error.somethingWentWrong')} />

      <Container data-testid="error-page">
        <Row>
          <Column span={12}>
            <Heading as="h1">{t('_error.unfortunately')}</Heading>
          </Column>
        </Row>

        <Row>
          <StyledColumn span={12}>
            {error instanceof Response && error.status === 404 && (
              <Paragraph>{error.statusText ?? t('_error.pageCouldNotBeFound')}</Paragraph>
            )}

            {error instanceof Response && error.status && <Paragraph>Status code: {error.status}</Paragraph>}

            {!(error instanceof Response) && <Paragraph>{t('_error.somethingWentWrong')}.</Paragraph>}
          </StyledColumn>
        </Row>
      </Container>
    </>
  )
}

export default ErrorPage
