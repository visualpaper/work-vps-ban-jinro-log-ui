import { Box, CircularProgress } from '@mui/material'

// 本コンポーネントは Web サイトごとに都度調整すること
// ※ 基本全ページ共通だが、特定のページでは別に用意したいとなった場合は複数作成してください。
export const PageLoader = ({
  children,
  isPageLoading,
}: {
  children: any
  isPageLoading: boolean
}) => (
  <>
    {isPageLoading && (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    )}
    <div style={isPageLoading ? { display: 'none' } : {}}>{children}</div>
  </>
)
