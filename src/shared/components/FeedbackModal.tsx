import { Dispatch, SetStateAction } from 'react'

import { Close } from '@amsterdam/asc-assets'
import {
  Button,
  Divider,
  Heading,
  Modal,
  Paragraph,
  TopBar,
} from '@amsterdam/asc-ui'

import ModalBlock from './ModalBlock'

import { Z_INDEX_MENU_MODAL } from '../constants'

const FEEDBACK_RECIPIENT = 'stadsloket.centrum.vergunningen.dvl@amsterdam.nl'
const FEEDBACK_SUBJECT = 'Terugmelding bereikbaarheid.amsterdam.nl'
const FEEDBACK_BODY = `Beschrijf zo volledig mogelijk van welk onjuist gegeven\
 je een melding wilt maken:
  - Welk gegeven is kennelijk onjuist of ontbreekt?
  - Weet je wat het wel zou moeten zijn?
  - Waarop is jouw constatering gebaseerd? Omschrijf de reden en voeg indien\
   mogelijk relevante documenten in de bijlage toe (bijvoorbeeld: een foto).
  `

const QUESTION_RECIPIENT = 'stadsloket.centrum.vergunningen.dvl@amsterdam.nl'
const QUESTION_SUBJECT = `Probleem melden of suggestie voor bereikbaarheid.amsterdam.nl`
const QUESTION_BODY = `Beschrijf zo volledig mogelijk waar je tegenaan loopt:
  - Om welk onderdeel van de pagina gaat het?
  - Wat zie je op het scherm als je een probleem ondervindt?
  - Heb je een suggestie hoe het anders zou kunnen?
  `

const getMailtoLink = (recipient: string, subject: string, body: string) =>
  `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`

interface FeedbackModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<FeedbackModalProps['open']>>
}

const FeedbackModal = ({ open, setOpen }: FeedbackModalProps) => {
  const onClose = () => setOpen(false)

  return (
    <Modal
      aria-labelledby="feedback"
      aria-describedby="feedback"
      disablePortal // to prevent findDOMNode warning, see https://github.com/Amsterdam/amsterdam-styled-components/issues/2389
      hideOverFlow={false}
      onClose={onClose}
      open={open}
      zIndexOffset={Z_INDEX_MENU_MODAL}
    >
      <TopBar>
        <Heading as="h4">
          Feedback
          <Button
            variant="blank"
            title="Sluit"
            type="button"
            size={30}
            onClick={onClose}
            icon={<Close />}
          />
        </Heading>
      </TopBar>

      <Divider />

      <ModalBlock>
        <Heading as="h4">Onjuistheid terugmelden</Heading>
        <Paragraph>
          We horen graag welke gegevens onjuist zijn of ontbreken.
        </Paragraph>
        <Button
          as="a"
          variant="primary"
          href={getMailtoLink(
            FEEDBACK_RECIPIENT,
            FEEDBACK_SUBJECT,
            FEEDBACK_BODY
          )}
        >
          Onjuistheid terugmelden
        </Button>
      </ModalBlock>

      <Divider gutter />

      <ModalBlock>
        <Heading as="h4">Overige vragen</Heading>
        <Paragraph>
          Als iets op deze pagina niet goed werkt, onduidelijk is of vragen
          oproept, geef het aan ons door.
        </Paragraph>
        <Button
          as="a"
          variant="primary"
          href={getMailtoLink(
            QUESTION_RECIPIENT,
            QUESTION_SUBJECT,
            QUESTION_BODY
          )}
        >
          Vraag indienen
        </Button>
      </ModalBlock>
    </Modal>
  )
}

export default FeedbackModal
