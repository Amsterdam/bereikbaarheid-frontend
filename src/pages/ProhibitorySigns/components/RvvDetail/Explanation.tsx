import { Paragraph, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

const Explanation = styled(Paragraph)`
  color: ${props => props.theme.colors.tint?.level5};
  margin-bottom: 0;
  margin-top: ${themeSpacing(2)};
`

export const RvvDetailExplanation = () => {
  return (
    <Explanation>
      Wegen die niet toegankelijk zijn voor uw voertuig zonder RVV-ontheffing (Reglement Verkeersregels en
      Verkeerstekens)
    </Explanation>
  )
}
