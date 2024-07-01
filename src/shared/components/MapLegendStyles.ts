//
// Styles for several items within a Map Legend
//

import styled from 'styled-components'

// displays the legend checkbox and legend items on separate lines
export const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

// makes sure every legend item appears on a separate line
export const LegendItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2px;
  overflow: scroll;
  max-height: 170px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`
