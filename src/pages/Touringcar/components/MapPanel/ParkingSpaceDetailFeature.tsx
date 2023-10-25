import { useEffect } from 'react'

import {
  CompactThemeProvider,
  Heading,
  Image,
  Link,
  Paragraph,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { useQuery } from '@tanstack/react-query'
import getPanoramaThumbnail from 'api/panorama/thumbnail'
import styled from 'styled-components'

import { useTouringcarMapContext } from '../../contexts/MapContext'

const PANORAMA_WIDTH_PX = 450
const PANORAMA_ASPECT_RATIO = 1.5

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

const PaddedContainer = styled.div`
  padding: 1em;
`

const ParkingSpaceDetailFeature = () => {
  const { currentParkingSpace } = useTouringcarMapContext()

  const {
    isLoading,
    error,
    isError,
    data: panoramaThumbnail,
    refetch,
  } = useQuery({
    enabled: true,
    queryKey: ['panoramaThumbnail'],
    queryFn: () => {
      if (!currentParkingSpace?.geometry.coordinates.length) {
        throw new Error('Coordinates are required.')
      }

      return getPanoramaThumbnail({
        lat: currentParkingSpace?.geometry.coordinates[1],
        lon: currentParkingSpace?.geometry.coordinates[0],
        width: PANORAMA_WIDTH_PX,
        aspect: PANORAMA_ASPECT_RATIO,
      })
    },
  })

  useEffect(() => {
    if (currentParkingSpace) {
      refetch()
    }
  }, [currentParkingSpace, refetch])

  return (
    <>
      {currentParkingSpace?.properties?.additional_info && (
        <PaddedContainer>
          <AdditionalInfo>
            {currentParkingSpace.properties.additional_info}
          </AdditionalInfo>
        </PaddedContainer>
      )}

      <CompactThemeProvider>
        <PaddedContainer>
          <Heading as="h2">
            {currentParkingSpace?.properties?.omschrijving}
          </Heading>
        </PaddedContainer>

        {!isLoading && !error && !isError && panoramaThumbnail && (
          <Image
            src={panoramaThumbnail}
            alt={currentParkingSpace?.properties?.omschrijving}
            width={PANORAMA_WIDTH_PX}
            height={PANORAMA_WIDTH_PX / PANORAMA_ASPECT_RATIO}
            style={{ height: PANORAMA_WIDTH_PX / PANORAMA_ASPECT_RATIO }}
          />
        )}

        <PaddedContainer>
          <Paragraph>
            <strong>Plaatsen:</strong>{' '}
            {currentParkingSpace?.properties?.plaatsen}
          </Paragraph>

          <Paragraph>
            {currentParkingSpace?.properties?.bijzonderheden}
          </Paragraph>

          {currentParkingSpace?.properties?.meerInformatie && (
            <Paragraph>
              <strong>Meer informatie:</strong>{' '}
              {currentParkingSpace.properties.meerInformatie.startsWith(
                'https://'
              ) ||
              currentParkingSpace.properties.meerInformatie.startsWith(
                'http://'
              ) ||
              currentParkingSpace.properties.meerInformatie.startsWith(
                'www.'
              ) ? (
                <Link
                  href={currentParkingSpace.properties.meerInformatie}
                  target="_blank"
                >
                  {currentParkingSpace.properties.meerInformatie}
                </Link>
              ) : (
                currentParkingSpace.properties.meerInformatie
              )}
            </Paragraph>
          )}
        </PaddedContainer>
      </CompactThemeProvider>
    </>
  )
}

export default ParkingSpaceDetailFeature
