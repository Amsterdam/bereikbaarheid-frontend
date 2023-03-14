import { render, screen } from '@testing-library/react'

import { withAppContext } from '../../../../../test/utils/withAppContext'
import { RoadSectionDetails } from './Details'

describe('RoadSectionDetails', () => {
  const roadSectionObstructions = require('../../../../../test/mocks/bereikbaarheid/road-elements/241115-withRoadObstructions.json')
  const roadSectionTrafficCounts = require('../../../../../test/mocks/bereikbaarheid/road-elements/24589-withTrafficCounts.json')

  it('renders correctly', () => {
    render(
      withAppContext(
        <RoadSectionDetails
          properties={roadSectionObstructions.features[0].properties}
        />
      )
    )

    expect(screen.getAllByRole('heading', { level: 1 })[0]).toHaveTextContent(
      'Wegvak 24115'
    )
  })

  it('shows road obstructions', () => {
    render(
      withAppContext(
        <RoadSectionDetails
          properties={roadSectionObstructions.features[0].properties}
        />
      )
    )

    expect(screen.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent(
      'Stremmingen'
    )

    expect(
      screen.getAllByRole('columnheader', { name: 'Werkzaamheden' })
    ).toHaveLength(1)

    expect(
      screen.getByRole('cell', {
        name: roadSectionObstructions.features[0].properties
          .traffic_obstructions[0].activity,
      })
    ).toBeInTheDocument()
  })

  it('shows a message if no road obstructions are found', () => {
    render(
      withAppContext(
        <RoadSectionDetails
          properties={roadSectionTrafficCounts.features[0].properties}
        />
      )
    )

    expect(screen.getByText('Geen stremmingen gevonden.')).toBeInTheDocument()
  })

  it('shows traffic counts', () => {
    render(
      withAppContext(
        <RoadSectionDetails
          properties={roadSectionTrafficCounts.features[0].properties}
        />
      )
    )

    expect(screen.getAllByRole('heading', { level: 2 })[1]).toHaveTextContent(
      'Verkeerstellingen'
    )

    expect(screen.getAllByRole('columnheader', { name: 'Jaar' })).toHaveLength(
      1
    )

    expect(
      screen.getByRole('cell', {
        name: roadSectionTrafficCounts.features[0].properties.traffic_counts[0]
          .year,
      })
    ).toBeInTheDocument()
  })

  it('shows a message if no traffic counts are found', () => {
    render(
      withAppContext(
        <RoadSectionDetails
          properties={roadSectionObstructions.features[0].properties}
        />
      )
    )

    expect(
      screen.getByText('Geen verkeerstellingen gevonden.')
    ).toBeInTheDocument()
  })
})
