import { useEffect } from 'react'

import { useMapInstance } from '@amsterdam/arm-core'
import { Accordion, Button, Heading, Image, Link, List, ListItem, Paragraph, themeColor } from '@amsterdam/asc-ui'
import { useQuery } from '@tanstack/react-query'
import getTouringcarMessages from 'api/touringcar/messages'
import { format } from 'date-fns'
import i18n from 'i18n'
import { t } from 'i18next'
import useTouringcarMapContext from 'pages/Touringcar/contexts/MapContext'
import { DATE_FORMAT_REVERSED, DateHumanReadable_Year_Month_Day } from 'shared/utils/dateTime'
import styled from 'styled-components'

const StyledAccordion = styled(Accordion)<{ important?: boolean }>`
  border: 2px solid ${props => (props.important ? themeColor('secondary') : themeColor('primary'))};
  border-left: 8px solid ${props => (props.important ? themeColor('secondary') : themeColor('primary'))};
  background-color: ${themeColor('bright')};

  &:hover,
  &:focus,
  &&:focus {
    border: 2px solid ${props => (props.important ? themeColor('secondary') : themeColor('primary'))};
    border-left: 8px solid ${props => (props.important ? themeColor('secondary') : themeColor('primary'))};
    background-color: ${themeColor('bright')};
    cursor: pointer;
  }
`

function MessagesList() {
  const { messagesDate } = useTouringcarMapContext()
  const mapInstance = useMapInstance()

  const { isLoading, error, isError, data, refetch } = useQuery({
    enabled: true,
    queryKey: ['touringcarMessages'],
    queryFn: () => {
      return getTouringcarMessages({
        datum: format(messagesDate, DATE_FORMAT_REVERSED) as DateHumanReadable_Year_Month_Day,
      })
    },
  })

  useEffect(() => {
    refetch()
  }, [refetch, messagesDate])

  if (isError && error instanceof Error) console.error(error.message)
  if (isLoading || !data?.features) return null

  return (
    <List>
      {data?.features.map((message, index) => {
        // @ts-ignore
        const msgParts = message.properties[i18n.language || 'nl']

        return (
          <ListItem>
            <StyledAccordion
              title={`(${index + 1}) ${msgParts.title}`}
              isOpen={message.properties.important ?? data?.features.length === 1}
              important={message.properties.important}
            >
              <Button
                forwardedAs={Link}
                inlist
                onClick={({ preventDefault }) => {
                  preventDefault()

                  if (!message?.geometry?.coordinates?.[0]) return

                  mapInstance.flyTo([message.geometry.coordinates[1], message.geometry.coordinates[0]], 20)
                }}
              >
                View on map
              </Button>
              <Paragraph>{msgParts.body}</Paragraph>
              {message.properties.image_url ?? (
                <Paragraph>
                  <Image src={message.properties.image_url} alt={msgParts.title} />
                </Paragraph>
              )}
              {msgParts.advice ?? (
                <Paragraph>
                  <Heading as="h3">{t('_pageTouringcar._mapPanel._messages.advice')}</Heading>
                  {msgParts.advice}
                </Paragraph>
              )}
              {message.properties.link ?? (
                <Paragraph>
                  <Heading as="h3">{t('_pageTouringcar._mapPanel._messages.moreInfo')}</Heading>
                  <Link to={message.properties.link}>{message.properties.link}</Link>
                </Paragraph>
              )}
              {message.properties.category ?? (
                <Paragraph>
                  <strong>{t('_pageTouringcar._mapPanel._messages.category')}:</strong> {message.properties.category}
                </Paragraph>
              )}
              {message.properties.startdate ?? (
                <Paragraph style={{ marginBlockEnd: 0 }}>
                  <strong>{t('_pageTouringcar._mapPanel._messages.startDate')}:</strong> {message.properties.startdate}
                </Paragraph>
              )}
              {message.properties.enddate ?? (
                <Paragraph>
                  <strong>{t('_pageTouringcar._mapPanel._messages.endDate')}:</strong> {message.properties.enddate}
                </Paragraph>
              )}
            </StyledAccordion>
          </ListItem>
        )
      })}
    </List>
  )
}

export default MessagesList
