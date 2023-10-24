import { useContext } from 'react'

import { MapPanelContext, ViewerContainer, Zoom } from '@amsterdam/arm-core'
import styled, { css } from 'styled-components'

import { TouringcarParkingSpacesMapLegend } from './MapLegend'

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

interface TouringcarViewerContainerProps {
  showDesktopVariant: boolean
}

export const TouringcarViewerContainer = ({
  showDesktopVariant,
  ...otherProps
}: TouringcarViewerContainerProps) => {
  const { draggable } = useContext(MapPanelContext)

  return (
    <>
      {!showDesktopVariant ? (
        <StyledViewerContainer {...otherProps} ignoreTransition={draggable} />
      ) : (
        <StyledViewerContainer
          {...otherProps}
          ignoreTransition={draggable}
          bottomRight={<Zoom />}
          topRight={<TouringcarParkingSpacesMapLegend />}
        />
      )}
    </>
  )
}
