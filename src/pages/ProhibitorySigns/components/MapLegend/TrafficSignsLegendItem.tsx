import { Paragraph, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

const LegendItemWrapper = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: ${themeSpacing(1)};
  }
`
const LegendItemImage = styled.div<{ $image: string }>`
  background-image: url(${props => props.$image});
  background-size: 60px;
  height: 25px;
  margin-left: ${themeSpacing(10)};
  margin-right: ${themeSpacing(2)};
  width: 25px;
`
interface ProhibitorySignsMapLegendTrafficSignsLegendItemProps {
  itemImage: string
  itemText: string
}

export const ProhibitorySignsMapLegendTrafficSignsLegendItem = ({
  itemImage,
  itemText,
}: ProhibitorySignsMapLegendTrafficSignsLegendItemProps) => {
  return (
    <LegendItemWrapper>
      <LegendItemImage $image={itemImage} />
      <Paragraph gutterBottom={0}>{itemText}</Paragraph>
    </LegendItemWrapper>
  )
}
