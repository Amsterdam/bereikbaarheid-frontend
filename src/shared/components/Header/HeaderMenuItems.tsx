import { useMemo } from 'react'
import { Icon, MenuButton, MenuItem, themeColor } from '@amsterdam/asc-ui'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { ExternalLink } from '@amsterdam/asc-assets'
import styled from 'styled-components'
import {
  MenuOrCardItemData as MenuItemData,
  menuOrCardItems as menuItems,
} from '../../utils/menuOrCardItems'
import { getGeneratedPath } from '../../utils/path'

function mapMenuItems(item: MenuItemData) {
  const itemWithPath: MenuItemData = {
    title: item.titleShort ?? item.title,
    path: item.path ?? '',
  }

  if (item.description) itemWithPath.description = item.description
  if (item.route) itemWithPath.path = getGeneratedPath(item.route)
  if (item.target) itemWithPath.target = item.target
  if (item.secondary) itemWithPath.secondary = item.secondary

  return itemWithPath
}

function HeaderMenuItem({ item }: { item: MenuItemData }) {
  const location = useLocation()

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
        title={`${item.title}${
          item.description ? `- ${item.description}` : ''
        }`}
        // @ts-ignore
        active={matchPath(location.pathname, item.path) ? 'true' : undefined}
        style={item.secondary ? { fontWeight: 'normal' } : {}}
      >
        {item.title}
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
  const primaryMenuItemsWithPaths = useMemo<MenuItemData[]>(() => {
    return menuItems.filter(item => !item.secondary).map(mapMenuItems)
  }, [])

  const secondaryMenuItemsWithPaths = useMemo<MenuItemData[]>(() => {
    return menuItems.filter(item => item.secondary).map(mapMenuItems)
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
