import {
  CompactThemeProvider,
  Heading,
  Paragraph,
  themeSpacing,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { PropertiesContainer } from './DetailFeatureStyles'

import { useTouringcarMapContext } from '../../contexts/MapContext'

const AdditionalInfo = styled.div`
  border: 1px solid ${props => props.theme.colors.tint?.level5};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 60%;
  padding: ${themeSpacing(1)} ${themeSpacing(2)};
  text-align: center;
  word-break: break-word;
`

const ParkingSpaceDetailFeature = () => {
  const { currentParkingSpace } = useTouringcarMapContext()

  return (
    <>
      {currentParkingSpace?.properties?.additional_info && (
        <AdditionalInfo>
          {currentParkingSpace.properties.additional_info}
        </AdditionalInfo>
      )}

      <CompactThemeProvider>
        <Heading as="h2">
          {currentParkingSpace?.properties?.omschrijving}
        </Heading>
        <Paragraph>{currentParkingSpace?.properties?.plaatsen}</Paragraph>
        <Paragraph>{currentParkingSpace?.properties?.bijzonderheden}</Paragraph>
        <Paragraph>{currentParkingSpace?.properties?.meerInformatie}</Paragraph>
      </CompactThemeProvider>
    </>
  )
}

export default ParkingSpaceDetailFeature
