import { useMemo } from 'react'

import { ExternalLink } from '@amsterdam/asc-assets'
import { Icon, MenuButton, MenuItem, themeColor } from '@amsterdam/asc-ui'
import { useTranslation } from 'react-i18next'
import { Link, matchPath, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import {
  MenuOrCardItemWithPath as MenuItemWithPath,
  menuOrCardItems as menuItems,
  mapPathsToMenuOrCardItems as mapPathsToMenuItems,
} from '../../utils/menuOrCardItems'

function HeaderMenuItem({ item }: { item: MenuItemWithPath }) {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <MenuItem key={item.path}>
      <MenuButton
        forwardedAs={Link}
        to={item.path}
        target={item.target}
        iconRight={
          item.target === '_blank' && (
            <Icon size={13} style={{ marginLeft: -2 }}>
              <ExternalLink />
            </Icon>
          )
        }
        title={`${t(item.title)}${
          item.description ? `- ${item.description}` : ''
        }`}
        // @ts-ignore
        active={matchPath(location.pathname, item.path) ? 'true' : undefined}
        style={item.secondary ? { fontWeight: 'normal' } : {}}
      >
        {t(item.title)}
      </MenuButton>
    </MenuItem>
  )
}

const MenuDivider = styled.hr`
  height: 2rem;
  margin-inline: 1em;
  border: 1px solid ${themeColor('tint', 'level3')};
`

function HeaderMenuItems() {
  const primaryMenuItemsWithPaths = useMemo<MenuItemWithPath[]>(() => {
    return mapPathsToMenuItems(menuItems.filter(item => !item.secondary))
  }, [])

  const secondaryMenuItemsWithPaths = useMemo<MenuItemWithPath[]>(() => {
    return mapPathsToMenuItems(menuItems.filter(item => item.secondary))
  }, [])

  return (
    <>
      {primaryMenuItemsWithPaths.map(item => (
        <HeaderMenuItem key={item.path} item={item} />
      ))}

      <MenuDivider />

      {secondaryMenuItemsWithPaths.map(item => (
        <HeaderMenuItem key={item.path} item={item} />
      ))}
    </>
  )
}

export default HeaderMenuItems
