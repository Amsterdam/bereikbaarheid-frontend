import {
  Card,
  CardContent,
  CardMedia,
  Heading,
  Icon,
  Image,
  Link,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'
import { getPathTo } from '../../../../routes'
import { generatePath } from 'react-router-dom'
import { CardDataWithPath, cardData } from './data/cards'
import { useMemo } from 'react'
import { ExternalLink } from '@amsterdam/asc-assets'

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
  display: flex;
  gap: 0.75rem;
  margin: 0;

  & > span {
    margin-top: 2px;
  }
`

const CardsMenu = () => {
  const cardDataWithPaths = useMemo<CardDataWithPath[]>(() => {
    return cardData.map(card => {
      const cardWithPath: CardDataWithPath = { title: card.title, path: '' }

      if (card.path) cardWithPath.path = card.path
      if (card.route) cardWithPath.path = generatePath(getPathTo(card.route))
      if (card.target) cardWithPath.target = card.target

      return cardWithPath
    })
  }, [])

  return (
    <>
      {cardDataWithPaths.map(card => (
        <Link
          key={card.title}
          href={card.path}
          target={card.target}
          variant="blank"
        >
          <StyledCard maxWidth={300} backgroundColor="level2" shadow>
            <StyledCardMedia>
              <Image src="https://picsum.photos/300/200/" alt={card.title} />
            </StyledCardMedia>
            <StyledCardContent>
              <StyledHeading as="h4">
                {card.title}
                {card.target === '_blank' ? (
                  <Icon>
                    <ExternalLink />
                  </Icon>
                ) : (
                  <></>
                )}
              </StyledHeading>
            </StyledCardContent>
          </StyledCard>
        </Link>
      ))}
    </>
  )
}

export { CARD_WIDTH_PX, CardsMenu }
