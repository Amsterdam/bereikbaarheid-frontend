import { Fragment, useMemo } from 'react'

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@amsterdam/asc-ui'
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

function LocationsList({ locationItems }: { locationItems: TouringcarStop[] }) {
  const { t } = useTranslation()

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
        {sortedLocations.map(({ properties: item }, index) => {
          if (!item) return <Fragment key={index}></Fragment>

          return (
            <TableRow key={item.omschrijving}>
              <TableCell>{item.omschrijving}</TableCell>
              <TableCell width="25%">{item.plaatsen}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default LocationsList
