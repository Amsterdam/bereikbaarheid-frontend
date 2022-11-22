import styled from 'styled-components'
import type { ReactNode } from 'react'
import { Header as ASCHeader, AmsterdamLogo } from '@amsterdam/asc-ui'

import { HEADER_HEIGHT, Z_INDEX_HEADER } from '../constants'

const StyledLogo = styled(AmsterdamLogo)`
  height: 44px;
  width: 101px;
`

export interface HeaderProps {
  navigation?: ReactNode
  title?: string
  zIndex?: number
}

const Header = ({ navigation, title, zIndex }: HeaderProps) => {
  return (
    <ASCHeader
      tall={false}
      data-testid="header"
      title={title ?? ''}
      homeLink="/"
      fullWidth
      logo={StyledLogo}
      navigation={navigation ?? false}
      css={`
        z-index: ${zIndex ?? Z_INDEX_HEADER};

        && header {
          height: ${HEADER_HEIGHT}px;
        }

        // Header title
        & h1 a:nth-of-type(2) {
          font-size: 1.125rem;
        }
      `}
    />
  )
}

export default Header
