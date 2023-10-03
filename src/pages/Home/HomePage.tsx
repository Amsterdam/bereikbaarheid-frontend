import { useState } from 'react'
import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'
import CardsMenu, { CARD_WIDTH_PX } from './components/CardsMenu'

import HomeHeader from './components/Header'
import styled from 'styled-components'
import FeedbackModal from '../../shared/components/FeedbackModal'

const StyledMainContent = styled(MainContent)`
  display: grid;
  flex-grow: 0;
  grid-template-columns: repeat(auto-fill, ${CARD_WIDTH_PX}px);
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`

const HomePage = () => {
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false)

  return (
    <PageWrapper>
      <HomeHeader setOpenFeedbackModal={setOpenFeedbackModal} title="" />

      <StyledMainContent data-testid="home-page">
        <CardsMenu />
      </StyledMainContent>

      <FeedbackModal setOpen={setOpenFeedbackModal} open={openFeedbackModal} />
    </PageWrapper>
  )
}

export default HomePage
