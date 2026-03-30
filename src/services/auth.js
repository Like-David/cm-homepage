import axios from './axios';

/**
 * 회원가입
 * @param {Object} userData - { name, email, password, role }
 * @returns {Promise<Object>}
 */
export const register = async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response.data;
};

/**
 * 로그인
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} - { token, user }
 */
export const login = async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
};

/**
 * 현재 사용자 정보 조회
 * @returns {Promise<Object>} - user 객체
 */
export const getCurrentUser = async () => {
    const response = await axios.get('/auth/me');
    return response.data.user;
};

/**
 * 로그아웃
 */
export const logout = () => {
    localStorage.removeItem('token');
};
