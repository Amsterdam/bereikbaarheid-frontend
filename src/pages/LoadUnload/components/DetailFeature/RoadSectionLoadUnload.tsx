import {
  Column,
  CompactThemeProvider,
  Heading,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
  themeSpacing,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { RoadSectionLoadUnload } from '../../../../api/bereikbaarheid/road-sections/load-unload'

import {
  ImageContainer,
  Image,
  PropertiesContainer,
} from '../../../../shared/components/DetailFeature/DetailFeatureStyles'
import trafficSignE07 from '../../../../shared/components/DetailFeature/images/traffic-sign-E07.png'

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
  return (
    <>
      <ImageContainer>
        <Image src={trafficSignE07} />
      </ImageContainer>

      <PropertiesContainer>
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
                    {roadSectionLoadUnload.properties.load_unload.map(
                      (item, index) => {
                        return (
                          <TableRow key={`${index}-main`}>
                            {item.days && <TableCell>{item.days}</TableCell>}
                            {item.start_time && (
                              <TableCell>{item.start_time}</TableCell>
                            )}
                            {item.end_time && (
                              <TableCell>{item.end_time}</TableCell>
                            )}
                          </TableRow>
                        )
                      }
                    )}
                  </TableBody>

                  {roadSectionLoadUnload.properties.load_unload[0].category && (
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>
                          Additionele info:{' '}
                          {
                            roadSectionLoadUnload.properties.load_unload[0]
                              .category
                          }
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  )}
                </Table>
              </TableContainer>
            </>
          )}
        </CompactThemeProvider>
      </PropertiesContainer>
    </>
  )
}
