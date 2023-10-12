import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'

import { Button, Heading, Paragraph, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import Header from '../../shared/components/Header'

const FEEDBACK_RECIPIENT = 'stadsloket.centrum.vergunningen.dvl@amsterdam.nl'
const FEEDBACK_SUBJECT = 'Terugmelding bereikbaarheid.amsterdam.nl'
const FEEDBACK_BODY = `Beschrijf zo volledig mogelijk van welk onjuist gegeven\
 je een melding wilt maken:
  - Welk gegeven is kennelijk onjuist of ontbreekt?
  - Weet je wat het wel zou moeten zijn?
  - Waarop is jouw constatering gebaseerd? Omschrijf de reden en voeg indien\
   mogelijk relevante documenten in de bijlage toe (bijvoorbeeld: een foto).
`

const QUESTION_RECIPIENT = 'stadsloket.centrum.vergunningen.dvl@amsterdam.nl'
const QUESTION_SUBJECT = `Probleem melden of suggestie voor bereikbaarheid.amsterdam.nl`
const QUESTION_BODY = `Beschrijf zo volledig mogelijk waar je tegenaan loopt:
  - Om welk onderdeel van de pagina gaat het?
  - Wat zie je op het scherm als je een probleem ondervindt?
  - Heb je een suggestie hoe het anders zou kunnen?
`

const getMailtoLink = (recipient: string, subject: string, body: string) =>
  `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`

const StyledMainContent = styled(MainContent)`
  align-self: center;
  padding: ${themeSpacing(8)};
  width: 100%;
  max-width: 1200px;
`

const ContentBlock = styled.div`
  padding-block-end: ${themeSpacing(8)};
`

const ContactPage = () => {
  return (
    <PageWrapper>
      <Header title="Contact en uitleg" />

      <StyledMainContent>
        <ContentBlock>
          <Heading as="h2">Onjuistheid terugmelden</Heading>

          <Paragraph>
            We horen graag welke gegevens onjuist zijn of ontbreken.
          </Paragraph>

          <Button
            as="a"
            variant="primary"
            href={getMailtoLink(
              FEEDBACK_RECIPIENT,
              FEEDBACK_SUBJECT,
              FEEDBACK_BODY
            )}
          >
            Onjuistheid terugmelden
          </Button>
        </ContentBlock>

        <ContentBlock>
          <Heading as="h2">Overige vragen</Heading>

          <Paragraph>
            Als iets op deze pagina niet goed werkt, onduidelijk is of vragen
            oproept, geef het aan ons door.
          </Paragraph>

          <Button
            as="a"
            variant="primary"
            href={getMailtoLink(
              QUESTION_RECIPIENT,
              QUESTION_SUBJECT,
              QUESTION_BODY
            )}
          >
            Vraag indienen
          </Button>
        </ContentBlock>
      </StyledMainContent>
    </PageWrapper>
  )
}

export default ContactPage
