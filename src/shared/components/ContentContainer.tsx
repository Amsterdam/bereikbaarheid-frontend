import { ReactNode } from 'react'

import { breakpoint, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

const StyledContainer = styled.div`
  background-color: white;
  padding-top: ${themeSpacing(4)};
  padding-bottom: ${themeSpacing(4)};
  width: 100%;

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    padding-top: ${themeSpacing(14)};
    padding-bottom: ${themeSpacing(18)};
  }
`

interface ContentContainerProps {
  children?: ReactNode
  className?: string
}

const ContentContainer = ({ children, className }: ContentContainerProps) => {
  return (
    <StyledContainer className={className ?? 'content-container'}>
      {children}
    </StyledContainer>
  )
}

export default ContentContainer
