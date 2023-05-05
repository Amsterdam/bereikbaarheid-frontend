//
// Amsterdam BAG Search api
// https://api.data.amsterdam.nl/atlas/search/
//

import axios from 'axios'

export const ENDPOINT = 'https://api.data.amsterdam.nl/atlas/search/adres/'

export interface AddressItem {
  _display: string
  centroid: number[]
}

export interface AddressItems {
  results: AddressItem[] | []
}

export function address(searchString: string): Promise<AddressItems> {
  return axios
    .get(ENDPOINT, {
      params: {
        q: searchString,
      },
    })
    .then(response => response.data)
}
