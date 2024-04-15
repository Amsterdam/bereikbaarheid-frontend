const config = {
  API_ROOT: `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_ROOT : ''}api/v1`,
}

export default config
