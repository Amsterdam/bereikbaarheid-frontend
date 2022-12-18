import { MapPanelContent, MapPanelContentProps } from '@amsterdam/arm-core'
import {
  Button,
  Column,
  CompactThemeProvider,
  Heading,
  Paragraph,
  Row,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

import { useLoadUnloadPageContext } from '../contexts/PageContext'

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
}

export const LoadUnloadMapSettingsDisplay = ({
  setShowAddressForm,
  ...otherProps
}: MapSettingsDisplayProps) => {
  const { address } = useLoadUnloadPageContext()
  const showAddressForm = () => setShowAddressForm(true)

  return (
    <MapPanelContent {...otherProps}>
      <CompactThemeProvider>
        <Row halign="space-between" hasMargin={false}>
          <Column span={12}>
            <Heading as="h3">Adres</Heading>
            <EditSettingButton variant="textButton" onClick={showAddressForm}>
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
      </CompactThemeProvider>
    </MapPanelContent>
  )
}
