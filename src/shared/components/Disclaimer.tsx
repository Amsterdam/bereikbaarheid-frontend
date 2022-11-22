import {
  Alert,
  CompactThemeProvider,
  Link,
  Paragraph,
  themeColor,
} from '@amsterdam/asc-ui'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

import { Z_INDEX_HEADER } from '../constants'

const StyledAlert = styled(Alert)`
  background-color: ${themeColor('tint', 'level1')};
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX_HEADER};
`

const StyledParagraph = styled(Paragraph)`
  font-size: ${props => props.theme.typography.small?.fontSize};

  a {
    font-size: ${props => props.theme.typography.small?.fontSize};
  }
`

type DisclaimerProps = {
  setShowDisclaimer: Dispatch<SetStateAction<boolean>>
}

const Disclaimer = ({ setShowDisclaimer }: DisclaimerProps) => {
  const onDismiss = () => {
    setShowDisclaimer(false)
  }

  return (
    <CompactThemeProvider>
      <StyledAlert dismissible onDismiss={onDismiss}>
        <StyledParagraph>
          De gemeente Amsterdam verwerkt uw persoonsgegevens op een zorgvuldige
          en veilige manier in overeenstemming met de geldende wet- en
          regelgeving. Dat betekent onder meer dat uw gegevens niet voor een
          ander doel worden gebruikt dan waarvoor u ze heeft verstrekt. Meer
          informatie over de bescherming van uw persoonsgegevens kunt u vinden
          in&nbsp;
          <Link
            href="https://www.amsterdam.nl/privacy/specifieke/privacyverklaring-parkeren-verkeer-bouw/bereikbaarheidskaart-privacy/"
            rel="noreferrer"
            target="_blank"
            variant="inline"
          >
            de privacyverklaring
          </Link>
          . Deze site gebruikt&nbsp;
          <Link
            href="https://www.amsterdam.nl/privacy/cookies-site/#hc6273312-d27c-43c6-9f55-bce7b24e6205"
            rel="noreferrer"
            target="_blank"
            variant="inline"
          >
            een statistiekendienst
          </Link>
          &nbsp;om inzicht te krijgen in klikpaden. Deze gegevens zijn
          geanonimiseerd. Aan deze kaart kunnen geen rechten worden ontleend. De
          situatie en bebording op straat kan dus afwijken van de kaartgegevens
          en prevaleert altijd.
        </StyledParagraph>
      </StyledAlert>
    </CompactThemeProvider>
  )
}

export default Disclaimer
