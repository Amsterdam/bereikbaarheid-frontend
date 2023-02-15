import { getUrl } from '../../../api/bereikbaarheid/traffic-signs'
import { DataModal } from '../../../shared/components/Modal'

import { useProhibitorySignsPageContext } from '../contexts/PageContext'
import { useRdwGeneralInfo } from '../hooks/useRdwGeneralInfo'
import { useTrafficSignCategories } from '../hooks/useTrafficSignCategories'
import { Dispatch, SetStateAction } from 'react'

interface ProhibitorySignsDataModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const ProhibitorySignsDataModal = ({
  open,
  setOpen,
}: ProhibitorySignsDataModalProps) => {
  const { showScenarioWizard, vehicle } = useProhibitorySignsPageContext()
  const rdwGeneralInfo = useRdwGeneralInfo()
  const trafficSignCategories = useTrafficSignCategories()

  const urlTrafficSigns = () => {
    if (showScenarioWizard) return ''

    return getUrl({
      trafficSignCategories,
      vehicleAxleWeight: vehicle.axleWeight,
      vehicleHasTrailer: vehicle.hasTrailer,
      vehicleHeight: vehicle.height,
      vehicleLength: vehicle.length,
      vehicleMaxAllowedWeight: rdwGeneralInfo.data![0].derived.maxAllowedWeight,
      vehicleTotalWeight: vehicle.weight,
      vehicleType: rdwGeneralInfo.data![0].derived.vehicleType,
      vehicleWidth: vehicle.width,
    })
  }

  const dataLinks = [
    {
      href: 'https://data.amsterdam.nl/datasets/D6rMG5CdGBfp2Q/parkeervakken/',
      title: 'Laad- en losplekken',
    },
    { beta: true, href: urlTrafficSigns(), title: 'Verbodsborden' },
  ]

  if (showScenarioWizard) return null

  return <DataModal open={open} setOpen={setOpen} dataLinks={dataLinks} />
}
