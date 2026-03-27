import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
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
            </Route>
        </Routes>
    );
}

export default Router;
