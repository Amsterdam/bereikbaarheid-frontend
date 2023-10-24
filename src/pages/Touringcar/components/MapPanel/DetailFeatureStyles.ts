import { styles, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  position: relative;
  margin: 0 auto;
  width: 90px;
`

export const Image = styled.img`
  height: 100%;
  width: auto;
`

export const PropertiesContainer = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  margin-top: ${themeSpacing(4)};
  padding: 0.625rem;

  > ${styles.RowStyle}:not(:last-child) {
    margin-bottom: ${themeSpacing(3)};
  }
`
