import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from '@/components/layout.tsx'
import MainContent from '@/components/main-content.tsx'
import queryClient from '@/lib/tanstack-query/query-client.ts'
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <MainContent />
      </Layout>

      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
)
