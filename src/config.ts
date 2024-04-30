const config = {
  API_BASE_URL: process.env.NODE_ENV === 'test' ? '' : process.env.REACT_APP_API_ROOT ?? '',
  API_ROOT: `${process.env.NODE_ENV === 'test' ? '' : process.env.REACT_APP_API_ROOT ?? '/'}api/v1`,
}

export default config
