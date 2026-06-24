import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { withApp } from '../../../../../test/utils/withApp'
import { RouteIds } from '../../../../routes'
import { getGeneratedPath } from '../../../../shared/utils/path'

describe('MapLegend', { timeout: 15000 }, () => {
  beforeEach(() => {
    vi.stubGlobal('XMLHttpRequest', class {})
  })

  afterEach(() => vi.restoreAllMocks())

  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.TOURINGCAR_PAGE)
    const page = withApp(pathToPage)

    await waitFor(() => page.rerender)
    await screen.findByText(/legenda/i)

    expect(screen.getAllByLabelText(/berichten/i)[0]).toBeVisible()
    expect(screen.getAllByLabelText(/berichten/i)[1]).toBeChecked()

    expect(screen.getByLabelText(/parkeren/i)).toBeChecked()
    expect(screen.getByLabelText(/toegestane wegen/i)).toBeChecked()
    expect(screen.getByLabelText(/aanbevolen routes/i)).toBeChecked()
  })

  it('has messages visible', async () => {
    const pathToPage = getGeneratedPath(RouteIds.TOURINGCAR_PAGE)
    const pathToPageWithParams = `${pathToPage}?berichten`
    const page = withApp(pathToPageWithParams)

    await waitFor(() => page.rerender)

    expect(screen.getAllByLabelText(/berichten/i)[0]).toBeVisible()
    expect(screen.getAllByLabelText(/berichten/i)[1]).toBeChecked()

    expect(screen.getByLabelText(/parkeren/i)).not.toBeChecked()
    expect(screen.getByLabelText(/toegestane wegen/i)).not.toBeChecked()
    expect(screen.getByLabelText(/aanbevolen routes/i)).not.toBeChecked()
  })

  it('has messages hidden', async () => {
    const pathToPage = getGeneratedPath(RouteIds.TOURINGCAR_PAGE)
    const pathToPageWithParams = `${pathToPage}?haltes&parkeren`
    const page = withApp(pathToPageWithParams)

    await waitFor(() => page.rerender)

    expect(screen.getAllByLabelText(/berichten/i)[1]).not.toBeChecked()

    expect(screen.getByLabelText(/parkeren/i)).toBeChecked()

    expect(screen.getByLabelText(/toegestane wegen/i)).not.toBeChecked()
    expect(screen.getByLabelText(/aanbevolen routes/i)).not.toBeChecked()
  })
})
