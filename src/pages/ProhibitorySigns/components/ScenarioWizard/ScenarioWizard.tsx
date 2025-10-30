import { useEffect, useState } from 'react'

import { Link, Divider, Heading, Modal, TopBar } from '@amsterdam/asc-ui'
import { useSpring, animated } from '@react-spring/web'
import { RouteIds } from '../../../../routes'
import ModalBlock from '../../../../shared/components/ModalBlock'
import { Z_INDEX_MODAL } from '../../../../shared/constants'
import { getGeneratedPath } from '../../../../shared/utils/path'
import { Address } from 'types/address'

import { useProhibitorySignsPageContext } from '../../contexts/PageContext'

import { ProhibitorySignsFormScenarioRdwInfo } from './FormRdwInfo'
import { ProhibitorySignsFormScenarioAddress } from './FormScenarioAddress'
import { ProhibitorySignsFormScenarioStart } from './FormScenarioStart'

const AnimatedModalBlock = animated(ModalBlock)

const ProhibitorySignsScenarioWizard = () => {
  const { activeStepWizard, setAddress, showScenarioWizard } = useProhibitorySignsPageContext()
  const [addressInputEnabled, setAddressInputEnabled] = useState(true)
  const animationProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
  })

  useEffect(() => {
    // reset address when user unchecks 'Ik wil een adres invoeren'
    if (!addressInputEnabled) {
      setAddress({} as Address)
    }
  }, [addressInputEnabled, setAddress])

  const steps = [
    <ProhibitorySignsFormScenarioStart
      addressInputEnabled={addressInputEnabled}
      setAddressInputEnabled={setAddressInputEnabled}
    />,
    <ProhibitorySignsFormScenarioAddress />,
    <ProhibitorySignsFormScenarioRdwInfo addressInputEnabled={addressInputEnabled} />,
  ]

  return (
    <Modal
      aria-labelledby="modal-scenario-wizard"
      aria-describedby="modal-scenario-wizard"
      disablePortal // to prevent findDOMNode warning, see https://github.com/Amsterdam/amsterdam-styled-components/issues/2389
      hideOverFlow={false}
      open={showScenarioWizard}
      zIndexOffset={Z_INDEX_MODAL}
    >
      <TopBar>
        <Heading as="h2">Invoer gegevens</Heading>

        <Link href={getGeneratedPath(RouteIds.CONTACT)} target="_blank">
          Feedback
        </Link>
      </TopBar>

      <Divider />

      <AnimatedModalBlock style={animationProps}>{steps[activeStepWizard]}</AnimatedModalBlock>
    </Modal>
  )
}

export default ProhibitorySignsScenarioWizard
