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
import EmployeeCertificateIssuePage from '@/pages/EmployeeCertificateIssuePage';
import EmployeeCertificatePage from '@/pages/EmployeeCertificatePage';
import UserManagementPage from '@/pages/UserManagementPage';
import StatisticsPage from '@/pages/StatisticsPage';
import MyProfilePage from '@/pages/MyProfilePage';
import SettingsPage from '@/pages/SettingsPage';

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
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

                {/* 관리자 대시보드 - EMPLOYEE, ADMIN 공통 */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'ADMIN']}>
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />

                {/* 재직증명서 발급 신청 - EMPLOYEE, ADMIN 공통 */}
                <Route
                    path="/admin/employee-certificate"
                    element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'ADMIN']}>
                            <EmployeeCertificateIssuePage />
                        </ProtectedRoute>
                    }
                />

                {/* 재직증명서 관리 - ADMIN 전용 */}
                <Route
                    path="/admin/employee-certificate/manage"
                    element={
                        <ProtectedRoute requiredRoles={['ADMIN']}>
                            <EmployeeCertificatePage />
                        </ProtectedRoute>
                    }
                />

                {/* 사용자 관리 - ADMIN 전용 */}
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute requiredRoles={['ADMIN']}>
                            <UserManagementPage />
                        </ProtectedRoute>
                    }
                />

                {/* 내 정보 - EMPLOYEE, ADMIN 공통 */}
                <Route
                    path="/admin/my-profile"
                    element={
                        <ProtectedRoute requiredRoles={['EMPLOYEE', 'ADMIN']}>
                            <MyProfilePage />
                        </ProtectedRoute>
                    }
                />

                {/* 통계 - ADMIN 전용 */}
                <Route
                    path="/admin/statistics"
                    element={
                        <ProtectedRoute requiredRoles={['ADMIN']}>
                            <StatisticsPage />
                        </ProtectedRoute>
                    }
                />

                {/* 시스템 설정 - ADMIN 전용 */}
                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute requiredRoles={['ADMIN']}>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
}

export default Router;
