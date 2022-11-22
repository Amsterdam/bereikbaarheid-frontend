//
// Amsterdam Geosearch API
// https://api.data.amsterdam.nl/api/swagger/?url=/geosearch/docs/geosearch.yml
//

import axios from 'axios'
import { Feature, FeatureCollection } from 'geojson'

export const API_URL = 'https://api.data.amsterdam.nl/geosearch/'

interface SearchAllDatasetsFeature extends Feature {
  properties: {
    id: string
    display: string
    type: string
    uri: string
    distance: number
  }
}

export interface SearchAllDatasetsFeatureCollection extends FeatureCollection {
  features: [] | SearchAllDatasetsFeature[]
}

export interface SearchAllDatasetsProps {
  datasets: string
  lat: number | undefined
  lon: number | undefined
  radius: number
}

export function searchAllDatasets(
  params: SearchAllDatasetsProps,
  signal: AbortSignal | undefined
): Promise<SearchAllDatasetsFeatureCollection> {
  return typeof params.lat === 'undefined' || typeof params.lon === 'undefined'
    ? Promise.reject(new Error('Please provide a lat and a lon param'))
    : axios
        .get(API_URL, {
          params: params,
          signal,
        })
        .then(response => response.data)
}
