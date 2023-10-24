import { ReactNode } from 'react'

import { Paragraph, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

const LegendItemWrapper = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: ${themeSpacing(1)};
  }
`
const LegendItemSymbol = styled.div<{ $color: string; $height: string }>`
  background-color: ${props => props.$color};
  margin-left: ${themeSpacing(10)};
  margin-right: ${themeSpacing(2)};
  height: ${props => props.$height};
  width: 25px;
`
interface MapLegendItemProps {
  color: string
  height?: string
  text: ReactNode
}

function MapLegendItem({ color, height = '8px', text }: MapLegendItemProps) {
  return (
    <LegendItemWrapper>
      <LegendItemSymbol $color={color} $height={height} />
      <Paragraph gutterBottom={0}>{text}</Paragraph>
    </LegendItemWrapper>
  )
}

export default MapLegendItem
