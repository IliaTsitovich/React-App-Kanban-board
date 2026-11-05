import { Navigate, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ProfileProvider } from './context/ProfileContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { BoardProvider } from './context/BoardContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { StorageNotice } from './components/layout/StorageNotice';
import { BoardPage } from './pages/BoardPage';
import { ProfilesPage } from './pages/ProfilesPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ThemedToaster() {
  const { theme } = useTheme();
  return <Toaster theme={theme} position="top-right" offset={{ top: 68, right: 16 }} />;
}

function App() {
  return (
    <ProfileProvider>
      <ThemeProvider>
        <BoardProvider>
          <Header />
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
        <ThemedToaster />
        <StorageNotice />
      </ThemeProvider>
    </ProfileProvider>
  );
}

export default App;
