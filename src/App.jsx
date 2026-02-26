import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FeedPage     from './pages/FeedPage'

function PrivateRoute({ children }) {
  const { user, ready } = useAuth()
  if (!ready) return null
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<PrivateRoute><FeedPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
