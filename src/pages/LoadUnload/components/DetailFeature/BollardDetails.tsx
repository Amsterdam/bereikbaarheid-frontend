import { Column, CompactThemeProvider, Row } from '@amsterdam/asc-ui'
import { Bollard } from 'api/bereikbaarheid/bollards'
import useLoadUnloadMapContext from 'pages/LoadUnload/contexts/MapContext'
import { useTranslation } from 'react-i18next'
import { PropertiesContainer } from 'shared/components/DetailFeature/DetailFeatureStyles'
import styled from 'styled-components'

const PropContainer = styled(PropertiesContainer)`
  margin-top: 0;
`

function BollardDetails({ bollard }: { bollard: Bollard }) {
  const { t } = useTranslation()

  const { setCurrentBollard } = useLoadUnloadMapContext()

  if (!bollard?.properties) {
    setCurrentBollard(undefined)
    return <></>
  }

  return (
    <PropContainer data-testid="detail-feature-road-section">
      <CompactThemeProvider>
        {bollard.properties.id && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>{t('_pageLoadUnload._mapPanel.id')}</Column>
            <Column span={6}>{bollard.properties.id}</Column>
          </Row>
        )}

        {bollard.properties.type && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>{t('_pageLoadUnload._mapPanel.type')}</Column>
            <Column span={6}>{bollard.properties.type}</Column>
          </Row>
        )}

        {bollard.properties.location && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>{t('_pageLoadUnload._mapPanel.location')}</Column>
            <Column span={6}>{bollard.properties.location}</Column>
          </Row>
        )}

        {bollard.properties.days && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>{t('_pageLoadUnload._mapPanel.days')}</Column>
            <Column span={6}>
              {bollard.properties.days.reduce((acc, cur) => {
                if (!acc) return cur
                return `${acc}, ${cur}`
              }, '')}
            </Column>
          </Row>
        )}

        {bollard.properties.window_times && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>{t('_pageLoadUnload._mapPanel.windowTimes')}</Column>
            <Column span={6}>{bollard.properties.window_times}</Column>
          </Row>
        )}

        {bollard.properties.entry_system && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>{t('_pageLoadUnload._mapPanel.entrySystem')}</Column>
            <Column span={6}>{bollard.properties.entry_system}</Column>
          </Row>
        )}

        {bollard.properties.details && (
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>{t('_pageLoadUnload._mapPanel.details')}</Column>
            <Column span={6}>{bollard.properties.details}</Column>
          </Row>
        )}
      </CompactThemeProvider>
    </PropContainer>
  )
}

export default BollardDetails
