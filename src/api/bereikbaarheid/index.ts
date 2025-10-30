//
// bereikbaarheid.amsterdam.nl/api/ API
//

import axios from 'axios'
import config from '../../config'

export const api = axios.create({
  baseURL: config.API_BASE_URL,

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
