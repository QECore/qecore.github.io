import { useEffect } from 'react';
// Force recompilation
import AppLayout from '@/components/layout/AppLayout';
import AppSidebar from '@/components/layout/AppSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/Toaster';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import PageNotFound from '@/lib/PageNotFound';
import { queryClientInstance } from '@/lib/query-client';
import ActivityPage from '@/pages/app/ActivityPage';
import Board from '@/pages/app/Board';
import Dashboard from '@/pages/app/Dashboard';
import Documents from '@/pages/app/Documents';
import Projects from '@/pages/app/Projects';
import Tasks from '@/pages/app/Tasks';
import ForgotPassword from '@/pages/ForgotPassword';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Playground from '@/pages/Playground';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import SwaggerPortal from '@/pages/SwaggerPortal';
import Docs from '@/pages/Docs';
import K6Core from '@/pages/K6Core';
import { HeaderProvider, useHeader } from '@/lib/HeaderContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

const LandingWrapper = () => {
  const { activeHeader } = useHeader();
  return activeHeader === "pw-core" ? <Landing /> : <K6Core />;
};

const DocsRedirect = () => {
  const { activeHeader } = useHeader();
  return <Navigate to={`/${activeHeader}/docs`} replace />;
};

const AuthenticatedApp = () => {
  const { isAuthenticated, isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const location = useLocation();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated && ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname)) {
    return <Navigate to="/app" replace />;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      if (location.pathname.startsWith('/app')) {
        navigateToLogin();
        return null;
      }
    }
  }

  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/pw-core" replace />} />
        <Route path="/pw-core" element={<Landing />} />
        <Route path="/k6-core" element={<K6Core />} />
        <Route path="/docs" element={<DocsRedirect />} />
        <Route path="/pw-core/docs" element={<Docs />} />
        <Route path="/k6-core/docs" element={<Docs />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/swagger" element={<SwaggerPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected App Routes */}
        <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
          <Route path="/app" element={<AppSidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="board" element={<Board />} />
            <Route path="documents" element={<Documents />} />
            <Route path="activity" element={<ActivityPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <HeaderProvider>
            <AuthenticatedApp />
          </HeaderProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App