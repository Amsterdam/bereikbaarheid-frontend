import { createContext, useContext } from 'react'

export const AnalyticsContext = createContext<{}>({})

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext)

  if (context === undefined) {
    throw new Error('useAnalyticsContext must be within AnalyticsProvider')
  }

  return context
}
