import axios from 'axios'

export interface rdwFuelData {
  brandstof_omschrijving: string
  emissiecode_omschrijving: string
}

export function getFuelInfo(
  licensePlate: string,
  signal: AbortSignal | undefined
): Promise<rdwFuelData[]> {
  return axios
    .get('https://opendata.rdw.nl/resource/8ys7-d773.json', {
      params: { kenteken: licensePlate },
      signal,
    })
    .then(response => response.data)
}
