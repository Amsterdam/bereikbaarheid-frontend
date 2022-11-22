import axios from 'axios'

export interface rdwSubcategoryData {
  subcategorie_voertuig_europees: string
}

export function getVehicleSubcategory(
  licensePlate: string,
  signal: AbortSignal | undefined
): Promise<rdwSubcategoryData[]> {
  return axios
    .get('https://opendata.rdw.nl/resource/2ba7-embk.json', {
      params: { kenteken: licensePlate },
      signal,
    })
    .then(response => response.data)
}
