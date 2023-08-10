import { Navigate, Route, Routes } from 'react-router-dom'
import { ErrorPage } from './pages/ErrorPage/ErrorPage'

export default function Router() {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={<Navigate to="/dashboard" replace={true} />}
      />
      <Route path="/dashboard" element={<ErrorPage />} />
    </Routes>
  )
}
