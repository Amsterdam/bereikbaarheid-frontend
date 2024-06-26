import { useMapInstance } from '@amsterdam/arm-core'
import { Accordion, Button, Heading, Image, Link, List, ListItem, Paragraph, themeColor } from '@amsterdam/asc-ui'
import { t } from 'i18next'
import useTouringcarMapContext from 'pages/Touringcar/contexts/MapContext'
import styled from 'styled-components'

import { api } from '../../../../api/bereikbaarheid'

import useMessages, { getMessagePartsForLanguage } from './hooks/useMessages'

const StyledAccordion = styled(Accordion)<{ important?: boolean }>`
  border: 2px solid ${props => (props.important ? themeColor('secondary') : themeColor('primary'))};
  border-left: 8px solid ${props => (props.important ? themeColor('secondary') : themeColor('primary'))};
  background-color: ${themeColor('bright')};

  &:hover,
  &:focus,
  &::focus {
    border: 2px solid ${props => (props.important ? themeColor('secondary') : themeColor('primary'))};
    border-left: 8px solid ${props => (props.important ? themeColor('secondary') : themeColor('primary'))};
    background-color: ${themeColor('bright')};
    cursor: pointer;
  }
`

function MessagesList() {
  const mapInstance = useMapInstance()

  const { currentMessage } = useTouringcarMapContext()
  const { isLoading, isError, error, sortedMessages } = useMessages()

  if (isError && error instanceof Error) console.error(error.message)
  if (isLoading || !sortedMessages?.length) return null

  return (
    <List>
      {sortedMessages?.map((message, index) => {
        const msgParts = getMessagePartsForLanguage(message)

        return (
          <ListItem key={message.id}>
            <StyledAccordion
              title={`B${index + 1}: ${msgParts.title}`}
              isOpen={
                currentMessage?.id === message.id ||
                (!currentMessage && message.properties.important) ||
                sortedMessages?.length === 1
              }
              important={message.properties.important}
            >
              {msgParts.body && <Paragraph>{msgParts.body}</Paragraph>}
              {message.properties.image_url && (
                <Paragraph>
                  <Image
                    src={api.getUri({ url: `public-storage/${message.properties.image_url}` })}
                    alt={msgParts.title}
                  />
                </Paragraph>
              )}
              {msgParts.advice && (
                <>
                  <Heading as="h3">{t('_pageTouringcar._mapPanel._messages.advice')}</Heading>
                  <Paragraph>{msgParts.advice}</Paragraph>
                </>
              )}
              {message.properties.link && (
                <>
                  <Heading as="h3">{t('_pageTouringcar._mapPanel._messages.moreInfo')}</Heading>
                  <Paragraph>
                    <Link href={message.properties.link} target="_blank">
                      {message.properties.link}
                    </Link>
                  </Paragraph>
                </>
              )}
              {message.properties.category && (
                <Paragraph>
                  <strong>{t('_pageTouringcar._mapPanel._messages.category')}:</strong> {message.properties.category}
                </Paragraph>
              )}
              {message.properties.startdate && (
                <Paragraph style={{ marginBlockEnd: 0 }}>
                  <strong>{t('_pageTouringcar._mapPanel._messages.startDate')}:</strong> {message.properties.startdate}
                </Paragraph>
              )}
              {message.properties.enddate && (
                <Paragraph>
                  <strong>{t('_pageTouringcar._mapPanel._messages.endDate')}:</strong> {message.properties.enddate}
                </Paragraph>
              )}

              <Button
                variant="secondary"
                onClick={event => {
                  if (!message?.geometry?.coordinates?.[0]) return

                  mapInstance.flyTo([message.geometry.coordinates[1], message.geometry.coordinates[0]], 20)
                }}
              >
                {t('_pageTouringcar._mapPanel._messages.viewOnMap')}
              </Button>
            </StyledAccordion>
          </ListItem>
        )
      })}
    </List>
  )
}

export default MessagesList
