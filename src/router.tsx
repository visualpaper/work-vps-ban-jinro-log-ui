import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage/DashboardPage'
import { SearchPage } from './pages/SearchPage/SearchPage'
import { FeedbackPage } from './pages/FeedbackPage/FeedbackPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage/PrivacyPolicyPage'

export default function Router() {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={<Navigate to="/dashboard" replace={true} />}
      />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/contact" element={<FeedbackPage />} />
      <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
    </Routes>
  )
}
