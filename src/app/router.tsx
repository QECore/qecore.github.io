import React, { useEffect, useRef, lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Header } from "@/components/navigation/Header";
import AppSidebar from "@/components/navigation/AppSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import { useAuth } from "@/lib/AuthContext";
import { useHeader } from "@/lib/HeaderContext";
import PageNotFound from "@/lib/PageNotFound";
const HomePage = lazy(() => import('@/pages/home'));
const DocsPage = lazy(() => import('@/pages/docs'));
import K6Core from "@/pages/K6Core";
import QAWorkspace from "@/pages/QAWorkspace";
import Playground from "@/pages/Playground";
import SwaggerPortal from "@/pages/SwaggerPortal";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Dashboard from "@/pages/app/Dashboard";
import Projects from "@/pages/app/Projects";
import Tasks from "@/pages/app/Tasks";
import Board from "@/pages/app/Board";
import Documents from "@/pages/app/Documents";
import ActivityPage from "@/pages/app/ActivityPage";

function DocsRedirect() {
  const { activeHeader } = useHeader();
  return <Navigate to={`/${activeHeader}`} replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PublicLayout() {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const isDocsRoute = location.pathname.includes("/docs");
  const panelClass = isDocsRoute
    ? "glass-body-panel-docs"
    : "glass-body-panel-home";

  return (
    <PageLayout>
      <main ref={mainRef} className="flex-1 min-h-0 relative">
        <Header />
        <div className={`${panelClass} pt-20`}>
          <Suspense fallback={<div className="p-8">Loading…</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </PageLayout>
  );
}

function AppRoutes() {
  const {
    isAuthenticated,
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    navigateToLogin,
  } = useAuth();
  const location = useLocation();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (
    isAuthenticated &&
    ["/login", "/register", "/forgot-password", "/reset-password"].includes(
      location.pathname,
    )
  ) {
    return <Navigate to="/app" replace />;
  }

  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />;
    }
    if (
      authError.type === "auth_required" &&
      location.pathname.startsWith("/app")
    ) {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Navigate to="/pw-core" replace />} />
        <Route path="/pw-core" element={<HomePage />} />
        <Route path="/k6-core" element={<K6Core />} />
        <Route path="/workspace" element={<QAWorkspace />} />
        <Route path="/docs" element={<DocsRedirect />} />
        <Route path="/pw-core/docs" element={<DocsPage />} />
        <Route path="/k6-core/docs" element={<DocsPage />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/swagger" element={<SwaggerPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          element={
            <ProtectedRoute
              unauthenticatedElement={<Navigate to="/login" replace />}
            />
          }
        >
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
}

export function AppRouter() {
  return <AppRoutes />;
}
