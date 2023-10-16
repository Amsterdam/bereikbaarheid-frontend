import { RoadSectionObstructions } from 'api/bereikbaarheid/road-obstructions'
import { WiorFeature } from 'api/wfs/wior'

export type DetailFeatureRoadSection = {
  data: RoadSectionObstructions
  type: 'roadSectionObstructions'
}

export type DetailFeatureWior = {
  data: WiorFeature
  type: 'wior'
}

export type DetailFeature = DetailFeatureRoadSection | DetailFeatureWior
