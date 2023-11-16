import { Fragment } from 'react'

import { Table, TableCell, TableHeader, TableRow } from '@amsterdam/asc-ui'
import { TouringcarStop } from 'api/touringcar/stops'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const TableHeaderStrong = styled(TableHeader)`
  font-weight: 700;
`

function LocationsList({ locationItems }: { locationItems: TouringcarStop[] }) {
  const { t } = useTranslation()

  return (
    <Table>
      <TableHeaderStrong>
        <TableCell>{t('_pageTouringcar.reference')}</TableCell>
        <TableCell>{t('_pageTouringcar.places')}</TableCell>
      </TableHeaderStrong>

      {locationItems.map(({ properties: item }, index) => {
        if (!item) return <Fragment key={index}></Fragment>

        return (
          <TableRow key={item.omschrijving}>
            <TableCell>{item.omschrijving}</TableCell>
            <TableCell width="25%">{item.plaatsen}</TableCell>
          </TableRow>
        )
      })}
    </Table>
  )
}

export default LocationsList
