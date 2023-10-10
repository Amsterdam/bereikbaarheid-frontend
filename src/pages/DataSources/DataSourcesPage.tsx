import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'

import DataSourcesBlocks from './components/DataSourcesBlocks'
import styled from 'styled-components'
import { themeSpacing } from '@amsterdam/asc-ui'
import { format } from 'date-fns'
import useUrlTrafficSigns from '../ProhibitorySigns/hooks/useUrlTrafficSigns'
import { DUMMY_VEHICLE } from '../ProhibitorySigns/hooks/useRdwGeneralInfo'
import loadUnloadLinks from '../LoadUnload/data/dataLinks'
import { trafficSignsLink } from '../ProhibitorySigns/data/dataLinks'
import obstructionsLinks from '../RoadObstructions/data/dataLinks'
import { Header } from '../../shared/components/Header'

const INITIAL_DATE = format(new Date(), 'yyyy-MM-dd')

const StyledMainContent = styled(MainContent)`
  align-self: center;
  padding: ${themeSpacing(8)};
  width: 100%;
  max-width: 1200px;
`

const DataSourcesPage = () => {
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

  return (
    <PageWrapper>
      <Header title="Databronnen" />

      <StyledMainContent data-testid="data-page">
        <DataSourcesBlocks dataLinks={dataLinks} />
      </StyledMainContent>
    </PageWrapper>
  )
}

export default DataSourcesPage
