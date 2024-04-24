const config = {
  API_BASE_URL: (() => {
    switch (process.env.NODE_ENV) {
      case 'test':
        return ''
      case 'production':
        // Base API URL is same as the current URL.
        return '/'
      default:
        // For development purposes you might want to refer to the API on localhost or an DTAP server.
        return `${process.env.REACT_APP_API_ROOT ?? '/'}`
    }
  })(),
  API_ROOT: (() => {
    switch (process.env.NODE_ENV) {
      case 'test':
        return 'api/v1/'
      case 'production':
        // Base API URL is same as the current URL.
        return '/api/v1/'
      default:
        // For development purposes you might want to refer to the API on localhost or an DTAP server.
        return `${process.env.REACT_APP_API_ROOT ?? '/'}api/v1/`
    }
  })(),
}

export default config
