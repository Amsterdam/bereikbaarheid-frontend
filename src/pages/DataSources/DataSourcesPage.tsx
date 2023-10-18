import { useEffect } from 'react'

import { themeSpacing } from '@amsterdam/asc-ui'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { MainContent, PageWrapper } from 'shared/components/FullPageSize'
import Header from 'shared/components/Header'
import useAnalytics from 'shared/hooks/useAnalytics'
import styled from 'styled-components'

import DataSourcesBlocks from './components/DataSourcesBlocks'

import loadUnloadLinks from '../LoadUnload/data/dataLinks'
import { trafficSignsLink } from '../ProhibitorySigns/data/dataLinks'
import { DUMMY_VEHICLE } from '../ProhibitorySigns/hooks/useRdwGeneralInfo'
import useUrlTrafficSigns from '../ProhibitorySigns/hooks/useUrlTrafficSigns'
import obstructionsLinks from '../RoadObstructions/data/dataLinks'

const INITIAL_DATE = format(new Date(), 'yyyy-MM-dd')

const StyledMainContent = styled(MainContent)`
  align-self: center;
  padding: ${themeSpacing(8)};
  width: 100%;
  max-width: 1200px;
`

const DataSourcesPage = () => {
  const { t } = useTranslation()

  const { urlTrafficSigns } = useUrlTrafficSigns(DUMMY_VEHICLE)

  const dataLinks = [
    trafficSignsLink(urlTrafficSigns()),
    ...obstructionsLinks({
      date: INITIAL_DATE,
      timeFrom: '00:00',
      timeTo: '23:59',
    }),
    ...loadUnloadLinks,
  ]

  const { trackPageVisit } = useAnalytics()
  useEffect(trackPageVisit)

  return (
    <PageWrapper>
      <Header title={t('_pageData.title')} />

      <StyledMainContent data-testid="data-page">
        <DataSourcesBlocks dataLinks={dataLinks} />
      </StyledMainContent>
    </PageWrapper>
  )
}

export default DataSourcesPage
