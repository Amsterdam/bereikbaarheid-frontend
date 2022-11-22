import { themeColor, themeSpacing } from '@amsterdam/asc-ui'
import { createGlobalStyle } from 'styled-components'

export const MapStyle = createGlobalStyle`
  .leaflet-container {
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.375;
  }

  // Attribution
  .leaflet-control-attribution {
    color: ${themeColor('tint', 'level6')};
    font-size: 0.75rem;
    line-height: 1.375;
    padding: 0 ${themeSpacing(1)};
  }

  .leaflet-control-attribution a {
    color: ${props => props.theme.colors.primary?.main};
    text-decoration: underline;
  }

  .leaflet-control-attribution a:hover,
  .leaflet-control-attribution a:focus {
    color: ${props => props.theme.colors.secondary?.main};
  }

  // Tooltip
  .leaflet-tooltip {
    color: ${themeColor('tint', 'level7')};
    padding: ${themeSpacing(2)};
  }
`
