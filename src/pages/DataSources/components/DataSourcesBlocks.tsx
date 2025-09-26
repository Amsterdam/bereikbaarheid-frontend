import { Email } from '@amsterdam/asc-assets'
import { Heading, Icon, Link, List, ListItem, Paragraph, themeSpacing } from '@amsterdam/asc-ui'
import { useTranslation } from 'react-i18next'
import { RouteIds, getPathTo } from '../../../routes'
import { ContentBlock, PretendHeading } from '../../../shared/components/CompactElements'
import { getMailtoLink } from '../../../shared/utils/email'
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
  touringcarLinks?: DataLink[]
}

const URL_ALL_DATA = `https://data.amsterdam.nl/datasets/YLTyzpWP6Vz2QQ/amsterdams-wegenbestand/`

const QUESTION_RECIPIENT = 'b.bussink@amsterdam.nl'
const QUESTION_SUBJECT = `Vraag over data van bereikbaarheid.amsterdam.nl`
const QUESTION_BODY = `Beschrijf zo volledig mogelijk waar je tegenaan loopt:
  - Welke data probeer je te downloaden?
  - Als je een probleem ondervindt, welke melding zie je op het scherm?
  - Heb je een suggestie hoe het anders zou kunnen?
`

const StyledList = styled(List)`
  margin-bottom: ${themeSpacing(0)};
`
const DataSourcesIntro = ({ isCompact = false }: DataSourcesBlockProps & DataSourcesLinksBlockProps) => {
  const { t } = useTranslation()

  return (
    <ContentBlock isCompact={isCompact}>
      <PretendHeading forwardedAs="h2" isCompact={isCompact}>
        {t('_generic._dataSources.dataShownOnMap')}
      </PretendHeading>

      <Paragraph gutterBottom={4}>{t('_generic._dataSources.viewAndDownloadShownDataLinks')}</Paragraph>
    </ContentBlock>
  )
}

const DataSourcesLinks = ({
  dataLinks = [],
  isCompact = false,
}: DataSourcesBlockProps & DataSourcesLinksBlockProps) => {
  const { t } = useTranslation()

  const dataLinksAll: DataLink[] = [...dataLinks]

  return (
    <ContentBlock isCompact={isCompact}>
      <StyledList>
        {dataLinksAll.map((item, index) => {
          return (
            <ListItem key={index}>
              <Link href={item.href} target="_blank" inList>
                {t(item.title)}
              </Link>
              {item.beta && <sup>*</sup>}
            </ListItem>
          )
        })}
      </StyledList>

      {dataLinksAll.find(item => item.beta) && (
        <Paragraph styleAs="small">
          <sup>*</sup>
          {t('_generic._dataSources.betaVersionFormatCanChange')}
        </Paragraph>
      )}
    </ContentBlock>
  )
}

const DataSourcesRoads = () => {
  const { t } = useTranslation()

  return (
    <ContentBlock>
      <PretendHeading as="h2">{t('_generic._dataSources.amsterdamRoadDatabase')}</PretendHeading>
      <Link href={URL_ALL_DATA} target="_blank" inList>
        {t('_generic._dataSources.downloadFullDatasetAndDocs')}
      </Link>{' '}
    </ContentBlock>
  )
}

const DataSourcesQuestions = ({ isCompact = false }: DataSourcesBlockProps) => {
  const { t } = useTranslation()

  return (
    <ContentBlock>
      <PretendHeading as="h2" isCompact={isCompact}>
        {t('_generic._dataSources.questions')}
      </PretendHeading>

      <Paragraph>
        {t('_generic._dataSources.doYouHaveSuggestionsOrQuestions')}{' '}
        <Link
          href={getMailtoLink(QUESTION_RECIPIENT, QUESTION_SUBJECT, QUESTION_BODY)}
          target="_blank"
          variant="inline"
        >
          {t('_generic._dataSources.letUsKnow')}
          <Icon size={18} style={{ margin: '4px 0 0 .25em' }}>
            <Email />
          </Icon>
        </Link>
        .
      </Paragraph>
    </ContentBlock>
  )
}

const DataSourcesAside = ({ dataLinks }: DataSourcesLinksBlockProps) => {
  const { t } = useTranslation()

  return (
    <>
      <DataSourcesLinks dataLinks={dataLinks} isCompact={true} />

      <Link href={getPathTo(RouteIds.DATA)} variant="inline">
        {t('_generic._dataSources.moreAboutUsedApisAndDatasets')}
      </Link>
    </>
  )
}

const DataSourcesBlocks = ({ dataLinks, touringcarLinks }: DataSourcesLinksBlockProps) => {
  const { t } = useTranslation()

  return (
    <>
      <DataSourcesIntro />

      <Heading forwardedAs="h3">{t('appTitle')}</Heading>
      <DataSourcesLinks dataLinks={dataLinks} />

      {touringcarLinks ? (
        <>
          <Heading forwardedAs="h3">{t('_pageTouringcar.title')}</Heading>
          <DataSourcesLinks dataLinks={touringcarLinks} />
        </>
      ) : (
        <></>
      )}

      <DataSourcesRoads />

      <DataSourcesQuestions />
    </>
  )
}

export type { DataLink }
export { DataSourcesIntro, DataSourcesLinks, DataSourcesRoads, DataSourcesQuestions, DataSourcesAside }
export default DataSourcesBlocks
