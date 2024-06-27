import { render, screen } from '@testing-library/react'

import { withAppContext } from '../../../../../test/utils/withAppContext'

import { RoadSectionDetails } from './Details'

describe('RoadSectionDetails', () => {
  const roadSectionNoCounts = require('../../../../../test/mocks/bereikbaarheid/road-elements/241115-withoutTrafficCounts.json')
  const roadSectionTrafficCounts = require('../../../../../test/mocks/bereikbaarheid/road-elements/24589-withTrafficCounts.json')

  it('renders correctly', () => {
    render(withAppContext(<RoadSectionDetails properties={roadSectionNoCounts.features[0].properties} />))

    expect(screen.getAllByRole('heading', { level: 1 })[0]).toHaveTextContent('Wegvak 24115')
  })


  it('shows traffic counts', () => {
    render(withAppContext(<RoadSectionDetails properties={roadSectionTrafficCounts.features[0].properties} />))

    expect(screen.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Verkeerstellingen')

    expect(screen.getAllByRole('columnheader', { name: 'Jaar' })).toHaveLength(1)

    expect(
      screen.getByRole('cell', {
        name: roadSectionTrafficCounts.features[0].properties.traffic_counts[0].year,
      })
    ).toBeInTheDocument()
  })

  it('shows a message if no traffic counts are found', () => {
    render(withAppContext(<RoadSectionDetails properties={roadSectionNoCounts.features[0].properties} />))

    expect(screen.getByText('Geen verkeerstellingen gevonden.')).toBeInTheDocument()
  })
})
