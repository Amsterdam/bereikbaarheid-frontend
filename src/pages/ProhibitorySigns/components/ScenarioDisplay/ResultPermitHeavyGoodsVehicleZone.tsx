import { Button, Link, Paragraph } from '@amsterdam/asc-ui'

import { usePermitHeavyGoodsVehicleZone } from '../../hooks/usePermitHeavyGoodsVehicleZone'
import { usePermitsByLocation } from '../../hooks/usePermitsByLocation'

const ScenarioDisplayResultPermitHeavyGoodsVehicleZone = () => {
  const needsPermitHeavyGoodsVehicleZone = usePermitHeavyGoodsVehicleZone()
  const permitsByLocation = usePermitsByLocation()
  const linkToPermitCheck =
    'https://www.amsterdam.nl/parkeren-verkeer/zone-zwaar-verkeer-amsterdam/ontheffing-checken-aanvragen/'

  if (!needsPermitHeavyGoodsVehicleZone) {
    return <Paragraph gutterBottom={0}>niet nodig</Paragraph>
  }

  if (permitsByLocation.data?.data && !permitsByLocation.data?.data?.attributes.heavy_goods_vehicle_zone) {
    return <Paragraph gutterBottom={0}>niet nodig</Paragraph>
  }

  if (!permitsByLocation.data?.data && needsPermitHeavyGoodsVehicleZone) {
    return (
      <Paragraph gutterBottom={0}>
        indien nodig,{' '}
        <Link href={linkToPermitCheck} target="_blank" variant="inline">
          vraag aan
        </Link>
      </Paragraph>
    )
  }

  return (
    <Paragraph gutterBottom={0}>
      <Button onClick={() => window.open(linkToPermitCheck, '_blank')} variant="primary">
        nodig, vraag aan
      </Button>
    </Paragraph>
  )
}

export default ScenarioDisplayResultPermitHeavyGoodsVehicleZone
