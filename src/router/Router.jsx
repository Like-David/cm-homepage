import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import Index from '@/pages/Index';
import AboutPage from '@/pages/About';
import SupportBoardPage from '@/pages/SupportBoardPage';
import SupportWritePage from '@/pages/SupportWritePage';
import SolutionPage from '@/pages/SolutionPage';
import ClientPage from '@/pages/ClientPage';
import FaqPage from '@/pages/FaqPage';
import OneOnOneInquiryPage from '@/pages/OneOnOneInquiryPage';
import SupportViewPage from '@/pages/SupportViewPage';
import SupportEditPage from '@/pages/SupportEditPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import AdminPage from '@/pages/AdminPage';
import EmployeeCertificatePage from '@/pages/EmployeeCertificatePage';
import UserManagementPage from '@/pages/UserManagementPage';
import StatisticsPage from '@/pages/StatisticsPage';
import SettingsPage from '@/pages/SettingsPage';

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout  />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/solution" element={<SolutionPage />} />
                <Route path="/business/client" element={<ClientPage />} />
                <Route path="/support" element={<SupportBoardPage />} />
                <Route path="/support/write" element={<SupportWritePage />} />
                <Route path="/support/faq" element={<FaqPage />} />
                <Route path="/support/inquiry" element={<OneOnOneInquiryPage />} />
                <Route path="/support/:id" element={<SupportViewPage />} />
                <Route path="/support/:id/edit" element={<SupportEditPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'ADMIN']}>
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/employee-certificate"
                    element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'ADMIN']}>
                            <EmployeeCertificatePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'ADMIN']}>
                            <UserManagementPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/statistics"
                    element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'ADMIN']}>
                            <StatisticsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'ADMIN']}>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
}

export default Router;
