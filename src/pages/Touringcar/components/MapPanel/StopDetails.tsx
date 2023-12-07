import { useEffect, useState } from 'react'

import { CompactThemeProvider, Heading, Paragraph, themeSpacing } from '@amsterdam/asc-ui'
import { useQuery } from '@tanstack/react-query'
import getPanoramaThumbnail from 'api/panorama/thumbnail'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useTouringcarMapContext } from '../../contexts/MapContext'

import ImageWithLoading from './ImageWithLoading'

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

const StopDetails = () => {
  const { currentStop } = useTouringcarMapContext()

  const { t } = useTranslation()

  const [imageLoading, setImageLoading] = useState(false)

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
      if (currentStop?.geometry.coordinates.length !== 2) {
        throw new Error('Coordinates are required.')
      }

      return getPanoramaThumbnail({
        lat: currentStop?.geometry.coordinates[1],
        lon: currentStop?.geometry.coordinates[0],
        width: PANORAMA_WIDTH_PX,
        aspect: PANORAMA_ASPECT_RATIO,
      })
    },
  })

  useEffect(() => {
    if (currentStop) {
      ;(async () => {
        setImageLoading(true)
        await refetch({ cancelRefetch: true })
        setImageLoading(false)
        return
      })()
    }

    return () => {
      setImageLoading(false)
      refetch({ cancelRefetch: true })
    }
  }, [currentStop, refetch])

  return (
    <>
      {currentStop?.properties?.additional_info && (
        <PaddedContainer>
          <AdditionalInfo>{currentStop.properties.additional_info}</AdditionalInfo>
        </PaddedContainer>
      )}

      <CompactThemeProvider>
        <PaddedContainer>
          <Heading as="h2">{currentStop?.properties?.omschrijving}</Heading>
        </PaddedContainer>

        {!isLoading && !error && !isError && panoramaThumbnail && (
          <ImageWithLoading
            loading={isLoading || imageLoading}
            src={panoramaThumbnail}
            alt={currentStop?.properties?.omschrijving}
            width={PANORAMA_WIDTH_PX}
            height={PANORAMA_WIDTH_PX / PANORAMA_ASPECT_RATIO}
          />
        )}

        <PaddedContainer>
          <Paragraph>
            <strong>{t('_pageTouringcar.places')}:</strong> {currentStop?.properties?.plaatsen}
          </Paragraph>

          <Paragraph>{currentStop?.properties?.bijzonderheden}</Paragraph>
        </PaddedContainer>
      </CompactThemeProvider>
    </>
  )
}

export default StopDetails
