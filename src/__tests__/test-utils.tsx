import { render as rtlRender } from '@testing-library/react'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { App } from '../pages/App/App'
import { ErrorPage } from '../pages/ErrorPage/ErrorPage'
import Router from '../router'

function render(url: string) {
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

  /**
   * index.ts と同じだが、Router は MemoryRouter としている。
   * ※ BrowserRouter でテスト実施を行うと render 時にうまくいかない。
   * ※ .env.test にて REACT_APP_BASE_URL がない理由も上記によるもの。
   */
  return rtlRender(
    <React.StrictMode>
      <MemoryRouter initialEntries={[{ pathname: url }]}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={ErrorPage}>
            <App>
              <Router />
            </App>
          </ErrorBoundary>
        </QueryClientProvider>
      </MemoryRouter>
    </React.StrictMode>,
  )
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
