import { useMemo } from 'react'
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
import { ExternalLink } from '@amsterdam/asc-assets'
import styled from 'styled-components'
import {
  MenuOrCardItemData as CardItemData,
  menuOrCardItems as cardItems,
} from '../../../../shared/utils/menuOrCardItems'
import { getGeneratedPath } from '../../../../shared/utils/path'

const CARD_WIDTH_PX = 300

const CardLink = styled(Link)`
  padding: 0;

  &:hover,
  &:focus {
    color: ${themeColor('secondary')};

    & > div {
      box-shadow: none;
    }

    img {
      transform: scale(2) rotate(15deg);
    }
  }

  &:focus {
    outline: 1px solid ${themeColor('secondary')};
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

function CardsMenu() {
  const cardItemsWithPaths = useMemo<CardItemData[]>(() => {
    return cardItems.map(card => {
      const cardWithPath: CardItemData = {
        title: card.title,
        description:
          card.description ??
          'In irure do consequat eiusmod eiusmod incididunt velit quis sint officia enim duis. Velit sunt veniam cillum culpa deserunt sit occaecat cillum enim consequat ea sit sunt.',
        path: card.path ?? '',
      }

      if (card.route) cardWithPath.path = getGeneratedPath(card.route)
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
      {cardItemsWithPaths.map(card => (
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
