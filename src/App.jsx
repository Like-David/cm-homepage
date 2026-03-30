import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Router from './router/Router';
import './services/axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}

export default App;