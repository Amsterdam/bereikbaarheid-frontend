import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui'
import { PiwikProvider, createInstance } from '@amsterdam/piwik-tracker-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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

const piwikInstance = createInstance({
  urlBase: process.env.REACT_APP_SELF_ROOT,
  siteId: '3',
  disabled: !isProd,
})

const router = createBrowserRouter(ROUTES)

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  return (
    <ThemeProvider>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <PiwikProvider value={piwikInstance}>
          <RouterProvider router={router} />
        </PiwikProvider>
        {showDisclaimer && <Disclaimer setShowDisclaimer={setShowDisclaimer} />}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export { isProd }
export default App
