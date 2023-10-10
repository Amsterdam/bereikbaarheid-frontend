import { useMemo } from 'react'
import {
  Column,
  CompactThemeProvider,
  Heading,
  Row,
  styles,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHeader,
  TableRow,
  themeSpacing,
} from '@amsterdam/asc-ui'
import groupBy from 'lodash/groupBy'
import { formatTime } from '../../../../shared/utils/dateTime'
import styled from 'styled-components'

import {
  LoadUnloadRegime,
  RoadSectionLoadUnload,
} from '../../../../api/bereikbaarheid/road-sections/load-unload'
import {
  ImageContainer,
  Image,
  PropertiesContainer,
} from '../../../../shared/components/DetailFeature/DetailFeatureStyles'

import E01 from './images/E01.png'
import E02 from './images/E02.png'

const PaddedImageContainer = styled(ImageContainer)`
  margin-bottom: 1em;
`

const PropContainer = styled(PropertiesContainer)`
  margin-top: 0;
`

const DirectionContainer = styled.div`
  margin-bottom: ${themeSpacing(4)};
  margin-top: ${themeSpacing(2)};

  ${styles.HeadingStyle} {
    margin-bottom: 0;
  }
`

const TableTitle = styled(Heading)`
  margin-bottom: 0;
  margin-top: ${themeSpacing(4)};
`

interface LoadUnloadDetailFeatureRoadSectionLoadUnloadProps {
  roadSectionLoadUnload: RoadSectionLoadUnload
}

type ParkingSign = 'E01' | 'E02'

const SignCodeToImg = { E01: E01, E02: E02 }

export const LoadUnloadDetailFeatureRoadSectionLoadUnload = ({
  roadSectionLoadUnload,
}: LoadUnloadDetailFeatureRoadSectionLoadUnloadProps) => {
  const loadUnloadByDirection = useMemo<[string, LoadUnloadRegime[]][]>(() => {
    const grouped: Record<string, LoadUnloadRegime[]> = groupBy(
      roadSectionLoadUnload.properties.load_unload,
      item => item.direction
    )

    return Object.entries(grouped)
  }, [roadSectionLoadUnload.properties.load_unload])

  const parkingSigns = useMemo(() => {
    return roadSectionLoadUnload.properties.load_unload
      .reduce((acc: ParkingSign[], cur: LoadUnloadRegime): ParkingSign[] => {
        if (acc.includes(cur.additional_info as ParkingSign)) return acc
        if (cur.additional_info === 'E01' || cur.additional_info === 'E02') {
          return [...acc, cur.additional_info]
        }
        return acc
      }, [])
      .map((pS: ParkingSign) => <Image key={pS} src={SignCodeToImg[pS]} />)
  }, [roadSectionLoadUnload.properties.load_unload])

  return (
    <>
      {parkingSigns?.length ? (
        <PaddedImageContainer data-testid="detail-feature-road-section-sign">
          {parkingSigns}
        </PaddedImageContainer>
      ) : (
        <></>
      )}

      <PropContainer data-testid="detail-feature-road-section">
        <CompactThemeProvider>
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Wegvak ID</Column>
            <Column span={6}>{roadSectionLoadUnload.properties.id}</Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Straatnaam</Column>
            <Column span={6}>
              {roadSectionLoadUnload.properties.street_name}
            </Column>
          </Row>

          {roadSectionLoadUnload.properties.load_unload.length > 0 && (
            <>
              <TableTitle as="h3">Venstertijden</TableTitle>

              {loadUnloadByDirection.map(([key, items]) => {
                return (
                  <DirectionContainer key={key}>
                    <Heading as="h4">Richting {key}</Heading>
                    <TableContainer>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableCell as="th">dagen</TableCell>
                            <TableCell as="th">van</TableCell>
                            <TableCell as="th">tot</TableCell>
                            <TableCell as="th"></TableCell>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {items.map((item, index) => {
                            return (
                              <TableRow key={`${key}-${index}-main`}>
                                {item.days && (
                                  <TableCell>{item.days.join(', ')}</TableCell>
                                )}

                                {item.start_time && (
                                  <TableCell>
                                    {formatTime(item.start_time)}
                                  </TableCell>
                                )}

                                {item.end_time && (
                                  <TableCell>
                                    {formatTime(item.end_time)}
                                  </TableCell>
                                )}

                                {item.additional_info === 'E01' ||
                                item.additional_info === 'E02' ? (
                                  <TableCell>
                                    <Image
                                      src={SignCodeToImg[item.additional_info]}
                                      style={{
                                        marginTop: '4px',
                                        width: '28px',
                                        height: '28px',
                                      }}
                                    />
                                  </TableCell>
                                ) : (
                                  <></>
                                )}
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </DirectionContainer>
                )
              })}
            </>
          )}
        </CompactThemeProvider>
      </PropContainer>
    </>
  )
}
