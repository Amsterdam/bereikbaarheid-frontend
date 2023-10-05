import {
  AmsterdamLogo,
  Header as ASCHeader,
  MenuInline,
  MenuToggle,
  styles,
  useMatchMedia,
} from '@amsterdam/asc-ui'
import type { ReactNode } from 'react'
import styled from 'styled-components'

import { HEADER_HEIGHT, Z_INDEX_HEADER } from '../../constants'
import { HeaderMenuItems } from './HeaderMenuItems'

const StyledLogo = styled(AmsterdamLogo)`
  height: 44px;
  width: 101px;
`

const StyledMenu = styled(MenuInline)`
  ${styles.LinkStyle} {
    display: inherit;
    font-size: inherit;
  }
`

export interface HeaderProps {
  additionalMenuItems?: ReactNode
  title?: string
  zIndex?: number
}

export const Header = ({ additionalMenuItems, title, zIndex }: HeaderProps) => {
  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'laptop' })

  return (
    <ASCHeader
      tall={false}
      data-testid="header"
      title={title ?? ''}
      homeLink="/"
      fullWidth
      logo={StyledLogo}
      navigation={
        <>
          {!showDesktopVariant ? (
            <MenuToggle align="right">
              <HeaderMenuItems></HeaderMenuItems>
              {additionalMenuItems}
            </MenuToggle>
          ) : (
            <StyledMenu>
              <HeaderMenuItems></HeaderMenuItems>
              {additionalMenuItems}
            </StyledMenu>
          )}
        </>
      }
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
