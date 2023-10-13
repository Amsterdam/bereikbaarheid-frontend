import { useContext } from 'react'

import { MapPanelContext, ViewerContainer, Zoom } from '@amsterdam/arm-core'
import styled, { css } from 'styled-components'

import { LoadUnloadMapLegend } from './MapLegend'

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

interface LoadUnloadViewerContainerProps {
  showDesktopVariant: boolean
}

export const LoadUnloadViewerContainer = ({
  showDesktopVariant,
  ...otherProps
}: LoadUnloadViewerContainerProps) => {
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
          topRight={<LoadUnloadMapLegend />}
        />
      )}
    </>
  )
}
