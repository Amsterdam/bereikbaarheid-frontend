import { Button, Link, Paragraph } from '@amsterdam/asc-ui'

import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { usePermitLowEmissionZone } from '../../hooks/usePermitLowEmissionZone'
import { usePermitsByLocation } from '../../hooks/usePermitsByLocation'

const ScenarioDisplayResultPermitLowEmissionZone = () => {
  const { vehicle } = useProhibitorySignsPageContext()
  const needsPermitLowEmissionZone = usePermitLowEmissionZone()
  const permitsByLocation = usePermitsByLocation()
  const linkToPermitCheck = `https://ontheffingen.amsterdam.nl/publiek/?kenteken=${vehicle.licensePlate}`

  if (!needsPermitLowEmissionZone) {
    return <Paragraph gutterBottom={0}>niet nodig</Paragraph>
  }

  if (permitsByLocation.data?.data && !permitsByLocation.data?.data?.attributes.low_emission_zone) {
    return <Paragraph gutterBottom={0}>niet nodig</Paragraph>
  }

  if (!permitsByLocation.data?.data && needsPermitLowEmissionZone) {
    return (
      <Paragraph gutterBottom={0}>
        indien nodig,{' '}
        <Link href={linkToPermitCheck} target="_blank" variant="inline">
          checken
        </Link>
      </Paragraph>
    )
  }

  return (
    <Paragraph gutterBottom={0}>
      <Button onClick={() => window.open(linkToPermitCheck, '_blank')} variant="primary">
        checken
      </Button>
    </Paragraph>
  )
}

export default ScenarioDisplayResultPermitLowEmissionZone
