import { useState } from 'react'
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import useAnalytics from './shared/hooks/useAnalytics'
import { ROUTES } from './routes'
import Disclaimer from './shared/components/Disclaimer'

const isProd = process.env.NODE_ENV === 'production'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: isProd ? 3 : false,
      refetchOnWindowFocus: isProd,
    },
  },
})

const router = createBrowserRouter(ROUTES)

function App() {
  const { createPiwikInstance } = useAnalytics()
  createPiwikInstance(isProd)

  const [showDisclaimer, setShowDisclaimer] = useState(true)

  return (
    <ThemeProvider>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        {showDisclaimer && <Disclaimer setShowDisclaimer={setShowDisclaimer} />}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export { isProd }
export default App
