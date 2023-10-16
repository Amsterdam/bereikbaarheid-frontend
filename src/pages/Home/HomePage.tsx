import styled from 'styled-components'

import CardsMenu, { CARD_WIDTH_PX } from './components/CardsMenu'

import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'
import Header from '../../shared/components/Header'

const GRID_GAP_PX = 32

const Grid = styled(MainContent)`
  display: grid;
  flex-grow: 0;
  grid-template-columns: repeat(auto-fill, ${CARD_WIDTH_PX}px);
  align-items: center;
  align-self: center;
  justify-content: center;
  padding: ${GRID_GAP_PX}px ${GRID_GAP_PX / 2}px;
  width: 100%;
  max-width: ${CARD_WIDTH_PX * 4 + GRID_GAP_PX * 4}px;
  gap: ${GRID_GAP_PX}px;
`

function HomePage() {
  return (
    <PageWrapper>
      <Header title="Bereikbaarheid" />

      <Grid data-testid="home-page">
        <CardsMenu />
      </Grid>
    </PageWrapper>
  )
}

export default HomePage
