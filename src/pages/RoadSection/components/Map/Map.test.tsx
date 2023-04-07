import { render, screen } from '@testing-library/react'

import { withAppContext } from '../../../../../test/utils/withAppContext'
import { RoadSectionMap, RoadSectionMapProps } from './Map'

describe('RoadSectionMap', () => {
  const roadSection = require('../../../../../test/mocks/bereikbaarheid/road-elements/241115-withRoadObstructions.json')
  const props: RoadSectionMapProps = {
    roadSection: roadSection.features[0],
  }

  it('renders correctly', () => {
    render(withAppContext(<RoadSectionMap {...props} />))

    expect(screen.getByText(/VMA/)).toBeInTheDocument()
  })

  it('renders the road section', async () => {
    const { container } = render(withAppContext(<RoadSectionMap {...props} />))

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const roadSectionSvg = container.querySelectorAll(
      '.leaflet-overlay-pane svg'
    )

    expect(roadSectionSvg.length).toBe(1)
  })
})
