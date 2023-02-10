import { Close } from '@amsterdam/asc-assets'
import {
  Button,
  Divider,
  Heading,
  Link,
  List,
  ListItem,
  Modal,
  Paragraph,
  TopBar,
} from '@amsterdam/asc-ui'
import { Dispatch, SetStateAction } from 'react'

import { Z_INDEX_MENU_MODAL } from '../../constants'
import ModalBlock from '../ModalBlock'
import { getMailtoLink } from './index'

interface DataLink {
  href: string
  title: string
}

interface DataModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<DataModalProps['open']>>
  dataLinks: DataLink[]
}

export const DataModal = ({ open, setOpen, dataLinks }: DataModalProps) => {
  const onClose = () => setOpen(false)

  const URL_ALL_DATA = `https://data.amsterdam.nl/datasets/YLTyzpWP6Vz2QQ/amsterdams-wegenbestand/`

  const QUESTION_RECIPIENT = 'b.bussink@amsterdam.nl'
  const QUESTION_SUBJECT = `Vraag over data van bereikbaarheid.amsterdam.nl`
  const QUESTION_BODY = `Beschrijf zo volledig mogelijk waar je tegenaan loopt:
  - Welke data probeer je te downloaden?
  - Als je een probleem ondervindt, welke melding zie je op het scherm?
  - Heb je een suggestie hoe het anders zou kunnen?
  `

  return (
    <Modal
      aria-labelledby="data"
      aria-describedby="data"
      disablePortal // to prevent findDOMNode warning, see https://github.com/Amsterdam/amsterdam-styled-components/issues/2389
      hideOverFlow={false}
      onClose={onClose}
      open={open}
      zIndexOffset={Z_INDEX_MENU_MODAL}
    >
      <TopBar>
        <Heading as="h4">
          Data
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
        <Heading as="h4">Getoonde data op de kaart</Heading>
        <Paragraph gutterBottom={4}>
          Download de getoonde data op de kaart via de volgende links:
        </Paragraph>
        <List>
          {dataLinks.map((item, index) => {
            return (
              <ListItem key={index}>
                <Link href={item.href} target="_blank" inList>
                  {item.title}
                </Link>
              </ListItem>
            )
          })}
        </List>
      </ModalBlock>

      <Divider gutter />

      <ModalBlock>
        <Heading as="h4">Amsterdams Wegenbestand</Heading>
        <Paragraph>
          Op{' '}
          <Link href={URL_ALL_DATA} target="_blank" variant="inline">
            deze pagina
          </Link>{' '}
          kunt u de volledige dataset en de bijbehorende documentatie
          downloaden.
        </Paragraph>
      </ModalBlock>

      <Divider gutter />

      <ModalBlock>
        <Heading as="h4">Vragen?</Heading>
        <Paragraph>
          Heeft u suggesties? Of vragen over het format of het gebruik van de
          data?{' '}
          <Link
            href={getMailtoLink(
              QUESTION_RECIPIENT,
              QUESTION_SUBJECT,
              QUESTION_BODY
            )}
            target="_blank"
            variant="inline"
          >
            Laat het ons weten
          </Link>
          .
        </Paragraph>
      </ModalBlock>
    </Modal>
  )
}
