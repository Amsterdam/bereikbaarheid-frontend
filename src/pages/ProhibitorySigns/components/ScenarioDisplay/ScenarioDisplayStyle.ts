import { Button, styles, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

export const FiltersContainer = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  padding: 0.625rem;

  > ${styles.RowStyle}:not(:last-child) {
    margin-bottom: ${themeSpacing(2)};
  }
`

export const EditFiltersButton = styled(Button)`
  align-self: stretch;
  margin-bottom: ${themeSpacing(2)};
`
