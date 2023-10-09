// No check because typing of asc-ui is not correct.
// @ts-nocheck
// this is the reason why the menu items are located in this separate file
// which is an effort to keep unchecked code to a minimum
//
// a block-scoped ignore in Header.tsx would be a more elegant solution
// however TS does not offer a block-scoped ignore at the time of writing
// see https://github.com/Microsoft/TypeScript/issues/19573

import { Icon, MenuButton, MenuItem, themeColor } from '@amsterdam/asc-ui'
import { generatePath, Link, matchPath, useLocation } from 'react-router-dom'
import { RouteIds, getPathTo } from '../../../routes'
import { ExternalLink } from '@amsterdam/asc-assets'
import styled from 'styled-components'

const MenuDivider = styled.hr`
  height: 2rem;
  margin-inline: 1em;
  border: 1px solid ${themeColor('tint', 'level3')};
`

export const HeaderMenuItems = () => {
  const location = useLocation()

  return (
    <>
      <MenuItem>
        <MenuButton
          forwardedAs={Link}
          to={generatePath(getPathTo(RouteIds.LICENCE_PLATE_PAGE))}
          active={
            matchPath(
              location.pathname,
              generatePath(getPathTo(RouteIds.LICENCE_PLATE_PAGE))
            )
              ? 'true'
              : undefined
          }
        >
          Op kenteken
        </MenuButton>
      </MenuItem>

      <MenuItem>
        <MenuButton
          forwardedAs={Link}
          to={generatePath(getPathTo(RouteIds.ROAD_OBSTRUCTIONS_PAGE))}
          active={
            matchPath(
              location.pathname,
              generatePath(getPathTo(RouteIds.ROAD_OBSTRUCTIONS_PAGE))
            )
              ? 'true'
              : undefined
          }
        >
          Stremmingen
        </MenuButton>
      </MenuItem>

      <MenuItem>
        <MenuButton
          forwardedAs={Link}
          to={generatePath(getPathTo(RouteIds.LOAD_UNLOAD_PAGE))}
          active={
            matchPath(
              location.pathname,
              generatePath(getPathTo(RouteIds.LOAD_UNLOAD_PAGE))
            )
              ? 'true'
              : undefined
          }
        >
          Laden en lossen
        </MenuButton>
      </MenuItem>

      <MenuItem>
        <MenuButton
          forwardedAs={Link}
          to="https://tourbuzz.amsterdam.nl/"
          target="_blank"
          iconRight={
            <Icon size={13} style={{ marginLeft: -2 }}>
              <ExternalLink />
            </Icon>
          }
        >
          Touringcars
        </MenuButton>
      </MenuItem>

      <MenuDivider />

      <MenuItem>
        <MenuButton
          forwardedAs={Link}
          to={generatePath(getPathTo(RouteIds.DATA))}
          active={
            matchPath(location.pathname, generatePath(getPathTo(RouteIds.DATA)))
              ? 'true'
              : undefined
          }
          style={{ fontWeight: 'normal' }}
        >
          Databronnen
        </MenuButton>
      </MenuItem>

      <MenuItem>
        <MenuButton
          forwardedAs={Link}
          to={generatePath(getPathTo(RouteIds.CONTACT))}
          active={
            matchPath(
              location.pathname,
              generatePath(getPathTo(RouteIds.CONTACT))
            )
              ? 'true'
              : undefined
          }
          style={{ fontWeight: 'normal' }}
        >
          Contact en hulp
        </MenuButton>
      </MenuItem>
    </>
  )
}
