import { Label, Radio, RadioGroup } from '@amsterdam/asc-ui'
import { aerialImages, topoBlackWhite, topoColorLight } from '../../../../shared/map/mapLayers'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'

const ProhibitorySignsMapLegendBaseLayers = () => {
  const { activeBaseLayer, setActiveBaseLayer } = useProhibitorySignsMapContext()
  const { expertMode } = useProhibitorySignsPageContext()

  const baseLayers = [
    aerialImages,
    {
      ...topoBlackWhite,
      label: expertMode ? topoBlackWhite.label : 'Topografie',
    },
  ]

  if (expertMode) {
    baseLayers.push(topoColorLight)
  }

  return (
    <RadioGroup name="group">
      {baseLayers.map(item => {
        return (
          <Label htmlFor={item.id} key={item.id} label={item.label}>
            <Radio
              id={item.id}
              checked={item.id === activeBaseLayer}
              onClick={e => {
                setActiveBaseLayer(item.id)
                e.currentTarget.blur()
              }}
            />
          </Label>
        )
      })}
    </RadioGroup>
  )
}

export default ProhibitorySignsMapLegendBaseLayers
