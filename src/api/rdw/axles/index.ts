import axios from 'axios'

export const ENDPOINT = 'https://opendata.rdw.nl/resource/3huj-srit.json'

export interface rdwAxlesData {
  wettelijk_toegestane_maximum_aslast: string
}

export function getAxlesInfo(
  licensePlate: string,
  signal: AbortSignal | undefined
): Promise<rdwAxlesData[]> {
  return axios
    .get(ENDPOINT, {
      params: { kenteken: licensePlate },
      signal,
    })
    .then(response => response.data)
}
