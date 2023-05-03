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
import { format, parse } from 'date-fns'
import groupBy from 'lodash/groupBy'
import styled from 'styled-components'

import {
  LoadUnloadRegime,
  RoadSectionLoadUnload,
} from '../../../../api/bereikbaarheid/road-sections/load-unload'

import { PropertiesContainer } from '../../../../shared/components/DetailFeature/DetailFeatureStyles'

const Container = styled(PropertiesContainer)`
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

export const LoadUnloadDetailFeatureRoadSectionLoadUnload = ({
  roadSectionLoadUnload,
}: LoadUnloadDetailFeatureRoadSectionLoadUnloadProps) => {
  const parseTime = (time: string) =>
    format(parse(time, 'HH:mm:ss', new Date()), 'HH:mm')

  const loadUnloadByDirection = (): [string, LoadUnloadRegime[]][] => {
    const grouped: Record<string, LoadUnloadRegime[]> = groupBy(
      roadSectionLoadUnload.properties.load_unload,
      item => item.direction
    )

    return Object.entries(grouped)
  }

  return (
    <Container data-testid="detail-feature-road-section">
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

            {loadUnloadByDirection().map(([key, items]) => {
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
                                  {parseTime(item.start_time)}
                                </TableCell>
                              )}

                              {item.end_time && (
                                <TableCell>
                                  {parseTime(item.end_time)}
                                </TableCell>
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
    </Container>
  )
}
