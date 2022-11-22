//
// The default ASC Link component has a larger font-size and line-height on
// desktop screen sizes. Table text however does not scale up to 18px on larger
// screens, so this helper resets it to normal size.
//

import { Link } from '@amsterdam/asc-ui'
import { ComponentProps, ReactNode } from 'react'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  font-size: 16px;
  line-height: 22px;
`

interface LinkInTableProps extends ComponentProps<typeof Link> {
  children?: ReactNode
}

const LinkInTable = ({ children, ...otherProps }: LinkInTableProps) => {
  return <StyledLink {...otherProps}>{children}</StyledLink>
}

export default LinkInTable
