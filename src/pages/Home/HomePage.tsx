import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'

import HomeHeader from './components/Header'

const HomePage = () => {
  return (
    <PageWrapper>
      <HomeHeader title="Bereikbaarheid" />

      <MainContent data-testid="home-page"></MainContent>
    </PageWrapper>
  )
}

export default HomePage
