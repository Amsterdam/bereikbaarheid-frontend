import { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import LoadUnloadPage from './pages/LoadUnload/LoadUnloadPage'
import ProhibitorySignsPage from './pages/ProhibitorySigns/ProhibitorySignsPage'
import RoadObstructionsPage from './pages/RoadObstructions/RoadObstructionsPage'
import RoadSectionPage from './pages/RoadSection/RoadSectionPage'

export const ROUTES: RouteObject[] = [
  {
    path: '/',
    id: 'HOME',
    element: <ProhibitorySignsPage />,
  },
  {
    /* the url /verbodsborden is used for communication purposes */
    path: '/verbodsborden',
    id: 'PROHIBITORY_SIGNS_REDIRECT',
    element: <Navigate replace to="/" />,
  },
  {
    path: '/laden-lossen',
    id: 'LOAD_UNLOAD_PAGE',
    element: <LoadUnloadPage />,
  },
  {
    path: '/stremmingen',
    id: 'ROAD_OBSTRUCTIONS_PAGE',
    element: <RoadObstructionsPage />,
  },
  {
    path: '/wegvak/:id',
    id: 'ROAD_SECTION_DETAIL_PAGE',
    element: <RoadSectionPage />,
  },
  {
    path: '*',
    id: 'PAGE_NOT_FOUND',
    element: <p>Pagina niet gevonden.</p>,
  },
]

export function getPathTo(routeId: string): string {
  let route = ROUTES.filter(r => r.id === routeId)

  if (!route) {
    throw new Error(`Route with ID ${routeId} not found.`)
  }

  return route[0].path!
}
