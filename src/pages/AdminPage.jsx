import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FileText, Users, BarChart, ClipboardList, Clock, User, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { findByName } from '@/data/employees';
import * as adminService from '../services/admin';
import '../styles/AdminPage.css';
import bannerBg from '@/assets/images/Solution/solution-banner-bg.png';

/* ──────────────────────────────────────────
   임직원 · 대시보드형
────────────────────────────────────────── */
const EmployeeDashboardView = ({ user }) => {
    const { t } = useTranslation();
    const empInfo = findByName(user?.name);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    useEffect(() => {
        if (!user?.name) return;
        adminService.getMyCertificates(user.name)
            .then((res) => setHistory(res.data ?? []))
            .catch(() => setHistory([]))
            .finally(() => setHistoryLoading(false));
    }, [user?.name]);

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('ko-KR').replace(/\.$/, '') : '-';
    // const STATUS_LABEL = { pending: '대기 중', approved: '승인됨', rejected: '반려됨', issued: '발급 완료' };

    return (
        <Row className="g-4">
            {/* 좌측: 프로필 카드 */}
            <Col xs={12} md={3}>
                <Card className="profile-card h-100">
                    <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                        <div className="profile-avatar">
                            <User size={40} />
                        </div>
                        <h5 className="profile-name mt-3 mb-1">{user?.name ?? '-'}</h5>
                        <p className="profile-role text-muted mb-3">{empInfo?.rank ?? t('auth.role_employee')}</p>
                        <div className="profile-info w-100">
                            <div className="profile-info-row">
                                <span className="info-label">{t('admin.department')}</span>
                                <span className="info-value">{empInfo?.department ?? '-'}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="info-label">{t('admin.employee_position') || '직급'}</span>
                                <span className="info-value">{empInfo?.rank ?? '-'}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="info-label">{t('auth.email')}</span>
                                <span className="info-value" style={{ fontSize: '0.78rem' }}>{empInfo?.email ?? user?.email ?? '-'}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="info-label">{t('admin.extension_number') || '내선번호'}</span>
                                <span className="info-value">{empInfo?.ext ?? '-'}</span>
                            </div>
                        </div>
                        <Link to="/admin/my-profile" className="profile-edit-link mt-auto pt-3">
                            {t('admin.my_profile_view')} <ChevronRight size={14} />
                        </Link>
                    </Card.Body>
                </Card>
            </Col>

            {/* 우측: 배너 및 최근 내역 */}
            <Col xs={12} md={9}>
                <div className="d-flex flex-column h-100 gap-4">
                    {/* CTA 배너 */}
                    <Link to="/admin/employee-certificate" style={{ textDecoration: 'none' }}>
                        <div className="cta-banner h-100">
                            <div className="cta-icon"><FileText size={48} /></div>
                            <div className="cta-text">
                                <h4>{t('admin.cert_issue_cta_title')}</h4>
                                <p>{t('admin.cert_issue_cta_desc')}</p>
                            </div>
                            <ChevronRight size={32} className="cta-arrow" />
                        </div>
                    </Link>

                    {/* 최근 발급 이력 */}
                    <Card className="admin-menu-card" style={{ flex: 1 }}>
                        <Card.Body className="p-4 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="history-title mb-0">{t('admin.recent_issue_history')}</h6>
                                <Link to="/admin/my-profile" className="history-more">
                                    {t('admin.view_all')} <ChevronRight size={14} />
                                </Link>
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto' }}>
                                {historyLoading ? (
                                    <div className="text-center py-4">
                                        <Spinner animation="border" size="sm" style={{ color: '#1C2D60' }} />
                                    </div>
                                ) : history.length === 0 ? (
                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                        <p className="text-muted text-center mb-0" style={{ fontSize: '0.88rem' }}>
                                            {t('admin.no_issue_history')}
                                        </p>
                                    </div>
                                ) : (
                                    history.slice(0, 5).map((item, i) => (
                                        <div key={i} className="history-row">
                                            <span className="history-cert">{t('menu.employee_certificate')}</span>
                                            <span className="history-purpose">{item.purpose ?? '-'}</span>
                                            <span className="history-date">{formatDate(item.issue_date)}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

/* ──────────────────────────────────────────
   메인 페이지
────────────────────────────────────────── */
const AdminPage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';
    const empInfo = findByName(user?.name);

    const adminMenuItems = [
        {
            title: t('admin.employee_certificate'),
            description: t('admin.employee_certificate_desc'),
            icon: <ClipboardList size={44} />,
            path: '/admin/employee-certificate/manage',
        },
        {
            title: t('admin.statistics'),
            description: t('admin.statistics_desc'),
            icon: <BarChart size={44} />,
            path: '/admin/statistics',
        },
        {
            title: t('admin.user_management'),
            description: t('admin.user_management_desc'),
            icon: <Users size={44} />,
            path: '/admin/users',
        },
    ];

    return (
        <div className="admin-page">
            {isAdmin && <div className="admin-mode-band" />}

            <div
                className="admin-banner"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerBg})` }}
            >
                <div className="admin-banner-content">
                    <h1>{isAdmin ? t('admin.hr_management_system') : t('admin.hr_services')}</h1>
                </div>
            </div>

            <Container className="py-5">
                {isAdmin ? (
                    <>
                        {/* 관리자 프로필 미니 배너 */}
                        <div className="admin-profile-mini mb-5">
                            <div className="admin-profile-mini-left">
                                <div className="profile-avatar" style={{ width: 44, height: 44 }}>
                                    <User size={24} />
                                </div>
                                <div>
                                    <div className="admin-profile-mini-name">{user?.name ?? '-'}</div>
                                    <div className="admin-profile-mini-sub">{empInfo?.rank ?? '-'} · {empInfo?.department ?? '-'}</div>
                                </div>
                            </div>
                            <Link to="/admin/my-profile" className="profile-edit-link">
                                {t('admin.my_profile_view')} <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="admin-section-header mb-4">
                            <span className="admin-section-title">{t('admin.management_menu')}</span>
                        </div>
                        <Row>
                            {adminMenuItems.map((item, i) => (
                                <Col key={i} xs={12} sm={6} lg={4} className="mb-4">
                                    <Link to={item.path} style={{ textDecoration: 'none' }}>
                                        <Card className="admin-menu-card h-100">
                                            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                                                <div className="admin-menu-icon mb-3">{item.icon}</div>
                                                <Card.Title className="admin-menu-title mb-2">{item.title}</Card.Title>
                                                <Card.Text className="admin-menu-description text-muted">{item.description}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <EmployeeDashboardView user={user} />
                )}
            </Container>
        </div>
    );
};

export default AdminPage;
