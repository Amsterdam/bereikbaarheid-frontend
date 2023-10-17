import { useMemo } from 'react'

import { ExternalLink } from '@amsterdam/asc-assets'
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
import {
  MenuOrCardItemWithPath as CardItemWithPath,
  menuOrCardItems as cardItems,
  mapPathsToMenuOrCardItems,
} from 'shared/utils/menuOrCardItems'
import styled from 'styled-components'

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
  const cardItemsWithPaths = useMemo<CardItemWithPath[]>(() => {
    return mapPathsToMenuOrCardItems(cardItems, { preferShortTitles: false })
  }, [])

  return (
    <>
      {cardItemsWithPaths.map(card => (
        <CardLink
          key={card.title}
          href={card.path}
          target={card.target}
          data-testid={card.target && 'card-with-external-link'}
          tabIndex="0"
        >
          <StyledCard maxWidth={300} backgroundColor="level2" shadow>
            <StyledCardMedia>
              <picture>
                <source srcSet={card.image} type="image/webp" />
                <StyledImage
                  src={card.imageFallback}
                  alt={card.title}
                  data-testid={card.image && 'card-with-image'}
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
