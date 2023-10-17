import { ReactNode } from 'react'

import styled from 'styled-components'

type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

type FormNavigationWrapperProps = {
  halign?: FlexJustify
}

const FormNavigationWrapper = styled.div<FormNavigationWrapperProps>`
  background-color: ${props => props.theme.colors.tint?.level3};
  display: flex;
  align-items: baseline;
  justify-content: ${props => props.halign ?? 'space-between'};
  padding: 0.625rem;
`

interface ScenarioWizardNavProps extends FormNavigationWrapperProps {
  children: ReactNode
}

const ScenarioWizardNav = ({ children, ...props }: ScenarioWizardNavProps) => {
  return <FormNavigationWrapper {...props}>{children}</FormNavigationWrapper>
}

export default ScenarioWizardNav
