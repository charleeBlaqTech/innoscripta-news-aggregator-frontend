import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import { SingleFeedPage } from './pages/SingleFeedPage';
import SearchPage from './pages/SearchPage'
import PreferencesPage from './pages/PreferencesPage'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
          <Route path="/feed/:id" element={<ProtectedRoute><SingleFeedPage /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
          <Route path="/preferences" element={<ProtectedRoute><PreferencesPage /></ProtectedRoute>} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
