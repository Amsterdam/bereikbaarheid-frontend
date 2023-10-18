import { Dispatch, SetStateAction } from 'react'

import { MapPanelContent, MapPanelContentProps } from '@amsterdam/arm-core'
import {
  Button,
  Column,
  CompactThemeProvider,
  Heading,
  Paragraph,
  Row,
  Tab,
  Tabs,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import { formatISODate } from 'shared/utils/dateTime'
import styled from 'styled-components'

import { DataSourcesAside } from '../../DataSources/components/DataSourcesBlocks'
import { useLoadUnloadPageContext } from '../contexts/PageContext'
import { LoadUnloadPageProvider } from '../contexts/PageProvider'
import dataLinks from '../data/dataLinks'

const DateTimeHeaderRow = styled(Row)`
  margin-top: ${themeSpacing(4)};
`

const FiltersContainer = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  padding: 0.625rem 1.875rem 0.625rem 0.625rem;

  > div:not(:last-child) {
    margin-bottom: ${themeSpacing(2)};
  }
`

const EditSettingButton = styled(Button)`
  align-self: stretch;
  margin-bottom: ${themeSpacing(2)};
`

interface MapSettingsDisplayProps extends MapPanelContentProps {
  setShowAddressForm: Dispatch<SetStateAction<boolean>>
  setShowDateTimeModal: Dispatch<SetStateAction<boolean>>
}

export const LoadUnloadMapSettingsDisplay = ({
  setShowAddressForm,
  setShowDateTimeModal,
  ...otherProps
}: MapSettingsDisplayProps) => {
  const { t } = useTranslation()
  const { address, dateTime } = useLoadUnloadPageContext()
  const showAddressForm = () => setShowAddressForm(true)
  const showDateTimeModal = () => setShowDateTimeModal(true)

  return (
    <MapPanelContent data-testid="map-settings" {...otherProps}>
      <Tabs label="Voer adres en moment in of bekijk dataverantwoording">
        <Tab id="input" label={t('input')}>
          <CompactThemeProvider>
            <Row halign="space-between" hasMargin={false}>
              <Column span={12}>
                <Heading as="h3" style={{ marginTop: 16 }}>
                  Adres
                </Heading>
                <EditSettingButton
                  data-testid="change-address"
                  variant="textButton"
                  onClick={showAddressForm}
                >
                  wijzig
                </EditSettingButton>
              </Column>
            </Row>

            <FiltersContainer>
              <Row halign="flex-start" hasMargin={false}>
                <Column span={12}>
                  <Paragraph gutterBottom={0}>
                    {address.label ?? 'Geen adres ingesteld'}
                  </Paragraph>
                </Column>
              </Row>
            </FiltersContainer>

            <DateTimeHeaderRow halign="space-between" hasMargin={false}>
              <Column span={12}>
                <Heading as="h3">Datum en tijd</Heading>
                <EditSettingButton
                  data-testid="change-date-time"
                  variant="textButton"
                  onClick={showDateTimeModal}
                >
                  wijzig
                </EditSettingButton>
              </Column>
            </DateTimeHeaderRow>

            <FiltersContainer>
              <Row halign="flex-start" hasMargin={false}>
                <Column span={4}>
                  <Paragraph gutterBottom={0} strong>
                    Datum
                  </Paragraph>
                </Column>
                <Column span={6}>
                  <Paragraph gutterBottom={0}>
                    {formatISODate(dateTime.date, 'dd-MM-yyyy')}
                  </Paragraph>
                </Column>
              </Row>

              <Row halign="flex-start" hasMargin={false}>
                <Column span={4}>
                  <Paragraph gutterBottom={0} strong>
                    Van
                  </Paragraph>
                </Column>
                <Column span={6}>
                  <Paragraph gutterBottom={0}>{dateTime.timeFrom}</Paragraph>
                </Column>
              </Row>

              <Row halign="flex-start" hasMargin={false}>
                <Column span={4}>
                  <Paragraph gutterBottom={0} strong>
                    Tot
                  </Paragraph>
                </Column>
                <Column span={6}>
                  <Paragraph gutterBottom={0}>{dateTime.timeTo}</Paragraph>
                </Column>
              </Row>
            </FiltersContainer>
          </CompactThemeProvider>
        </Tab>

        <Tab id="data" label={t('dataSource')}>
          <LoadUnloadPageProvider>
            <DataSourcesAside dataLinks={dataLinks} />
          </LoadUnloadPageProvider>
        </Tab>
      </Tabs>
    </MapPanelContent>
  )
}
