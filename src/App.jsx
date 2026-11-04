import { Navigate, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ProfileProvider } from './context/ProfileContext';
import { ThemeProvider } from './context/ThemeContext';
import { BoardProvider } from './context/BoardContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Header } from './components/layout/Header';
import { DemoNotice } from './components/layout/DemoNotice';
import { Footer } from './components/layout/Footer';
import { StorageNotice } from './components/layout/StorageNotice';
import { BoardPage } from './pages/BoardPage';
import { ProfilesPage } from './pages/ProfilesPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <ProfileProvider>
      <ThemeProvider>
        <BoardProvider>
          <Header />
          <DemoNotice />
          <Routes>
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/login" element={<Navigate to="/profiles" replace />} />
            <Route path="/register" element={<Navigate to="/profiles" replace />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <BoardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </BoardProvider>
        <Toaster position="bottom-right" richColors />
        <StorageNotice />
      </ThemeProvider>
    </ProfileProvider>
  );
}

export default App;
