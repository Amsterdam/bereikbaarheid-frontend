import axios from 'axios'

const headers =
  process.env.NODE_ENV !== 'test' && process.env.REACT_APP_API_DATA_AMS_KEY?.length
    ? {
        'X-Api-Key': process.env.REACT_APP_API_DATA_AMS_KEY,
      }
    : undefined

const api = axios.create({
  baseURL: 'https://api.data.amsterdam.nl/v1',

  headers,

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

export { headers }
export default api
