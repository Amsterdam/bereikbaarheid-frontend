import { Button, Divider, Heading, Modal, TopBar } from '@amsterdam/asc-ui'
import { useSpring, animated } from '@react-spring/web'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Z_INDEX_MODAL } from '../../../../shared/constants'
import ModalBlock from '../../../../shared/components/ModalBlock'
import { Address } from '../../../../types/address'

import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { ProhibitorySignsFormScenarioStart } from './FormScenarioStart'
import { ProhibitorySignsFormScenarioAddress } from './FormScenarioAddress'
import { ProhibitorySignsFormScenarioRdwInfo } from './FormRdwInfo'

const FeedbackButton = styled(Button)`
  align-self: stretch;
`

const AnimatedModalBlock = animated(ModalBlock)

interface ProhibitorySignsScenarioWizardProps {
  setShowFeedbackModal: Dispatch<SetStateAction<boolean>>
}

const ProhibitorySignsScenarioWizard = ({
  setShowFeedbackModal,
}: ProhibitorySignsScenarioWizardProps) => {
  const { activeStepWizard, setAddress, showScenarioWizard } =
    useProhibitorySignsPageContext()
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
    <ProhibitorySignsFormScenarioRdwInfo
      addressInputEnabled={addressInputEnabled}
    />,
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

        <FeedbackButton
          variant="textButton"
          onClick={() => setShowFeedbackModal(true)}
        >
          Feedback
        </FeedbackButton>
      </TopBar>

      <Divider />

      <AnimatedModalBlock style={animationProps}>
        {steps[activeStepWizard]}
      </AnimatedModalBlock>
    </Modal>
  )
}

export default ProhibitorySignsScenarioWizard
