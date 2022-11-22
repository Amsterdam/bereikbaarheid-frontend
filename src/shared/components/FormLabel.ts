// spec: https://designsystem.amsterdam.nl/7awj1hc9f/p/377330-formfield-labels

import { Label } from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const FormLabel = styled(Label)`
  font-size: ${props => props.theme.typography.h4?.fontSize};
  font-weight: ${props => props.theme.typography.h4?.fontWeight};
  line-height: ${props => props.theme.typography.h4?.lineHeight};
`
