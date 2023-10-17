import {
  Heading,
  Link,
  List,
  ListItem,
  Paragraph,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { ContentWrapper } from '@amsterdam/asc-ui/lib/components/Alert/AlertStyle'
import { RouteIds, getPathTo } from 'routes'
import { getMailtoLink } from 'shared/utils/email'
import styled from 'styled-components'

interface DataLink {
  beta?: boolean
  href: string
  title: string
}

interface DataSourcesBlockProps {
  isCompact?: boolean
}

interface DataSourcesLinksBlockProps {
  dataLinks?: DataLink[]
}

const URL_ALL_DATA = `https://data.amsterdam.nl/datasets/YLTyzpWP6Vz2QQ/amsterdams-wegenbestand/`

const QUESTION_RECIPIENT = 'b.bussink@amsterdam.nl'
const QUESTION_SUBJECT = `Vraag over data van bereikbaarheid.amsterdam.nl`
const QUESTION_BODY = `Beschrijf zo volledig mogelijk waar je tegenaan loopt:
  - Welke data probeer je te downloaden?
  - Als je een probleem ondervindt, welke melding zie je op het scherm?
  - Heb je een suggestie hoe het anders zou kunnen?
`

const ContentBlock = styled(ContentWrapper)<{ isCompact?: boolean }>`
  padding-block-end: ${themeSpacing(4)};

  ${props =>
    props.isCompact
      ? `&:first-of-type {
        padding-block-start: 1rem;
    }`
      : ''}
`

const PretendHeading = styled(Heading)<{ isCompact?: boolean }>`
  ${props => (props.isCompact ? `font-size: 18px;` : '')}
`

const StyledList = styled(List)`
  margin-bottom: ${themeSpacing(0)};
`

const DataSourcesLinks = ({
  dataLinks = [],
  isCompact = false,
}: DataSourcesBlockProps & DataSourcesLinksBlockProps) => {
  const dataLinksAll: DataLink[] = [...dataLinks]

  return (
    <ContentBlock isCompact={isCompact}>
      <PretendHeading forwardedAs="h2" isCompact={isCompact}>
        Getoonde data op de kaart
      </PretendHeading>

      <Paragraph gutterBottom={4}>
        Bekijk en download de getoonde data op de kaart via de volgende links:
      </Paragraph>

      <StyledList>
        {dataLinksAll.map((item, index) => {
          return (
            <ListItem key={index}>
              <Link href={item.href} target="_blank" inList>
                {item.title}
              </Link>
              {item.beta && <sup>*</sup>}
            </ListItem>
          )
        })}
      </StyledList>

      {dataLinksAll.find(item => item.beta) && (
        <Paragraph styleAs="small">
          <sup>*</sup>Dit is een beta versie. Het format kan nog veranderen.
        </Paragraph>
      )}
    </ContentBlock>
  )
}

const DataSourcesRoads = () => {
  return (
    <ContentBlock>
      <PretendHeading as="h2">Amsterdams Wegenbestand</PretendHeading>

      <Paragraph>
        Op{' '}
        <Link href={URL_ALL_DATA} target="_blank" variant="inline">
          deze pagina
        </Link>{' '}
        kunt u de volledige dataset en de bijbehorende documentatie downloaden.
      </Paragraph>
    </ContentBlock>
  )
}

const DataSourcesQuestions = ({ isCompact = false }: DataSourcesBlockProps) => {
  return (
    <ContentBlock>
      <PretendHeading as="h2" isCompact={isCompact}>
        Vragen?
      </PretendHeading>

      <Paragraph>
        Heeft u suggesties? Of vragen over het format of het gebruik van de
        data?{' '}
        <Link
          href={getMailtoLink(
            QUESTION_RECIPIENT,
            QUESTION_SUBJECT,
            QUESTION_BODY
          )}
          target="_blank"
          variant="inline"
        >
          Laat het ons weten
        </Link>
        .
      </Paragraph>
    </ContentBlock>
  )
}

const DataSourcesAside = ({ dataLinks }: DataSourcesLinksBlockProps) => {
  return (
    <>
      <DataSourcesLinks dataLinks={dataLinks} isCompact={true} />

      <Link href={getPathTo(RouteIds.DATA)} variant="inline">
        Meer over de gebruikte API's en datasets
      </Link>
    </>
  )
}

const DataSourcesBlocks = ({ dataLinks }: DataSourcesLinksBlockProps) => {
  return (
    <>
      <DataSourcesLinks dataLinks={dataLinks} />

      <DataSourcesRoads />

      <DataSourcesQuestions />
    </>
  )
}

export type { DataLink }
export {
  DataSourcesLinks,
  DataSourcesRoads,
  DataSourcesQuestions,
  DataSourcesAside,
}
export default DataSourcesBlocks
