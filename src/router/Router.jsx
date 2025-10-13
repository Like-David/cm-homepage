import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Index from '../pages/Index';
import SolutionPage from '../pages/SolutionPage';

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/solution" element={<SolutionPage />} />
            </Route>
        </Routes>
    );
}

export default Router;
