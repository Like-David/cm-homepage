import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FileText, Users, BarChart, ClipboardList } from 'lucide-react';
import Banner from '../components/common/Banner';
import { useAuth } from '@/contexts/AuthContext';
import '../styles/AdminPage.css';

const AdminPage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';

    const hrMenuItems = [
        {
            title: '재직증명서 발급',
            description: '재직증명서 발급을 신청합니다',
            icon: <FileText size={48} />,
            path: '/admin/employee-certificate',
            color: '#1C2D60',
        },
        ...(isAdmin ? [{
            title: '관리 - 재직증명서 발급',
            description: '전체 재직증명서 조회 및 관리',
            icon: <ClipboardList size={48} />,
            path: '/admin/employee-certificate/manage',
            color: '#2E4F8E',
        }] : []),
    ];

    const adminOnlyMenuItems = [
        {
            title: t('admin.statistics'),
            description: t('admin.statistics_desc'),
            icon: <BarChart size={48} />,
            path: '/admin/statistics',
            color: '#4A6FA5',
        },
        {
            title: t('admin.user_management'),
            description: t('admin.user_management_desc'),
            icon: <Users size={48} />,
            path: '/admin/users',
            color: '#2E4F8E',
        },
    ];

    const renderCard = (item, index) => (
        <Col key={index} xs={12} sm={6} md={6} lg={3} className="mb-4">
            <Link to={item.path} style={{ textDecoration: 'none' }}>
                <Card className="admin-menu-card h-100">
                    <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                        <div className="admin-menu-icon mb-3" style={{ color: item.color }}>
                            {item.icon}
                        </div>
                        <Card.Title className="admin-menu-title mb-2">{item.title}</Card.Title>
                        <Card.Text className="admin-menu-description text-muted">
                            {item.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );

    return (
        <div className="admin-page">
            <Banner title={t('admin.banner_title')} subtitle={t('admin.banner_subtitle')} />

            <Container className="py-5">
                {/* 인사 관리 섹션 */}
                <div className="admin-section mb-5">
                    <div className="admin-section-header">
                        <span className="admin-section-title">인사 관리</span>
                    </div>
                    <Row>{hrMenuItems.map(renderCard)}</Row>
                </div>

                {/* 관리자 전용 메뉴 */}
                {isAdmin && (
                    <Row>{adminOnlyMenuItems.map(renderCard)}</Row>
                )}
            </Container>
        </div>
    );
};

export default AdminPage;
