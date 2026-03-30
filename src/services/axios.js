import axios from 'axios';

// Axios 기본 설정
// Vite 프록시를 사용하므로 상대 경로로 설정
const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 요청 인터셉터: Authorization 헤더 자동 추가
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 401/403 에러 처리
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;

            // 401 Unauthorized: 토큰이 없거나 유효하지 않음
            if (status === 401) {
                console.error('인증 토큰이 만료되었거나 유효하지 않습니다.');
                localStorage.removeItem('token');
                window.location.href = '/';
            }

            // 403 Forbidden: 권한이 없음
            if (status === 403) {
                console.error('접근 권한이 없습니다.');
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
