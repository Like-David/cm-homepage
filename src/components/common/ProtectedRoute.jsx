import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Spinner } from 'react-bootstrap';

/**
 * 권한 기반 보호된 라우트 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 보호할 컴포넌트
 * @param {string[]} props.requiredRoles - 접근 가능한 역할 목록 (예: ['EMPLOYEE', 'ADMIN'])
 */
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { user, loading } = useAuth();

    // 로딩 중일 때 스피너 표시
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">로딩 중...</span>
                </Spinner>
            </div>
        );
    }

    // 로그인하지 않은 경우 홈으로 리다이렉트
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // 권한이 부족한 경우 홈으로 리다이렉트
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    // 권한이 있으면 children 렌더링
    return children;
};

export default ProtectedRoute;
