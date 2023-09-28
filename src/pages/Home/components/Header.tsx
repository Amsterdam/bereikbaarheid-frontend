import { Header, HeaderProps } from '../../../shared/components/Header'

const HomeHeader = ({ title }: HeaderProps) => {
  return <Header title={title} data-testid="homeHeader" />
}

export default HomeHeader
