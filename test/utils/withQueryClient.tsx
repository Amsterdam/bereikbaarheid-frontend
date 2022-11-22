import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactElement } from 'react'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

export const withQueryClient = (component: ReactElement) => {
  const testQueryClient = createTestQueryClient()
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>
  )

  return {
    ...result,
    rerender: (rerenderComponent: ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderComponent}
        </QueryClientProvider>
      ),
  }
}
