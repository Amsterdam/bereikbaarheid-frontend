import { useState } from 'react'
import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'
import { CARD_WIDTH_PX, CardsMenu } from './components/CardsMenu'

import HomeHeader from './components/Header'
import styled from 'styled-components'
import FeedbackModal from '../../shared/components/FeedbackModal'

const GRID_GAP_PX = 32

const StyledMainContent = styled(MainContent)`
  display: grid;
  flex-grow: 0;
  grid-template-columns: repeat(auto-fill, ${CARD_WIDTH_PX}px);
  align-items: center;
  align-self: center;
  justify-content: center;
  padding: ${GRID_GAP_PX}px ${GRID_GAP_PX / 2}px;
  width: 100%;
  // Maximum width is 4 cards including the spacing around them.
  max-width: ${CARD_WIDTH_PX * 4 + GRID_GAP_PX * 4}px;
  gap: ${GRID_GAP_PX}px;
`

const HomePage = () => {
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false)

  return (
    <PageWrapper>
      <HomeHeader
        setOpenFeedbackModal={setOpenFeedbackModal}
        title="Bereikbaarheid"
      />

      <StyledMainContent data-testid="home-page">
        <CardsMenu />
      </StyledMainContent>

      <FeedbackModal setOpen={setOpenFeedbackModal} open={openFeedbackModal} />
    </PageWrapper>
  )
}

export default HomePage
