// this is a copy of the amsterdam-react-maps default icon
// see: https://github.com/Amsterdam/amsterdam-react-maps/blob/eb72534d64b3f91ed555675c8bcf3791a21114e5/packages/arm-core/src/icons.ts

import { useTheme } from 'styled-components'

const ArmMarkerIcon = () => {
  const theme = useTheme()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 39 39"
    >
      <g fill="none" fillRule="evenodd">
        <path
          fill="#666"
          d="M20.27 1C13.374 1 8 6.27 8 12.946 8 19.927 20.27 38.69 20.27 38.69s12.267-18.897 12.267-25.744C32.537 6.28 27.264 1 20.27 1m0 3.382c5.014 0 8.794 3.682 8.794 8.564 0 .803-.41 4.173-5.703 13.81a172.15 172.15 0 01-3.1 5.394 166.914 166.914 0 01-3.086-5.35c-5.147-9.34-5.702-12.8-5.702-13.854 0-2.33.9-4.493 2.533-6.087 1.637-1.597 3.862-2.477 6.264-2.477"
        />
        <path
          fill={theme.colors.tint?.level1}
          d="M19.265 35.392C15.373 28.977 8.736 17.045 8.736 12.263c0-5.903 4.627-10.527 10.534-10.527 6.004 0 10.53 4.526 10.53 10.527 0 4.69-6.643 16.678-10.535 23.13"
        />
        <path
          fill={theme.colors.secondary?.main}
          d="M19.27 0C12.374 0 7 5.41 7 12.264c0 7.167 12.27 26.43 12.27 26.43s12.267-19.4 12.267-26.43C31.537 5.422 26.264 0 19.27 0m0 3.473c5.014 0 8.794 3.779 8.794 8.79 0 .825-.41 4.285-5.703 14.178a177.988 177.988 0 01-3.1 5.538 172.554 172.554 0 01-3.086-5.491c-5.147-9.59-5.702-13.142-5.702-14.224 0-2.393.9-4.612 2.533-6.249 1.637-1.64 3.862-2.542 6.264-2.542"
        />
        <path
          fill={theme.colors.secondary?.main}
          d="M22.462 11.948a3.266 3.266 0 11-6.533 0 3.266 3.266 0 016.533 0"
        />
      </g>
    </svg>
  )
}

export default ArmMarkerIcon
