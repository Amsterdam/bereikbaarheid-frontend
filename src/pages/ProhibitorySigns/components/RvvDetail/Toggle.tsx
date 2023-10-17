import { Dispatch, SetStateAction } from 'react'

import { ChevronDown, ChevronUp } from '@amsterdam/asc-assets'
import { Button } from '@amsterdam/asc-ui'
import styled from 'styled-components'

const ToggleButton = styled(Button)`
  font-weight: 400;
`

interface RvvDetailToggleProps {
  showDetails: boolean
  setShowDetails: Dispatch<SetStateAction<RvvDetailToggleProps['showDetails']>>
  title: string
}

export const RvvDetailToggle = ({
  showDetails,
  setShowDetails,
  title,
}: RvvDetailToggleProps) => {
  return (
    <ToggleButton
      iconRight={!showDetails ? <ChevronDown /> : <ChevronUp />}
      iconSize={14}
      onClick={() => setShowDetails(showDetails => !showDetails)}
      variant="textButton"
    >
      {title}
    </ToggleButton>
  )
}
