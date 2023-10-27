import { Heading, themeSpacing } from '@amsterdam/asc-ui'
import { ContentWrapper } from '@amsterdam/asc-ui/lib/components/Alert/AlertStyle'
import styled from 'styled-components'

const ContentBlock = styled(ContentWrapper)<{ isCompact?: boolean }>`
  padding-block-end: ${themeSpacing(4)};

  ${props =>
    props.isCompact
      ? `&:first-of-type {
        padding-block-start: 1rem;
    }`
      : ''}
`

const PretendHeading = styled(Heading)<{ isCompact?: boolean }>`
  ${props => (props.isCompact ? `font-size: 18px;` : '')}
`

export { ContentBlock, PretendHeading }
