import { Paragraph } from '@amsterdam/asc-ui'
import endsWith from 'lodash/endsWith'
import styled from 'styled-components'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { trafficSignBackgrounds } from '../TrafficSignMarker/backgrounds'

import { ImageContainer, Image } from './DetailFeatureStyles'

const imageTextPadding: Record<string, string> = {
  c17: '12px',
  c20: '20px',
}

const ImageTextContainer = styled(Paragraph)<{ signType: string }>`
  padding-bottom: ${props => (props.signType ? imageTextPadding[props.signType] : 0)};
  position: absolute;
`

const ProhibitorySignsDetailFeatureTrafficSignImage = () => {
  const { currentTrafficSign } = useProhibitorySignsMapContext()

  const signType = currentTrafficSign?.properties.type.toLowerCase()
  const isZonalSign = endsWith(signType, 'zb')
  const signCategory = currentTrafficSign?.properties.category
  const imageText = () => {
    let text = currentTrafficSign?.properties.label

    if (typeof text === 'string') {
      text = text.replace(/t|m|/g, '').trim()
    }

    return text !== 'None' ? text : null
  }

  if (!signType || !signCategory) return null

  return (
    <ImageContainer>
      <Image src={trafficSignBackgrounds[signType][signCategory]} />
      {!isZonalSign && (
        <ImageTextContainer gutterBottom={0} strong signType={signType}>
          {imageText()}
        </ImageTextContainer>
      )}
    </ImageContainer>
  )
}

export default ProhibitorySignsDetailFeatureTrafficSignImage
