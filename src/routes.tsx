import { RouteObject } from 'react-router-dom'

import ErrorPage from './pages/ErrorPage'
import LoadUnloadPage from './pages/LoadUnload/LoadUnloadPage'
import ProhibitorySignsPage from './pages/ProhibitorySigns/ProhibitorySignsPage'
import RoadObstructionsPage from './pages/RoadObstructions/RoadObstructionsPage'
import RoadSectionPage from './pages/RoadSection/RoadSectionPage'
import HomePage from './pages/Home/HomePage'

export const ROUTES: RouteObject[] = [
  {
    path: '/',
    id: 'HOME',
    element: <HomePage />,
  },
  {
    path: '/verbodsborden',
    id: 'PROHIBITORY_SIGNS_PAGE',
    element: <ProhibitorySignsPage />,
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
    errorElement: <ErrorPage />,
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
