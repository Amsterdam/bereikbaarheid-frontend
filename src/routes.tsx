import TouringcarPage from 'pages/Touringcar/TouringcarPage'
import { Navigate, RouteObject } from 'react-router-dom'

import ContactPage from 'pages/Contact/ContactPage'
import DataSourcesPage from 'pages/DataSources/DataSourcesPage'
import ErrorPage from 'pages/ErrorPage'
import HomePage from 'pages/Home/HomePage'
import LoadUnloadPage from 'pages/LoadUnload/LoadUnloadPage'
import ProhibitorySignsPage from 'pages/ProhibitorySigns/ProhibitorySignsPage'
import RoadSectionPage from 'pages/RoadSection/RoadSectionPage'

enum RouteIds {
  HOME = 'HOME',
  LICENCE_PLATE_PAGE = 'LICENCE_PLATE_PAGE',
  PROHIBITORY_SIGNS_PAGE = 'PROHIBITORY_SIGNS_PAGE',
  LOAD_UNLOAD_PAGE = 'LOAD_UNLOAD_PAGE',
  TOURINGCAR_PAGE = 'TOURINGCAR_PAGE',
  ROAD_SECTION_DETAIL_PAGE = 'ROAD_SECTION_DETAIL_PAGE',
  DATA = 'DATA',
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
    path: '/laden-lossen',
    id: RouteIds.LOAD_UNLOAD_PAGE,
    element: <LoadUnloadPage />,
  },
  {
    path: '/touringcar',
    id: RouteIds.TOURINGCAR_PAGE,
    element: <TouringcarPage />,
  },
  {
    path: '/wegvak/:id',
    id: RouteIds.ROAD_SECTION_DETAIL_PAGE,
    element: <RoadSectionPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/data',
    id: RouteIds.DATA,
    element: <DataSourcesPage />,
  },
  {
    path: '/contact',
    id: RouteIds.CONTACT,
    element: <ContactPage />,
  },
  {
    path: '*',
    id: RouteIds.PAGE_NOT_FOUND,
    element: <ErrorPage />,
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
