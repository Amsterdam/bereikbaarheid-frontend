import { Fragment, useMemo } from 'react'

import { useMapInstance } from '@amsterdam/arm-core'
import { Table, TableBody, TableCell, TableHeader, TableRow, themeColor } from '@amsterdam/asc-ui'
import { TouringcarStop } from 'api/touringcar/stops'
import { sortBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface SortableTouringcarStop extends TouringcarStop {
  sortId?: number
}

const TableHeaderStrong = styled(TableHeader)`
  font-weight: 700;
`

const TableRowClickable = styled(TableRow)`
  &:hover,
  &:focus {
    background-color: ${themeColor('tint', 'level3')};
    cursor: pointer;
  }
`

function LocationsList({ locationItems }: { locationItems: TouringcarStop[] }) {
  const { t } = useTranslation()

  const mapInstance = useMapInstance()

  const sortedLocations = useMemo<SortableTouringcarStop[]>(() => {
    const sortableLocations = locationItems.map((item: SortableTouringcarStop) => {
      item.sortId = Number(item.properties?.omschrijving.match(/\d+/) ?? 0)

      return item
    })

    return sortBy(sortableLocations, 'sortId')
  }, [locationItems])

  return (
    <Table>
      <TableHeaderStrong>
        <TableRow>
          <TableCell as="th">{t('_pageTouringcar.reference')}</TableCell>
          <TableCell as="th">{t('_pageTouringcar.places')}</TableCell>
        </TableRow>
      </TableHeaderStrong>

      <TableBody>
        {sortedLocations.map(feature => {
          const { properties } = feature

          if (!feature || !properties) return <Fragment key={feature.id}></Fragment>

          return (
            <TableRowClickable
              key={feature.id}
              onClick={() => {
                mapInstance.flyTo([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 20)
              }}
            >
              <TableCell>{properties.omschrijving}</TableCell>
              <TableCell width="25%">{properties.plaatsen}</TableCell>
            </TableRowClickable>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default LocationsList
