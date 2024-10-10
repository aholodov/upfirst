import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '@/components/layout.tsx'
import MainContent from '@/components/main-content.tsx';
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <MainContent />
    </Layout>
  </StrictMode>,
)
