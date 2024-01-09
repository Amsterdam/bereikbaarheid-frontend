import { useMemo } from 'react'

import { ExternalLink } from '@amsterdam/asc-assets'
import { Icon, MenuButton, MenuFlyOut, MenuItem, themeColor } from '@amsterdam/asc-ui'
import i18n from 'i18n'
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
          item.description
            ? `:

${t(item.description)}`
            : ''
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

const languages = {
  nl: {
    name: 'Nederlands',
    language: 'Taal',
  },
  en: {
    name: 'English',
    language: 'Language',
  },
  de: {
    name: 'Deutsch',
    language: 'Sprache',
  },
  es: {
    name: 'Español',
    language: 'Idioma',
  },
}

const MenuDivider = styled.hr`
  height: 2rem;
  margin-inline: 1em;
  border: 1px solid ${themeColor('tint', 'level3')};
`

const MenuFlyOutStyled = styled(MenuFlyOut)`
  & > button {
    font-weight: normal;
  }
`

function HeaderMenuItems({ showDesktopVariant = false }: { showDesktopVariant?: boolean }) {
  const primaryMenuItemsWithPaths = useMemo<MenuItemWithPath[]>(() => {
    return mapPathsToMenuItems(menuItems.filter(item => !item.secondary))
  }, [])

  const secondaryMenuItemsWithPaths = useMemo<MenuItemWithPath[]>(() => {
    return mapPathsToMenuItems(menuItems.filter(item => item.secondary))
  }, [])

  const languagesLabel = useMemo(() => {
    return Object.entries(languages).reduce((acc, [key, val]) => {
      if (key !== i18n.resolvedLanguage) {
        return acc === '' ? val.language : `${acc} / ${val.language}`
      }

      return acc
    }, '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage])

  return (
    <>
      {primaryMenuItemsWithPaths.map(item => (
        <HeaderMenuItem key={item.path} item={item} />
      ))}

      {showDesktopVariant && <MenuDivider />}

      {secondaryMenuItemsWithPaths.map(item => (
        <HeaderMenuItem key={item.path} item={item} />
      ))}

      <MenuFlyOutStyled label={languagesLabel} data-testid="menuFlyoutLanguageSelect">
        {Object.entries(languages).map(([key, val]) => (
          <MenuItem key={key}>
            <MenuButton
              data-testid={`buttonLanguage${val.name}`}
              active={key === i18n.resolvedLanguage}
              onClick={() => i18n.changeLanguage(key)}
            >
              {val.name}
            </MenuButton>
          </MenuItem>
        ))}
      </MenuFlyOutStyled>
    </>
  )
}

export default HeaderMenuItems
