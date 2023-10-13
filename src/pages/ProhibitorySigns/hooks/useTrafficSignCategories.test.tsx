import { ReactNode } from 'react'

import { renderHook } from '@testing-library/react-hooks'
import { MemoryRouter } from 'react-router-dom'

import { useTrafficSignCategories } from './useTrafficSignCategories'

import ProhibitorySignsPageProvider from '../contexts/PageProvider'

describe('useTrafficSignCategories', () => {
  it('renders correctly', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter>
        <ProhibitorySignsPageProvider>{children}</ProhibitorySignsPageProvider>
      </MemoryRouter>
    )

    const { result } = renderHook(() => useTrafficSignCategories(), { wrapper })

    expect(result.current).toStrictEqual([
      'prohibition',
      'prohibition with exception',
    ])
  })

  it('returns an additional category in expert mode', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={['/?expertMode=true']}>
        <ProhibitorySignsPageProvider>{children}</ProhibitorySignsPageProvider>
      </MemoryRouter>
    )

    const { result } = renderHook(() => useTrafficSignCategories(), { wrapper })

    expect(result.current).toStrictEqual([
      'prohibition',
      'prohibition with exception',
      'prohibition ahead', // additional category for expert mode
    ])
  })
})
