import { Dispatch, SetStateAction } from 'react'

import { Divider, Heading, Modal, TopBar } from '@amsterdam/asc-ui'
import { FormDateTime, FormDateTimeValues } from '../../../shared/components/FormDateTime'
import ModalBlock from '../../../shared/components/ModalBlock'
import { Z_INDEX_MODAL } from '../../../shared/constants'

import { useLoadUnloadPageContext } from '../contexts/PageContext'

interface ModalDateTimeProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const ModalDateTime = ({ showModal, setShowModal }: ModalDateTimeProps) => {
  const { dateTime, setDateTime } = useLoadUnloadPageContext()
  const onSubmitForm = (data: FormDateTimeValues) => {
    setDateTime({
      date: data.date,
      timeFrom: data.timeFrom,
      timeTo: data.timeTo,
    })

    setShowModal(false)
  }

  return (
    <Modal
      aria-labelledby="modal"
      disablePortal // to prevent findDOMNode warning, see https://github.com/Amsterdam/amsterdam-styled-components/issues/2389
      open={showModal}
      zIndexOffset={Z_INDEX_MODAL}
    >
      <TopBar>
        <Heading as="h2">Stel een datum en tijd in</Heading>
      </TopBar>
      <Divider />
      <ModalBlock>
        <FormDateTime formValues={dateTime} onSubmitForm={onSubmitForm} />
      </ModalBlock>
    </Modal>
  )
}
