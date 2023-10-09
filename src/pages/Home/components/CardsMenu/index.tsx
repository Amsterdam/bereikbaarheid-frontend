import {
  Card,
  CardContent,
  CardMedia,
  Heading,
  Icon,
  Image,
  Link,
  themeColor,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'
import { getPathTo } from '../../../../routes'
import { generatePath } from 'react-router-dom'
import { CardDataWithPath, cardData } from './data/cards'
import { useMemo } from 'react'
import { ExternalLink } from '@amsterdam/asc-assets'

const CARD_WIDTH_PX = 300

const CardLink = styled(Link)`
  &:hover,
  &:focus {
    img {
      transform: scale(2) rotate(15deg);
    }
  }

  &:focus {
    outline: 2px solid ${themeColor('primary')};
  }
`

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

const StyledImage = styled(Image)`
  transition: transform 500ms ease-out;
`

const CardsMenu = () => {
  const cardDataWithPaths = useMemo<CardDataWithPath[]>(() => {
    return cardData.map(card => {
      const cardWithPath: CardDataWithPath = { title: card.title, path: '' }

      if (card.path) cardWithPath.path = card.path
      if (card.route) cardWithPath.path = generatePath(getPathTo(card.route))
      if (card.target) cardWithPath.target = card.target

      try {
        if (card.image) cardWithPath.image = require(`./images/${card.image}`)
        if (card.imageFallback) {
          cardWithPath.imageFallback = require(`./images/${card.imageFallback}`)
        }
      } catch (error) {
        console.error(
          'Requested image could not be loaded. Does it exist at "./images/"?'
        )
        console.error((error as Error).message)
      }

      return cardWithPath
    })
  }, [])

  return (
    <>
      {cardDataWithPaths.map(card => (
        <CardLink
          key={card.title}
          href={card.path}
          target={card.target}
          tabIndex="0"
        >
          <StyledCard maxWidth={300} backgroundColor="level2" shadow>
            <StyledCardMedia>
              <picture>
                <source srcSet={card.image} type="image/webp" />
                <StyledImage
                  src={card.imageFallback}
                  alt={card.title}
                  width="300"
                  height="200"
                />
              </picture>
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
        </CardLink>
      ))}
    </>
  )
}

export { CARD_WIDTH_PX }
export default CardsMenu
