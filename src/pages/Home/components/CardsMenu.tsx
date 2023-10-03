import {
  Card,
  CardContent,
  CardMedia,
  Heading,
  Image,
  Link,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'
import { getPathTo } from '../../../routes'
import { generatePath } from 'react-router-dom'

const CARD_WIDTH_PX = 300

const StyledCard = styled(Card)`
  width: ${CARD_WIDTH_PX}px;
  aspect-ratio: 3 / 2;
`

const StyledCardMedia = styled(CardMedia)`
  height: 100%;
`

const StyledCardContent = styled(CardContent)`
  min-height: 0;
`

const StyledHeading = styled(Heading)`
  margin: 0;
`

const CardsMenu = () => {
  const cardData = [
    {
      title: 'Verbodsborden',
      path: generatePath(getPathTo('PROHIBITORY_SIGNS_PAGE')),
    },
    {
      title: 'Stremmingen',
      path: generatePath(getPathTo('ROAD_OBSTRUCTIONS_PAGE')),
    },
    {
      title: 'Laden & lossen',
      path: generatePath(getPathTo('LOAD_UNLOAD_PAGE')),
    },
    {
      title: 'Tour Buzz',
      path: 'https://tourbuzz.amsterdam.nl/',
      target: '_blank',
    },
    {
      title: 'FAQ',
      path: generatePath(getPathTo('HOME')),
    },
    {
      title: 'API & data',
      path: generatePath(getPathTo('HOME')),
    },
  ]

  return (
    <>
      {cardData.map(card => (
        <Link
          key={card.title}
          href={card.path}
          target={card.target ?? '_self'}
          variant="blank"
        >
          <StyledCard maxWidth={300} backgroundColor="level2" shadow>
            <StyledCardMedia>
              <Image src="https://picsum.photos/300/200/" alt={card.title} />
            </StyledCardMedia>
            <StyledCardContent>
              <StyledHeading as="h4">{card.title}</StyledHeading>
            </StyledCardContent>
          </StyledCard>
        </Link>
      ))}
    </>
  )
}

export { CARD_WIDTH_PX }
export default CardsMenu
