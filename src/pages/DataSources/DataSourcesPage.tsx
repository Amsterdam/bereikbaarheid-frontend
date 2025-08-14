import { useEffect } from 'react'

import { themeSpacing } from '@amsterdam/asc-ui'
import { useTranslation } from 'react-i18next'
import { MainContent, PageWrapper } from 'shared/components/FullPageSize'
import Header from 'shared/components/Header'
import useAnalytics from 'shared/hooks/useAnalytics'
import styled from 'styled-components'

import loadUnloadLinks from '../LoadUnload/data/dataLinks'
import { trafficSignsLink } from '../ProhibitorySigns/data/dataLinks'
import { DUMMY_VEHICLE } from '../ProhibitorySigns/hooks/useRdwGeneralInfo'
import useUrlTrafficSigns from '../ProhibitorySigns/hooks/useUrlTrafficSigns'
import touringcarLinks from '../Touringcar/data/dataLinks'

import DataSourcesBlocks from './components/DataSourcesBlocks'

const StyledMainContent = styled(MainContent)`
  align-self: center;
  padding: ${themeSpacing(8)};
  width: 100%;
  max-width: 1200px;
`

function DataSourcesPage() {
  const { t } = useTranslation()

  const { urlTrafficSigns } = useUrlTrafficSigns(DUMMY_VEHICLE)

  const dataLinks = [trafficSignsLink(urlTrafficSigns()), ...loadUnloadLinks]

  const { trackPageVisit } = useAnalytics()
  useEffect(() => {
    trackPageVisit()
  }, [trackPageVisit])

  return (
    <PageWrapper>
      <Header title={t('_pageData.title')} />

      <StyledMainContent data-testid="data-page">
        <DataSourcesBlocks dataLinks={dataLinks} touringcarLinks={touringcarLinks} />
      </StyledMainContent>
    </PageWrapper>
  )
}

export default DataSourcesPage
