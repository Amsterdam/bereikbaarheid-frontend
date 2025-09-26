import { RoadSectionLoadUnload } from '../../../api/bereikbaarheid/road-sections/load-unload'
import { ParkingSpace } from '../../../api/parkeervakken'

export type DetailFeatureParkingSpace = {
  id: string
  data: ParkingSpace
  type: 'parkingSpace'
}

export type DetailFeatureRoadSectionLoadUnload = {
  id: string
  data: RoadSectionLoadUnload
  type: 'roadSectionLoadUnload'
}

export type LoadUnloadDetailFeature = DetailFeatureParkingSpace | DetailFeatureRoadSectionLoadUnload
