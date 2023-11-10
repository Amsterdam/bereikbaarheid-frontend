import { Paragraph } from '@amsterdam/asc-ui'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'

const FormRdwInfoIntroText = () => {
  const { vehicle } = useProhibitorySignsPageContext()

  if (!vehicle.hasTrailer) {
    return <Paragraph>Pas de gegevens aan als deze anders zijn tijdens uw rit.</Paragraph>
  }

  return (
    <Paragraph>
      Pas de gegevens aan als deze anders zijn tijdens uw rit. De hieronder getoonde waarden gelden voor voertuig
      inclusief oplegger en/of aanhanger, tenzij anders aangegeven.
    </Paragraph>
  )
}

export default FormRdwInfoIntroText
