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

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('ko-KR') : '-';
    const STATUS_LABEL = { pending: '대기 중', approved: '승인됨', rejected: '반려됨', issued: '발급 완료' };

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
                        <p className="profile-role text-muted mb-3">{empInfo?.rank ?? '임직원'}</p>
                        <div className="profile-info w-100">
                            <div className="profile-info-row">
                                <span className="info-label">소속</span>
                                <span className="info-value">{empInfo?.department ?? '-'}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="info-label">담당 업무</span>
                                <span className="info-value">{empInfo?.duties ?? '-'}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="info-label">이메일</span>
                                <span className="info-value" style={{ fontSize: '0.78rem' }}>{empInfo?.email ?? user?.email ?? '-'}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="info-label">내선번호</span>
                                <span className="info-value">{empInfo?.ext ?? '-'}</span>
                            </div>
                        </div>
                        <Link to="/admin/my-profile" className="profile-edit-link mt-3">
                            내 정보 보기 <ChevronRight size={14} />
                        </Link>
                    </Card.Body>
                </Card>
            </Col>

            {/* 우측 */}
            <Col xs={12} md={9}>
                <Row className="g-4">
                    {/* CTA 배너 */}
                    <Col xs={12}>
                        <Link to="/admin/employee-certificate" style={{ textDecoration: 'none' }}>
                            <div className="cta-banner">
                                <div className="cta-icon"><FileText size={48} /></div>
                                <div className="cta-text">
                                    <h4>재직증명서 즉시 발급하기</h4>
                                    <p>재직증명서를 온라인으로 신청하고 바로 출력하세요.</p>
                                </div>
                                <ChevronRight size={32} className="cta-arrow" />
                            </div>
                        </Link>
                    </Col>

                    {/* 최근 발급 이력 */}
                    <Col xs={12}>
                        <Card className="admin-menu-card">
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="history-title mb-0">최근 발급 이력</h6>
                                    <Link to="/admin/my-profile" className="history-more">
                                        전체 보기 <ChevronRight size={14} />
                                    </Link>
                                </div>
                                {historyLoading ? (
                                    <div className="text-center py-3">
                                        <Spinner animation="border" size="sm" style={{ color: '#1C2D60' }} />
                                    </div>
                                ) : history.length === 0 ? (
                                    <p className="text-muted text-center py-3 mb-0" style={{ fontSize: '0.88rem' }}>
                                        발급 이력이 없습니다.
                                    </p>
                                ) : history.slice(0, 5).map((item, i) => (
                                    <div key={i} className="history-row">
                                        <span className="history-cert">재직증명서</span>
                                        <span className="history-purpose">{item.purpose ?? '-'}</span>
                                        <span className="history-date">{formatDate(item.issue_date)}</span>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
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
            title: '발급 현황 관리',
            description: '전체 임직원의 발급 내역을 확인하고 승인합니다.',
            icon: <ClipboardList size={44} />,
            path: '/admin/employee-certificate/manage',
        },
        {
            title: '이용 통계',
            description: '증명서 발급 및 서비스 이용 현황을 조회합니다.',
            icon: <BarChart size={44} />,
            path: '/admin/statistics',
        },
        {
            title: '임직원 명부',
            description: '부서별 임직원 목록 및 권한을 관리합니다.',
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
                    <h1>{isAdmin ? '인사 관리 시스템' : '인사 서비스'}</h1>
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
                                내 정보 보기 <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="admin-section-header mb-4">
                            <span className="admin-section-title">관리 메뉴</span>
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
