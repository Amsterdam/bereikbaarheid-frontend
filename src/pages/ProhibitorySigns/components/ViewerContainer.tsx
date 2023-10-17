import { useContext } from 'react'

import { MapPanelContext, ViewerContainer, Zoom } from '@amsterdam/arm-core'
import styled, { css } from 'styled-components'

import ProhibitorySignsMapLegend from './MapLegend'

type StyledViewerContainerProps = {
  leftOffset?: string
  viewerHeight?: string
  ignoreTransition: boolean
}

const StyledViewerContainer = styled(
  ViewerContainer
).attrs<StyledViewerContainerProps>(({ viewerHeight, leftOffset }) => ({
  style: {
    height: viewerHeight,
    left: leftOffset,
    width: `calc(100% - ${leftOffset})`,
  },
}))<StyledViewerContainerProps>`
  bottom: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 400;
  ${({ ignoreTransition }) =>
    !ignoreTransition &&
    css`
      transition: height 0.3s ease-in-out;
    `}
`

interface ProhibitorySignsViewerContainerProps {
  showDesktopVariant: boolean
}

const ProhibitorySignsViewerContainer = ({
  showDesktopVariant,
  ...otherProps
}: ProhibitorySignsViewerContainerProps) => {
  const { draggable, drawerPosition } = useContext(MapPanelContext)
  const height =
    parseInt(drawerPosition, 10) < window.innerHeight / 2
      ? '50%'
      : drawerPosition

  return (
    <>
      {!showDesktopVariant ? (
        <StyledViewerContainer
          {...otherProps}
          ignoreTransition={draggable}
          viewerHeight={height}
        />
      ) : (
        <StyledViewerContainer
          {...otherProps}
          ignoreTransition={draggable}
          leftOffset={drawerPosition}
          bottomRight={<Zoom />}
          topRight={<ProhibitorySignsMapLegend />}
        />
      )}
    </>
  )
}

export default ProhibitorySignsViewerContainer
