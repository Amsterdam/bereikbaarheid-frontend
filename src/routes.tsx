import { Navigate, RouteObject } from 'react-router-dom'

import ErrorPage from './pages/ErrorPage'
import LoadUnloadPage from './pages/LoadUnload/LoadUnloadPage'
import ProhibitorySignsPage from './pages/ProhibitorySigns/ProhibitorySignsPage'
import RoadObstructionsPage from './pages/RoadObstructions/RoadObstructionsPage'
import RoadSectionPage from './pages/RoadSection/RoadSectionPage'
import HomePage from './pages/Home/HomePage'

enum RouteIds {
  HOME = 'HOME',
  LICENCE_PLATE_PAGE = 'LICENCE_PLATE_PAGE',
  PROHIBITORY_SIGNS_PAGE = 'PROHIBITORY_SIGNS_PAGE',
  ROAD_OBSTRUCTIONS_PAGE = 'ROAD_OBSTRUCTIONS_PAGE',
  LOAD_UNLOAD_PAGE = 'LOAD_UNLOAD_PAGE',
  ROAD_SECTION_DETAIL_PAGE = 'ROAD_SECTION_DETAIL_PAGE',
  CONTACT = 'CONTACT',
  PAGE_NOT_FOUND = 'PAGE_NOT_FOUND',
}

type RouteObjectWithPredefinedIds = RouteObject & { id: RouteIds }

const ROUTES: RouteObjectWithPredefinedIds[] = [
  {
    path: '/',
    id: RouteIds.HOME,
    element: <HomePage />,
  },
  {
    path: '/op-kenteken',
    id: RouteIds.LICENCE_PLATE_PAGE,
    element: <ProhibitorySignsPage />,
  },
  {
    path: '/verbodsborden',
    id: RouteIds.PROHIBITORY_SIGNS_PAGE,
    element: <Navigate replace to="/op-kenteken" />,
  },
  {
    path: '/stremmingen',
    id: RouteIds.ROAD_OBSTRUCTIONS_PAGE,
    element: <RoadObstructionsPage />,
  },
  {
    path: '/laden-lossen',
    id: RouteIds.LOAD_UNLOAD_PAGE,
    element: <LoadUnloadPage />,
  },
  {
    path: '/wegvak/:id',
    id: RouteIds.ROAD_SECTION_DETAIL_PAGE,
    element: <RoadSectionPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/contact',
    id: RouteIds.CONTACT,
    element: <HomePage />,
  },
  {
    path: '*',
    id: RouteIds.PAGE_NOT_FOUND,
    element: <p>Pagina niet gevonden.</p>,
  },
]

function getPathTo(routeId: string): string {
  let route = ROUTES.find(r => r.id === routeId)

  if (!route) {
    throw new Error(`Route with ID ${routeId} not found.`)
  }

  return route.path!
}

export { RouteIds, ROUTES, getPathTo }
