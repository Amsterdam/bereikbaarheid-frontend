import {
  Accordion,
  Divider,
  styles,
  svgFill,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { ReactNode } from 'react'
import styled from 'styled-components'

const legendGrey = '#aaa' // @todo refactor to tint level4?
const MapLegendStyle = styled.div`
  min-width: 200px;

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
  return (
    <MapLegendStyle>
      <Accordion id="legend" isOpen title="Legenda">
        {children}
      </Accordion>
    </MapLegendStyle>
  )
}
