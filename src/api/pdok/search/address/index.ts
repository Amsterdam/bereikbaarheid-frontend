//
// PDOK Location Server Search API
// https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest
//

import axios from 'axios'

export const ENDPOINT = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest'

export interface AddressItem {
  _display: string
  centroid: number[]
}

export interface AddressItems {
  results: AddressItem[] | []
}

export function address(searchString: string): Promise<AddressItems> {
  const encodedSearchTerm = '"' + searchString + '"'

  return axios
    .get(ENDPOINT, {
      params: {
        fq: ['gemeentenaam:amsterdam', 'type:adres'],
        fl: ['weergavenaam', 'centroide_ll'],
        bq: ['type:adres^1', 'type:gemeente^1.5'],
        rows: 15,
        sort: 'straatnaam_verkort asc, huisnummer asc',
        q: encodedSearchTerm,
      },
      paramsSerializer: params => {
        const searchParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v))
          } else {
            searchParams.append(key, value as string)
          }
        })
        return searchParams.toString()
      },
    })
    .then(response => {
      // Transform PDOK response to match the existing interface
      const results = response.data.response?.docs || []

      return {
        results: results.map((item: any) => {
          const matches = item.centroide_ll?.match(/POINT[(]([^$]+)\)/)
          const coordinates = matches ? matches[1].split(' ').map(parseFloat).reverse() : []

          return {
            _display: item.weergavenaam?.split(',')[0] || '',
            centroid: coordinates, // [lon, lat]
          }
        }),
      }
    })
}
