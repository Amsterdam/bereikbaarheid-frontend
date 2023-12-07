import { Button, Link, Paragraph } from '@amsterdam/asc-ui'

import { usePermitsByLocation } from '../../hooks/usePermitsByLocation'
import { linkToPermitCheck } from '../RvvDetail'

const ScenarioDisplayResultPermitRVV = () => {
  const permitsByLocation = usePermitsByLocation()

  if (!permitsByLocation.data?.data) {
    return (
      <Paragraph gutterBottom={0}>
        indien nodig,{' '}
        <Link href={linkToPermitCheck} target="_blank" variant="inline">
          vraag aan
        </Link>
      </Paragraph>
    )
  }

  if (permitsByLocation.data?.data && !permitsByLocation.data?.data?.attributes.rvv_permit_needed) {
    return <Paragraph gutterBottom={0}>niet nodig</Paragraph>
  }

  return (
    <Paragraph gutterBottom={0}>
      <Button onClick={() => window.open(linkToPermitCheck, '_blank')} variant="primary">
        nodig, vraag aan
      </Button>
    </Paragraph>
  )
}

export default ScenarioDisplayResultPermitRVV
