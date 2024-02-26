import { useMemo, useState } from 'react'

import { ExternalLink, Info } from '@amsterdam/asc-assets'
import {
  Card,
  CardContent,
  CardMedia,
  Heading,
  Icon,
  Image,
  Link,
  Paragraph,
  themeColor,
  useMatchMedia,
} from '@amsterdam/asc-ui'
import { useTranslation } from 'react-i18next'
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
`

const StyledCardMedia = styled(CardMedia)`
  aspect-ratio: 3 / 2;
`

const StyledImage = styled(Image)`
  transition: transform 500ms ease-out;
`

const StyledCardContent = styled(CardContent)`
  position: relative;
  padding: 1em;
  min-height: 0;
`

const StretchedDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledHeading = styled(Heading)`
  display: flex;
  margin: 0;
  line-height: 1;
  gap: 0.75rem;

  & > span {
    margin-top: -2px;
  }
`

const PaddedIcon = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 18px;
`

const PopupContainer = styled.div`
  display: flex;
  position: absolute;
  top: -${CARD_WIDTH_PX / 1.5}px;
  left: 0;
  align-items: flex-end;
  transition: top 0.25s ease-out, height 0.25s ease-out;
  width: 100%;
  height: ${CARD_WIDTH_PX / 1.5}px;
  overflow: hidden;
`

const PopupContent = styled.div`
  background: ${themeColor('tint', 'level2')};
  padding: 1em 1em 0;
  width: 100%;
  color: black;
`

const PopupParagraph = styled(Paragraph)`
  line-height: 1.25;
  font-size: 0.75em;
`

function CardsMenu() {
  const { t } = useTranslation()

  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'laptop' })

  const [showTooltip, setShowTooltip] = useState('')

  const cardItemsWithPaths = useMemo<CardItemWithPath[]>(() => {
    return mapPathsToMenuOrCardItems(cardItems, { preferShortTitles: false })
  }, [])

  return (
    <>
      {cardItemsWithPaths.map(card => (
        <CardLink
          key={t(card.title)}
          href={card.path}
          target={card.target}
          tabIndex="0"
          onFocus={() => setShowTooltip(card.path)}
          onBlur={() => setShowTooltip('')}
        >
          <StyledCard maxWidth={300} backgroundColor="level2" shadow>
            <StyledCardMedia>
              <picture>
                <source srcSet={card.image} type="image/webp" />
                <StyledImage
                  src={card.imageFallback}
                  alt={t(card.title)}
                  data-testid={card.image && 'card-with-image'}
                  width="300"
                  height="200"
                />
              </picture>
            </StyledCardMedia>
            <StyledCardContent
              onClick={() => setShowTooltip(showTooltip ? '' : card.path)}
              onMouseOver={() => setShowTooltip(card.path)}
              onMouseOut={() => setShowTooltip('')}
            >
              <StretchedDiv>
                <StyledHeading as="h4">
                  {t(card.title)}
                  {card.target === '_blank' ? (
                    <Icon>
                      <ExternalLink />
                    </Icon>
                  ) : (
                    <></>
                  )}
                </StyledHeading>

                {showDesktopVariant && (
                  <PaddedIcon>
                    <Info />
                  </PaddedIcon>
                )}
              </StretchedDiv>

              {card.description && (
                <PopupContainer style={showTooltip === card.path ? {} : { height: '0px', top: 0 }}>
                  <PopupContent>
                    <PopupParagraph>{t(card.description)}</PopupParagraph>
                  </PopupContent>
                </PopupContainer>
              )}
            </StyledCardContent>
          </StyledCard>
        </CardLink>
      ))}
    </>
  )
}

export { CARD_WIDTH_PX }
export default CardsMenu
