import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ROUTES } from './routes'
import Disclaimer from './shared/components/Disclaimer'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.NODE_ENV === 'production' ? 3 : false,
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
    },
  },
})

const router = createBrowserRouter(ROUTES)

function App() {
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

export default App
