import {
  DescriptionList,
  DescriptionListItem,
  Heading,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  themeSpacing,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import LinkInTable from '../../../../shared/components/LinkInTable'
import { formatISODate } from '../../../../shared/utils/formatDate'
import { RoadObstruction } from '../../../../api/bereikbaarheid/road-obstructions'
import { RoadSection } from '../../../../api/bereikbaarheid/road-elements'

const StyledH1 = styled(Heading)`
  margin-bottom: ${themeSpacing(5)};
`

const StyledH2 = styled(Heading)`
  margin-top: ${themeSpacing(8)};
`

const StyledDescriptionList = styled(DescriptionList)`
  margin-bottom: 0;
`

function formatActivity(item: RoadObstruction) {
  if (!item.url) {
    return item.activity
  }

  return (
    <LinkInTable variant="inline" href={item.url} target="_blank">
      {item.activity}
    </LinkInTable>
  )
}

export const RoadSectionDetails = ({
  properties,
}: Pick<RoadSection, 'properties'>) => {
  return (
    <>
      <StyledH1>Wegvak {properties.id}</StyledH1>

      <StyledDescriptionList>
        <DescriptionListItem term="Straatnaam">
          {properties.street_name}
        </DescriptionListItem>

        <DescriptionListItem term="Maximum snelheid">
          {properties.max_speed_in_km
            ? `${properties.max_speed_in_km} kilometer per uur`
            : 'onbekend'}
        </DescriptionListItem>

        <DescriptionListItem term="Lengte">
          {properties.length_in_m
            ? `${properties.length_in_m} meter`
            : 'onbekend'}
        </DescriptionListItem>
      </StyledDescriptionList>

      <StyledH2 forwardedAs="h2">Stremmingen</StyledH2>
      {properties.traffic_obstructions.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell as="th">Werkzaamheden</TableCell>
                <TableCell as="th">Kenmerk</TableCell>
                <TableCell as="th">Van</TableCell>
                <TableCell as="th">Tot</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.traffic_obstructions.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{formatActivity(item)}</TableCell>
                    <TableCell>{item.reference}</TableCell>
                    <TableCell>{formatISODate(item.start_date)}</TableCell>
                    <TableCell>{formatISODate(item.end_date)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paragraph gutterBottom={0}>Geen stremmingen gevonden.</Paragraph>
      )}

      <StyledH2 forwardedAs="h2">Verkeerstellingen</StyledH2>
      {properties.traffic_counts.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell as="th">Jaar</TableCell>
                <TableCell as="th">Langzaam verkeer</TableCell>
                <TableCell as="th">Snel verkeer</TableCell>
                <TableCell as="th"></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.traffic_counts.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.year}</TableCell>
                    <TableCell>
                      {Boolean(item.langzaam_verkeer) ? 'ja' : 'nee'}
                    </TableCell>
                    <TableCell>
                      {Boolean(item.snelverkeer) ? 'ja' : 'nee'}
                    </TableCell>
                    <TableCell>
                      <LinkInTable
                        variant="inline"
                        href={item.link_to_file}
                        target="_blank"
                      >
                        Download
                      </LinkInTable>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paragraph gutterBottom={0}>Geen verkeerstellingen gevonden.</Paragraph>
      )}
    </>
  )
}
