import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Spinner } from 'react-bootstrap';
import AlertModal from './AlertModal';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ isOpen: false, type: 'warning', message: '' });

    const notLoggedIn  = !loading && !user;
    const noPermission = !loading && user && requiredRoles.length > 0 && !requiredRoles.includes(user.role);

    useEffect(() => {
        if (notLoggedIn) {
            setAlert({ isOpen: true, type: 'warning', message: '로그인이 필요한 페이지입니다.' });
        } else if (noPermission) {
            setAlert({ isOpen: true, type: 'error', message: '접근 권한이 없습니다.' });
        }
    }, [notLoggedIn, noPermission]);

    const handleClose = () => {
        setAlert({ isOpen: false, type: 'warning', message: '' });
        navigate('/', { replace: true });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">로딩 중...</span>
                </Spinner>
            </div>
        );
    }

    if (notLoggedIn || noPermission) {
        return (
            <AlertModal
                isOpen={alert.isOpen}
                onClose={handleClose}
                type={alert.type}
                message={alert.message}
            />
        );
    }

    return children;
};

export default ProtectedRoute;
