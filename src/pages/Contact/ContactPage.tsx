import { useEffect } from 'react'

import { Email } from '@amsterdam/asc-assets'
import { Button, Heading, Paragraph, themeSpacing } from '@amsterdam/asc-ui'
import parse from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'
import Header from '../../shared/components/Header'
import useAnalytics from '../../shared/hooks/useAnalytics'
import { getMailtoLink } from '../../shared/utils/email'

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

const FAQs = [
  {
    q: 'Er is een verschil tussen jullie kaart en de situatie op straat, aan welke regels dien ik mij te houden?',
    a: 'De situatie en bebording op straat is altijd leidend, dus volg deze in het geval dat het afwijkt van de digitale kaart.',
  },
  {
    q: 'Waarom vragen jullie een kenteken voor de bereikbaarheidskaart?',
    a: 'Met één kenteken vullen wij voor u alvast bijna 10 kenmerken in, zoals standaardlengte, breedte en aslast. Hierdoor kunnen wij u direct een voertuigspecifiek bereikbaarheidsantwoord geven. U kunt deze gegevens vervolgens zelf nog aanpassen, bijvoorbeeld als u zware lading gaat vervoeren of een aanhanger toevoegt.',
  },
  {
    q: 'Ik krijg niet alle databronnen geopend, waarom niet?',
    a: 'De databronnen zijn heel handig voor professioneel logistieke planners die dit bijvoorbeeld in hun software kunnen laden. Grote kans dat u de benodigde programma’s om deze gegevens te lezen niet op uw apparaat heeft geïnstalleerd. Daarom hebben we de kaart ontwikkeld, die dezelfde gegevens gebruikt en voor iedereen toegankelijk is. Of u nu werkt op een laptop, vaste computer of telefoon.',
  },
  {
    q: 'Hoe houden jullie deze kaart up to date?',
    a: 'Zodra de situatie op straat veranderd, zal dit ook in de kaart moeten worden doorgevoerd. Sommige gegevens gaan bijna automatisch, andere informatie moet (nog) handmatig worden toegevoegd. Wij doen ons best dit zo goed en snel mogelijk te doen.',
  },
  {
    q: 'Deze gegevens staan toch al op Google Maps of Waze, wat voegt deze kaart toe?',
    a: 'Routeplanners zoals Google Maps en Waze bieden algemene routeinformatie. Onze kaart levert specifieke gegevens die zijn afgestemd op uw voertuig en situatie. Daarnaast toont onze bereikbaarheidskaart op basis van kentekeninvoer of en hoe u een ontheffing kunt aanvragen. Ook voor ondernemers of bewoners die gaan verhuizen, bieden wij inzicht in mogelijke laad- en losplekken. Daarnaast gebruiken Google en Waze juist de gegevens die de gemeenten aan deze partijen aanleveren, zoals de stremmingen en milieuzones. Wij leveren dus geen dubbel werk, dit werk doen wij sowieso al als stad. Door voertuigspecifieke informatie te delen hopen wij het voor u makkelijker te kunnen maken om de verkeersregels te volgen en, indien nodig, aan te kunnen geven waar u een ontheffing kunt aanvragen.',
  },
  {
    q: 'Op de kaart staat dat ik een ontheffing moet aanvragen, wat als ik dat niet doe?',
    a: 'Het kan zijn dat u met uw voertuig dan bijvoorbeeld schade toebrengt aan kwetsbare bruggen of kademuren, de bovenkant van een tunnel, of niet met uw voertuig bij uw bestemming kunt komen. Daarnaast loopt u de kans op een boete.',
  },
  {
    q: 'Hoe werkt dat ook alweer met de milieuzone en zero emissiezone in Amsterdam?',
    a: 'Hier vindt u meer informatie over de milieuzones en de gefaseerde invoering van uitstootvrije zones per verschillende voertuigcategorie: <a href="https://www.amsterdam.nl/verkeer-vervoer/milieuzone-amsterdam/#PagCls_17152255" target="_blank">https://www.amsterdam.nl/verkeer-vervoer/milieuzone-amsterdam/#PagCls_17152255</a>',
  },
  {
    q: 'Voor wie is deze website?',
    a: 'Voor iedereen die met een gemotoriseerd voertuig meer informatie wil over bereikbaarheid, specifieke informatie voor touringcarbestuurders, en specifieke informatie rondom laden en lossen.',
  },
  {
    q: 'Ik zie geen laad- en losvakken op de kaart?',
    a: 'Logistieke informatie vindt u op de ʼladen en lossenʼ-kaart. Zonder in te zoomen ziet u de venstertijden voor de straten, zodra u meer inzoomt op de kaart, komen de afzonderlijke laad- en losvakken tevoorschijn als kleine bruine vakjes. Wanneer u op een straat of vakje klikt, ziet u meer informatie over dagen en tijden waarop geladen en gelost kan worden.',
  },
  {
    q: 'Bij de venstertijdenkaart staat er een dag en tijd, maar ik wil een andere dag en tijdstip, hoe pas ik dat aan?',
    a: 'De kaart gebruikt standaard de dag dat u de kaart raadpleegt, met een laad- en lostijd tussen 11.00 en 13.00 uur. Aan de linkerkant van de kaart is het mogelijk om via de tab ‘Invoer’ de datum en tijd aan te passen.',
  },
  {
    q: 'Waarom moet ik een hoogte invoeren, ik voer toch al mijn kenteken in?',
    a: 'Deze gegevens staan niet in de publiek toegankelijke gegevens van het RDW. Daarnaast kan het zijn dat u iets vervoert op het dak van uw voertuig waardoor de hoogte verandert, en er dus andere verkeersborden voor uw situatie van toepassing worden.',
  },
  {
    q: 'Waarom moet ik lengte apart invoeren? Dat is toch bekend bij het RDW?',
    a: 'Het kan zijn dat u een aanhanger toevoegt aan bijvoorbeeld uw personenauto, waardoor er andere verkeersborden voor uw situatie gaan gelden. Deze gegevens zijn belangrijk om de voor u relevante verkeersborden te tonen.',
  },
]

const StyledMainContent = styled(MainContent)`
  align-self: center;
  padding: ${themeSpacing(8)};
  width: 100%;
  max-width: 960px;
`

const ContentBlock = styled.div`
  padding-block-end: ${themeSpacing(8)};
`

function ContactPage() {
  const { t } = useTranslation()

  const { trackPageVisit } = useAnalytics()
  useEffect(trackPageVisit)

  return (
    <PageWrapper>
      <Header title={t('_pageContact.title')} />

      <StyledMainContent>
        <ContentBlock>
          <Heading as="h2">Onjuistheid terugmelden</Heading>

          <Paragraph>We horen graag welke gegevens onjuist zijn of ontbreken.</Paragraph>

          <Button
            as="a"
            variant="primary"
            iconLeft={<Email />}
            href={getMailtoLink(FEEDBACK_RECIPIENT, FEEDBACK_SUBJECT, FEEDBACK_BODY)}
          >
            Onjuistheid terugmelden
          </Button>
        </ContentBlock>

        <ContentBlock>
          <Heading as="h2">Overige vragen</Heading>

          <Paragraph>
            Als iets op deze pagina niet goed werkt, onduidelijk is of vragen oproept, geef het aan ons door.
          </Paragraph>

          <Button
            as="a"
            variant="primary"
            iconLeft={<Email />}
            href={getMailtoLink(QUESTION_RECIPIENT, QUESTION_SUBJECT, QUESTION_BODY)}
          >
            Vraag indienen
          </Button>
        </ContentBlock>

        <Heading as="h2">{t('_pageContact.faq')}</Heading>

        {FAQs.map(faq => (
          <div>
            <Heading as="h4">{faq.q}</Heading>
            <Paragraph>{parse(faq.a)}</Paragraph>
          </div>
        ))}
      </StyledMainContent>
    </PageWrapper>
  )
}

export { QUESTION_RECIPIENT, QUESTION_SUBJECT, QUESTION_BODY }
export default ContactPage
