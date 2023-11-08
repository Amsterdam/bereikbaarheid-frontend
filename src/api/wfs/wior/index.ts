import axios from 'axios'
import { Feature, FeatureCollection } from 'geojson'

export const ENDPOINT = 'https://api.data.amsterdam.nl/v1/wfs/wior/'

export interface WiorFeature extends Feature {
  properties: {
    id: string
    wior_nummer: string
    projectnaam: string
    beschrijving: string
    datum_start_uitvoering: string
    datum_einde_uitvoering: string
    periode_geplande_uitvoering: string
    hoofdstatus: string
    type_werkzaamheden: string | null
  }
}

export interface WiorFeatureCollection extends FeatureCollection {
  features: [] | WiorFeature[]
}

export function getWiorData(cqlFilter: string, signal: AbortSignal | undefined): Promise<WiorFeatureCollection> {
  return axios
    .get(ENDPOINT, {
      params: {
        SERVICE: 'WFS',
        VERSION: '2.0.0',
        REQUEST: 'GetFeature',
        TYPENAMES: 'wior',
        OUTPUTFORMAT: 'geojson',
        srsName: 'EPSG:4326',
        FILTER: cqlFilter,
      },
      signal,
    })
    .then(response => response.data)
}
