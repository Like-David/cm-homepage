import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 초기 로드 시 토큰 검증 및 사용자 정보 가져오기
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    console.error('토큰 검증 실패:', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { token, user: userData } = await authService.login(email, password);
            localStorage.setItem('token', token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || '로그인에 실패했습니다.'
            };
        }
    };

    const register = async (userData) => {
        try {
            await authService.register(userData);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || '회원가입에 실패했습니다.',
                errors: error.response?.data?.errors
            };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const hasRole = (...roles) => {
        return user && roles.includes(user.role);
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        hasRole,
        isAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
