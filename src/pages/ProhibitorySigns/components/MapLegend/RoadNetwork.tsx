import { Checkbox, CompactThemeProvider, Label } from '@amsterdam/asc-ui'
import MapLegendItem from 'shared/components/MapLegendItem'
import {
  LegendWrapper,
  LegendItemsWrapper,
} from 'shared/components/MapLegendStyles'
import {
  roadNetworkHeavyGoodsVehicleZone,
  roadNetworkLowEmissionZone,
  roadNetworkHeavyGoodsVehicleAndLowEmissionZone,
} from 'shared/map/mapLayers'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { prohibitoryRoadsLayerId } from '../../contexts/mapLayersReducer'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { useActiveRoadNetwork } from '../../hooks/useActiveRoadNetwork'
import { prohibitoryRoadsColors } from '../MapLayers/ProhibitoryRoadsLayer'

const ProhibitorySignsMapLegendRoadNetwork = () => {
  const activeRoadNetwork = useActiveRoadNetwork()
  const { activeMapLayers, updateActiveMapLayers } =
    useProhibitorySignsMapContext()
  const { showScenarioWizard } = useProhibitorySignsPageContext()

  const toggleRoadNetworks = () => {
    updateActiveMapLayers({ type: 'TOGGLE', layerId: activeRoadNetwork })
    updateActiveMapLayers({ type: 'TOGGLE', layerId: prohibitoryRoadsLayerId })
  }

  if (showScenarioWizard) {
    return null
  }

  return (
    <>
      <LegendWrapper>
        <Label htmlFor="mapLegendRoadNetwork" label="Benodigde ontheffingen">
          <Checkbox
            id="mapLegendRoadNetwork"
            onChange={toggleRoadNetworks}
            checked={activeMapLayers[activeRoadNetwork]}
          />
        </Label>

        <CompactThemeProvider>
          <LegendItemsWrapper>
            {activeRoadNetwork === roadNetworkHeavyGoodsVehicleZone.id && (
              <>
                <MapLegendItem color="#fe47aa" text="Zone zwaar verkeer" />

                <MapLegendItem
                  color={prohibitoryRoadsColors.heavyGoodsRvv}
                  text="Zone zwaar verkeer & RVV"
                />
              </>
            )}

            {(activeRoadNetwork === roadNetworkLowEmissionZone.id ||
              activeRoadNetwork ===
                roadNetworkHeavyGoodsVehicleAndLowEmissionZone.id) && (
              <>
                <MapLegendItem color="#1786fb" text="Milieuzone" />

                <MapLegendItem
                  color={prohibitoryRoadsColors.lowEmissionRvv}
                  text="Milieuzone & RVV"
                />
              </>
            )}

            {activeRoadNetwork ===
              roadNetworkHeavyGoodsVehicleAndLowEmissionZone.id && (
              <>
                <MapLegendItem
                  color="#8585ff"
                  text="Zone zwaar verkeer & Milieuzone"
                />

                <MapLegendItem
                  color={prohibitoryRoadsColors.lowEmissionHeavyGoodsRvv}
                  text="Zone zwaar verkeer, Milieuzone & RVV"
                />
              </>
            )}

            <MapLegendItem color={prohibitoryRoadsColors.rvv} text="RVV" />

            <MapLegendItem color="#00b100" text="Geen ontheffing" />

            <MapLegendItem color="#000" text="Buiten Amsterdam" />
          </LegendItemsWrapper>
        </CompactThemeProvider>
      </LegendWrapper>
    </>
  )
}

export default ProhibitorySignsMapLegendRoadNetwork
