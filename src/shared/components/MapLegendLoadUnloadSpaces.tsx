import { ChangeEvent, useEffect, useState } from 'react'

import { useMapInstance } from '@amsterdam/arm-core'
import { Checkbox, Label, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { loadUnloadSpaces } from '../map/mapLayers'

// Colors taken from MapServer map file
// https://github.com/Amsterdam/mapserver/commit/28693d4460a3506e6a042eb89e62e7caec5beb38
const Legend = styled.div`
  background-color: rgba(179, 139, 104, 0.5);
  border: 1px solid rgba(179, 139, 104, 1);
  height: 8px;
  margin-right: ${themeSpacing(2)};
  order: 1;
  width: 24px;
`

const StyledLabel = styled(Label)`
  > span:first-child {
    order: 2; // make room for Legend by increasing the order of the text span by 1
  }
`

interface MapLegendLoadUnloadSpacesProps {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const MapLegendLoadUnloadSpaces = ({
  checked,
  onChange,
}: MapLegendLoadUnloadSpacesProps) => {
  const mapInstance = useMapInstance()

  // this WMS only provides output from zoom level 16 onwards,
  // so disable the checkbox when this zoomlevel is not yet reached
  const [isDisabled, setIsDisabled] = useState(true)
  useEffect(() => {
    mapInstance.on('zoomend', () => {
      setIsDisabled(mapInstance.getZoom() < loadUnloadSpaces.options.minZoom!)
    })
  }, [mapInstance])

  return (
    <StyledLabel
      disabled={isDisabled}
      htmlFor="mapLegendLoadUnloadSpaces"
      label={loadUnloadSpaces.label}
    >
      <Legend />
      <Checkbox
        id="mapLegendLoadUnloadSpaces"
        onChange={onChange}
        checked={checked}
      />
    </StyledLabel>
  )
}
