import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Index from '@/pages/Index';
import AboutPage from '@/pages/About';
import SolutionPage from '@/pages/SolutionPage';
import ClientPage from '@/pages/ClientPage';

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout  />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/solution" element={<SolutionPage />} />
                <Route path="/business/client" element={<ClientPage />} />
            </Route>
        </Routes>
    );
}

export default Router;
