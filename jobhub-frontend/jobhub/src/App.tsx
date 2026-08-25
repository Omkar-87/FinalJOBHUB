import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { CandidateLayout } from '@/components/layout/CandidateLayout';
import { RecruiterLayout } from '@/components/layout/RecruiterLayout';

import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';

import DashboardPage from '@/pages/candidate/DashboardPage';
import JobSearchPage from '@/pages/candidate/JobSearchPage';
import JobDetailsPage from '@/pages/candidate/JobDetailsPage';
import ApplicationFlowPage from '@/pages/candidate/ApplicationFlowPage';
import ApplicationTrackingPage from '@/pages/candidate/ApplicationTrackingPage';
import ApplicationDetailPage from '@/pages/candidate/ApplicationDetailPage';
import ProfilePage from '@/pages/candidate/ProfilePage';
import ResumePage from '@/pages/candidate/ResumePage';
import RecommendationsPage from '@/pages/candidate/RecommendationsPage';
import SavedJobsPage from '@/pages/candidate/SavedJobsPage';

import RecruiterDashboardPage from '@/pages/recruiter/DashboardPage';
import PostJobPage from '@/pages/recruiter/PostJobPage';
import MyJobsPage from '@/pages/recruiter/MyJobsPage';
import RecruiterApplicationsPage from '@/pages/recruiter/ApplicationsPage';
import CandidatesPage from '@/pages/recruiter/CandidatesPage';
import AnalyticsPage from '@/pages/recruiter/AnalyticsPage';
import RecruiterCompanyPage from '@/pages/recruiter/CompanyPage';

import SettingsPage from '@/pages/shared/SettingsPage';
import NotificationsPage from '@/pages/shared/NotificationsPage';
import CompanyProfilePage from '@/pages/shared/CompanyProfilePage';
import CompaniesPage from '@/pages/shared/CompaniesPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/company/:id" element={<CompanyProfilePage />} />

          {/* Candidate */}
          <Route element={<ProtectedRoute role="CANDIDATE" />}>
            <Route element={<CandidateLayout />}>
              <Route path="/candidate/dashboard" element={<DashboardPage />} />
              <Route path="/candidate/jobs" element={<JobSearchPage />} />
              <Route path="/candidate/jobs/:id" element={<JobDetailsPage />} />
              <Route path="/candidate/applications" element={<ApplicationTrackingPage />} />
              <Route path="/candidate/applications/:id" element={<ApplicationDetailPage />} />
              <Route path="/candidate/saved-jobs" element={<SavedJobsPage />} />
              <Route path="/candidate/resume" element={<ResumePage />} />
              <Route path="/candidate/profile" element={<ProfilePage />} />
              <Route path="/candidate/recommendations" element={<RecommendationsPage />} />
              <Route path="/candidate/settings" element={<SettingsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>
            {/* Full-bleed flow, outside the standard dashboard shell */}
            <Route path="/candidate/apply/:id" element={<ApplicationFlowPage />} />
          </Route>

          {/* Recruiter */}
          <Route element={<ProtectedRoute role="RECRUITER" />}>
            <Route element={<RecruiterLayout />}>
              <Route path="/recruiter/dashboard" element={<RecruiterDashboardPage />} />
              <Route path="/recruiter/post-job" element={<PostJobPage />} />
              <Route path="/recruiter/jobs" element={<MyJobsPage />} />
              <Route path="/recruiter/applications" element={<RecruiterApplicationsPage />} />
              <Route path="/recruiter/candidates" element={<CandidatesPage />} />
              <Route path="/recruiter/analytics" element={<AnalyticsPage />} />
              <Route path="/recruiter/company" element={<RecruiterCompanyPage />} />
              <Route path="/recruiter/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
