import { useEffect } from 'react'

import { useMapInstance } from '@amsterdam/arm-core'
import { NonTiledLayer } from '@amsterdam/arm-nontiled'
import { loadUnloadSpaces } from 'shared/map/mapLayers'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'

const ProhibitorySignsLoadUnloadSpacesLayer = () => {
  const mapInstance = useMapInstance()
  const { activeMapLayers, setLocation } = useProhibitorySignsMapContext()
  const { showScenarioWizard } = useProhibitorySignsPageContext()

  useEffect(() => {
    mapInstance.on('click', e => {
      if (mapInstance.getZoom() >= loadUnloadSpaces.options.minZoom!) {
        setLocation([e.latlng.lat, e.latlng.lng])
      }
    })
  }, [mapInstance, setLocation])

  if (showScenarioWizard) return null

  if (!activeMapLayers[loadUnloadSpaces.id]) return null

  return <NonTiledLayer url={loadUnloadSpaces.url} options={loadUnloadSpaces.options}></NonTiledLayer>
}

export default ProhibitorySignsLoadUnloadSpacesLayer
