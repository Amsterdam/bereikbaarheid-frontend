import { ReactNode } from 'react'

import { Accordion, Divider, styles, svgFill, themeColor, themeSpacing, useMatchMedia } from '@amsterdam/asc-ui'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const legendGrey = '#aaa' // @todo refactor to tint level4?
const MapLegendStyle = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 170px);

  ${styles.AccordionButton} {
    background: ${legendGrey};
    color: ${themeColor('tint', 'level1')};
  }

  ${styles.AccordionButtonContent.IconStyle} {
    ${svgFill(themeColor('tint', 'level1'))};
  }

  ${styles.AccordionContent} {
    background: ${themeColor('tint', 'level1')};
    border-color: ${legendGrey};
    overflow: auto;
  }

  ${Divider} {
    background-color: ${themeColor('tint', 'level3')};
    margin: ${themeSpacing(2)} -${themeSpacing(4)};
  }
`

interface MapLegendProps {
  children: ReactNode
}

export const MapLegend = ({ children }: MapLegendProps) => {
  const { t } = useTranslation()

  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'laptop' })

  return (
    <MapLegendStyle>
      <Accordion id="legend" isOpen={showDesktopVariant ? true : false} title={t('_generic.legend')}>
        {children}
      </Accordion>
    </MapLegendStyle>
  )
}
