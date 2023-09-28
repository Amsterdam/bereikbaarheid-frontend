import { screen } from '@testing-library/react'

describe('HomeHeader', () => {
  it('renders correctly', async () => {
    expect(screen.getByTestId('homeHeader')).toBeInTheDocument()
  })
})
