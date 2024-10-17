import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout'
import MainContent from '@/components/main-content'

const router = createBrowserRouter(
  [
    {
      path: '*',
      element: (
        <Layout>
          <MainContent />
        </Layout>
      )
    }
  ]
)

export default router;
