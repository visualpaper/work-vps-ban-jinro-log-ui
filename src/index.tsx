import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorPage } from './pages/ErrorPage/ErrorPage'
import { App } from './pages/App/App'
import Router from './router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

/**
 * retry: デフォルト 3 retry を行うか。
 * refetchOnWindowFocus: デフォルトでユーザーがブラウザのコンポーネントにフォーカスを当てた時に自動でフェッチが動くか。
 * suspense: Suspense 制御を行うか (エラー時に ErorrBoundary にエラーが流れるようにするか)
 *           ※ これはクエリごとに設定することも可能で、グローバルでは基本 true で問題ない。
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})

root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <App>
            <Router />
          </App>
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
