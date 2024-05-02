import axios from 'axios'

export const ENDPOINT = 'https://opendata.rdw.nl/api/id/m9d7-ebf2.json'

export interface rdwGeneralData {
  breedte: string
  datum_eerste_toelating: string
  handelsbenaming: string
  lengte: string
  massa_rijklaar: string
  maximum_massa_samenstelling: string
  merk: string
  taxi_indicator: string
  toegestane_maximum_massa_voertuig: string
  voertuigsoort: string
  europese_voertuigcategorie: string
}

export function getVehicle(licensePlate: string): Promise<rdwGeneralData[]> {
  return axios
    .get(ENDPOINT, {
      params: { kenteken: licensePlate },
    })
    .then(response => response.data)
}
