import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import Resources from './pages/Resources';
import InteractiveTools from './pages/InteractiveTools';
import EmergencyService from './pages/EmergencyService';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Pages
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat';
import Assessment from './pages/Assessment';
import MoodHistory from './pages/MoodHistory';
import Doctors from './pages/Doctors';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import ProtectedRoute from './router/ProtectedRoute';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            padding: '14px 20px',
            fontSize: '14px',
            fontWeight: '600',
          },
        }}
      />
      <Routes>
        {/* Public Routes with Navbar & Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/tools" element={<InteractiveTools />} />
          <Route path="/emergency" element={<EmergencyService />} />
          <Route path="/doctors" element={<Doctors />} />
        </Route>

        {/* Auth Pages (own layout with Navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/history" element={<MoodHistory />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;