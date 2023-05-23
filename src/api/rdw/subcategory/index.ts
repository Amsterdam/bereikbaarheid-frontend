import axios from 'axios'

export const ENDPOINT = 'https://opendata.rdw.nl/resource/2ba7-embk.json'

export interface rdwSubcategoryData {
  subcategorie_voertuig_europees: string
}

export function getVehicleSubcategory(
  licensePlate: string,
  signal: AbortSignal | undefined
): Promise<rdwSubcategoryData[]> {
  return axios
    .get(ENDPOINT, {
      params: { kenteken: licensePlate },
      signal,
    })
    .then(response => response.data)
}
