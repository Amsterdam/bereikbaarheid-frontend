import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_DATA_AMS_ROOT,

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

export default api
