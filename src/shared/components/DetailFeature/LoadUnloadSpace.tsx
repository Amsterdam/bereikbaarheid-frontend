import {
  Column,
  CompactThemeProvider,
  Heading,
  Link,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHeader,
  TableRow,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { format, isAfter, parse, startOfYesterday } from 'date-fns'
import styled from 'styled-components'

import { formatISODate } from '../../utils/dateTime'

import {
  ImageContainer,
  Image,
  PropertiesContainer,
} from './DetailFeatureStyles'
import trafficSignE07 from './images/traffic-sign-E07.png'
import { ParkingSpace } from '../../../api/parkeervakken'

const TableTitle = styled(Heading)`
  margin-bottom: 0;
  margin-top: ${themeSpacing(4)};
`

interface DetailFeatureLoadUnloadSpaceProps {
  parkingSpace: ParkingSpace
}

export const DetailFeatureLoadUnloadSpace = ({
  parkingSpace,
}: DetailFeatureLoadUnloadSpaceProps) => {
  const parseDate = (date: string) => parse(date, 'yyyy-MM-dd', new Date())
  const parseTime = (time: string) =>
    format(parse(time, 'HH:mm:ss', new Date()), 'HH:mm')
  const yesterday = startOfYesterday()

  const exceptionsToParkingRegimes = () => {
    return parkingSpace.regimes.filter(
      item =>
        item.eType === 'E7' &&
        item.beginDatum &&
        item.eindDatum &&
        !isAfter(yesterday, parseDate(item.eindDatum))
    )
  }

  const regularParkingRegimes = () => {
    return parkingSpace.regimes.filter(
      item => item.eType === 'E7' && !item.beginDatum && !item.eindDatum
    )
  }

  return (
    <>
      <ImageContainer>
        <Image src={trafficSignE07} />
      </ImageContainer>

      <PropertiesContainer>
        <CompactThemeProvider>
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Parkeervak ID</Column>
            <Column span={6}>
              <Link
                href={`https://data.amsterdam.nl/data/parkeervakken/parkeervakken/${parkingSpace.id}/?lagen=logistk-pvrll&legenda=true&zoom=13`}
                target="_blank"
                variant="inline"
              >
                {parkingSpace.id}
              </Link>
            </Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Straatnaam</Column>
            <Column span={6}>{parkingSpace.straatnaam}</Column>
          </Row>

          {exceptionsToParkingRegimes().map((item, index) => {
            return (
              <div key={index}>
                <TableTitle as="h3">
                  Uitzondering tussen <br />{' '}
                  {`${formatISODate(item.beginDatum!, 'dd-MM-yyyy')}
                   en ${formatISODate(item.eindDatum!, 'dd-MM-yyyy')}`}
                </TableTitle>

                <TableContainer>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell as="th">dagen</TableCell>
                        <TableCell as="th">van</TableCell>
                        <TableCell as="th">tot</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>{item.dagen.join(', ')}</TableCell>
                        <TableCell>{parseTime(item.beginTijd)}</TableCell>
                        <TableCell>{parseTime(item.eindTijd)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )
          })}

          {regularParkingRegimes().length > 0 && (
            <>
              <TableTitle as="h3">Regulier regime</TableTitle>
              <TableContainer>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell as="th">dagen</TableCell>
                      <TableCell as="th">van</TableCell>
                      <TableCell as="th">tot</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {regularParkingRegimes().map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{item.dagen.join(', ')}</TableCell>
                          <TableCell>{parseTime(item.beginTijd)}</TableCell>
                          <TableCell>{parseTime(item.eindTijd)}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </CompactThemeProvider>
      </PropertiesContainer>
    </>
  )
}
