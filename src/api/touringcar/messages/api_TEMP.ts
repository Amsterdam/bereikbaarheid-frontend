//
// bereikbaarheid.amsterdam.nl/api/ API
// TODO: remove this file once API base URL is set back to api.data.amsterdam.nl
//

import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://bereikbaarheid.opdr-o.azure.amsterdam.nl/api/',

  // create an URL with repeated parameters,
  // e.g. ?category=foo&category=bar&category=baz
  paramsSerializer: {
    serialize: query => {
      return Object.entries(query)
        .map(([key, value], i) => (Array.isArray(value) ? `${key}=${value.join('&' + key + '=')}` : `${key}=${value}`))
        .join('&')
    },
  },
})
