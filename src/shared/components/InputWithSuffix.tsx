import { ReactNode } from 'react'

import { styles, themeSpacing } from '@amsterdam/asc-ui'
import styled, { css } from 'styled-components'

const InputGroupWrapper = styled.div`
  display: flex;
`

const InputWrapper = styled.div<{
  displayAsText: boolean
}>`
  z-index: 1;

  ${({ displayAsText }) =>
    displayAsText &&
    css`
      ${styles.InputStyle} {
        background-color: transparent;
        border: none;
        color: ${props => props.theme.colors.tint?.level7};
      }
    `}
`

const InputSuffix = styled.div<{
  displayAsText: boolean
}>`
  background-color: ${props =>
    !props.displayAsText ? props.theme.colors.tint?.level2 : 'transparent'};
  border-color: ${props =>
    !props.displayAsText ? props.theme.colors.tint?.level5 : 'transparent'};
  border-style: ${props => (!props.displayAsText ? 'solid' : 'none')};
  border-width: 1px 1px 1px 0;
  display: flex;
  align-items: center;
  padding: ${themeSpacing(2, 3)};
`

interface InputWithSuffixProps {
  children: ReactNode
  displayAsText?: boolean
  suffix: string
}

const InputWithSuffix = ({
  children,
  displayAsText,
  suffix,
}: InputWithSuffixProps) => {
  return (
    <InputGroupWrapper>
      <InputWrapper displayAsText={displayAsText ?? false}>
        {children}
      </InputWrapper>
      <InputSuffix displayAsText={displayAsText ?? false}>{suffix}</InputSuffix>
    </InputGroupWrapper>
  )
}

export default InputWithSuffix
