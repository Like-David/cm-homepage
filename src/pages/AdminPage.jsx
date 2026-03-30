import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FileText, Users, Settings, BarChart } from 'lucide-react';
import Banner from '../components/common/Banner';
import '../styles/AdminPage.css';

const AdminPage = () => {
    const { t } = useTranslation();

    const menuItems = [
        {
            title: t('admin.employee_certificate'),
            description: t('admin.employee_certificate_desc'),
            icon: <FileText size={48} />,
            path: '/admin/employee-certificate',
            color: '#1C2D60'
        },
        {
            title: t('admin.user_management'),
            description: t('admin.user_management_desc'),
            icon: <Users size={48} />,
            path: '/admin/users',
            color: '#2E4F8E'
        },
        {
            title: t('admin.statistics'),
            description: t('admin.statistics_desc'),
            icon: <BarChart size={48} />,
            path: '/admin/statistics',
            color: '#4A6FA5'
        },
        {
            title: t('admin.settings'),
            description: t('admin.settings_desc'),
            icon: <Settings size={48} />,
            path: '/admin/settings',
            color: '#6A8FBD'
        }
    ];

    return (
        <div className="admin-page">
            <Banner title={t('admin.banner_title')} subtitle={t('admin.banner_subtitle')} />

            <Container className="py-5">
                <Row>
                    {menuItems.map((item, index) => (
                        <Col key={index} xs={12} sm={6} md={6} lg={3} className="mb-4">
                            <Link to={item.path} style={{ textDecoration: 'none' }}>
                                <Card className="admin-menu-card h-100">
                                    <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                                        <div
                                            className="admin-menu-icon mb-3"
                                            style={{ color: item.color }}
                                        >
                                            {item.icon}
                                        </div>
                                        <Card.Title className="admin-menu-title mb-2">
                                            {item.title}
                                        </Card.Title>
                                        <Card.Text className="admin-menu-description text-muted">
                                            {item.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default AdminPage;
