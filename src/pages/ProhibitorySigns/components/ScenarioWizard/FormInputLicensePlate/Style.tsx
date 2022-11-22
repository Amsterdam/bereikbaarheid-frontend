import { Input } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import InputBackground from './background.png'

export const FormInputLicensePlateWidth = '172px'

export const FormInputLicensePlate = styled(Input)`
  background: url(${InputBackground}) no-repeat center center transparent;
  background-size: ${FormInputLicensePlateWidth} 44px;
  display: block;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0;
  padding-left: 35px;
  text-align: center;
  width: ${FormInputLicensePlateWidth};
`
