import { Column, Row, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const RdwInfoFormInnerContainer = styled.div`
  background-color: ${props => props.theme.colors.tint?.level2};
  margin-bottom: ${themeSpacing(4)};
  padding: 0.625rem 1.875rem 0.625rem 0.625rem;
`

export const RdwInfoFormRow = styled(Row)`
  margin-bottom: ${themeSpacing(2)};
`

export const RdwInfoFormColumn = styled(Column)`
  flex-direction: column;
`

export const RdwInfoFormLabelHelpText = styled.span`
  color: ${props => props.theme.colors.tint?.level5};
  font-size: 14px;
  line-height: 18px;
`
