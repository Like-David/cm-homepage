import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Index from '@/pages/Index';

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
            </Route>
        </Routes>
    );
}

export default Router;