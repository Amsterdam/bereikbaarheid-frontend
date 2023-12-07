import api from '../../data.amsterdam'

type Panorama = string

interface PanoramaParamsBase {
  format?: 'json' | 'api' | 'jpeg'
  image_redirect?: boolean
  width?: number
  fov?: number
  horizon?: number
  heading?: number
  aspect?: number
  radius?: number
}

interface PanoramaParamsPanoID extends PanoramaParamsBase {
  pano_id: string
}

interface PanoramaParamsWG84 extends PanoramaParamsBase {
  lat: number
  lon: number
}

interface PanoramaParamsRD extends PanoramaParamsBase {
  x: number
  y: number
}

type PanoramaParams = PanoramaParamsPanoID | PanoramaParamsWG84 | PanoramaParamsRD

const ENDPOINT = 'panorama/thumbnail'

function getPanoramaThumbnail(params: PanoramaParams, signal?: AbortSignal): Promise<Panorama> {
  if (!params.image_redirect) params.image_redirect = true
  if (!params.width) params.width = 300
  if (!params.radius) params.radius = 250

  return api.get(ENDPOINT, { params, signal }).then(response => {
    if (params.image_redirect) {
      return response.request.responseURL
    }

    return response.data
  })
}

function getUrl(params?: PanoramaParams) {
  return api.getUri({
    params: params,
    url: ENDPOINT,
  })
}

export type { Panorama }
export { ENDPOINT, getPanoramaThumbnail, getUrl }
export default getPanoramaThumbnail
