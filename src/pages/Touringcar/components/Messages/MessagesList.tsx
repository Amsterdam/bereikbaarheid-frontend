import { useEffect } from 'react'

import { useMapInstance } from '@amsterdam/arm-core'
import { Accordion, Heading, Image, Link, List, ListItem, Paragraph, themeColor } from '@amsterdam/asc-ui'
import { useQuery } from '@tanstack/react-query'
import getTouringcarMessages from 'api/touringcar/messages'
import { format } from 'date-fns'
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
    <Paragraph>
      <List>
        {data?.features.map((feat, index) => (
          <ListItem>
            <StyledAccordion
              title={`(${index + 1}) ${feat.properties.title}`}
              isOpen={feat.properties.important ?? data?.features.length === 1}
              important={feat.properties.important}
              onClick={() => {
                mapInstance.flyTo([feat.geometry.coordinates[1], feat.geometry.coordinates[0]], 20)
              }}
            >
              <Paragraph>{feat.properties.body}</Paragraph>
              {feat.properties.image_url ?? (
                <Paragraph>
                  <Image src={feat.properties.image_url} alt={feat.properties.title} />
                </Paragraph>
              )}
              {feat.properties.advice ?? (
                <Paragraph>
                  {/* TODO: i18n */}
                  <Heading as="h3">Advies</Heading>
                  {feat.properties.advice}
                </Paragraph>
              )}
              {feat.properties.link ?? (
                <Paragraph>
                  {/* TODO: i18n */}
                  <Heading as="h3">Meer informatie</Heading>
                  <Link to={feat.properties.link}>{feat.properties.link}</Link>
                </Paragraph>
              )}
              {feat.properties.category ?? (
                <Paragraph>
                  {/* TODO: i18n */}
                  <strong>Categorie:</strong> {feat.properties.category}
                </Paragraph>
              )}
              {feat.properties.startdate ?? (
                <Paragraph style={{ marginBlockEnd: 0 }}>
                  {/* TODO: i18n */}
                  <strong>Begindatum:</strong> {feat.properties.startdate}
                </Paragraph>
              )}
              {feat.properties.enddate ?? (
                <Paragraph>
                  {/* TODO: i18n */}
                  <strong>Einddatum:</strong> {feat.properties.enddate}
                </Paragraph>
              )}
            </StyledAccordion>
          </ListItem>
        ))}
      </List>
    </Paragraph>
  )
}

export default MessagesList
