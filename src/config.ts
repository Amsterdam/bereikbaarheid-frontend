// const config = {
//   API_BASE_URL: process.env.NODE_ENV === 'test' ? '' : process.env.REACT_APP_API_ROOT ?? '',
//   API_ROOT: `${process.env.NODE_ENV === 'test' ? '' : process.env.REACT_APP_API_ROOT ?? '/'}api/v1`,
// }
//
// export default config

const config = {
  API_BASE_URL: import.meta.env.MODE === 'test'
    ? ''
    : (import.meta.env.VITE_API_ROOT || ''),
  API_ROOT: `${
    import.meta.env.MODE === 'test'
      ? ''
      : (import.meta.env.VITE_API_ROOT || '/')
  }api/v1`,
}

export default config
