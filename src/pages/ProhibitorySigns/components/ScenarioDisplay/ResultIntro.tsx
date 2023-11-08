import { Paragraph, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { usePermitsByLocation } from '../../hooks/usePermitsByLocation'

import ArmMarkerIcon from './ArmMarkerIcon'

const IntroWrapper = styled(Paragraph)`
  margin-bottom: ${themeSpacing(2)};
`

const ScenarioDisplayResultIntro = () => {
  const { address } = useProhibitorySignsPageContext()
  const permitsByLocation = usePermitsByLocation()

  if ((!address.lat && !address.lon) || !permitsByLocation.data?.data) {
    return (
      <IntroWrapper data-testid="result-no-address-found">
        U heeft <strong>geen</strong> of een <strong>ongeldig</strong> adres adres ingevoerd. De kleuren (uitleg zie
        legenda rechtsboven) op de kaart geven aan <strong>waar</strong> u welke ontheffing(en) u nodig heeft.
      </IntroWrapper>
    )
  }

  return (
    <IntroWrapper>
      Voor adres {address.label}
      <ArmMarkerIcon />
      is de volgende informatie beschikbaar.
    </IntroWrapper>
  )
}

export default ScenarioDisplayResultIntro
