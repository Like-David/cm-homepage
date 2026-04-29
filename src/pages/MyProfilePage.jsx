import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { User, Mail, Phone, Briefcase, Building2, Clock } from 'lucide-react';
import Banner from '../components/common/Banner';
import { useAuth } from '@/contexts/AuthContext';
import { findByName } from '@/data/employees';
import * as adminService from '../services/admin';
import '../styles/AdminPage.css';
import '../styles/MyProfilePage.css';

const MyProfilePage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const empInfo = findByName(user?.name);

    const [history, setHistory]       = useState([]);
    const [loading, setLoading]       = useState(true);

    useEffect(() => {
        if (!user?.name) return;
        adminService.getMyCertificates(user.name)
            .then((res) => setHistory(res.data ?? []))
            .catch(() => setHistory([]))
            .finally(() => setLoading(false));
    }, [user?.name]);

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('ko-KR').replace(/\.$/, '') : '-';

    const infoRows = [
        { icon: <User size={16} />,      label: t('admin.employee_name'),     value: user?.name ?? '-' },
        { icon: <Briefcase size={16} />, label: t('admin.employee_position'), value: empInfo?.rank ?? '-' },
        { icon: <Building2 size={16} />, label: t('admin.department'),     value: empInfo?.department ?? '-' },
        { icon: <Briefcase size={16} />, label: t('admin.employee_duties'), value: empInfo?.duties ?? '-' },
        { icon: <Mail size={16} />,      label: t('auth.email'),   value: empInfo?.email ?? user?.email ?? '-' },
        { icon: <Phone size={16} />,     label: t('admin.extension_number'), value: empInfo?.ext ?? '-' },
    ];

    return (
        <div className="admin-page">
            <Banner title={t('admin.my_profile')} subtitle={t('admin.my_profile_subtitle')} />

            <Container className="py-5" style={{ maxWidth: 860 }}>
                <Row className="g-4">
                    {/* 프로필 카드 */}
                    <Col xs={12} md={4}>
                        <Card className="admin-content-card h-100 text-center">
                            <Card.Body className="d-flex flex-column align-items-center p-4">
                                <div className="profile-avatar mb-3">
                                    <User size={44} />
                                </div>
                                <h5 className="profile-name mb-1">{user?.name ?? '-'}</h5>
                                <p className="profile-role text-muted mb-0">{empInfo?.rank ?? t('auth.role_employee')}</p>
                                <p className="text-muted mt-1" style={{ fontSize: '0.82rem' }}>
                                    {empInfo?.department ?? '-'}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* 상세 정보 */}
                    <Col xs={12} md={8}>
                        <Card className="admin-content-card h-100">
                            <Card.Body className="p-4">
                                <h6 className="history-title mb-4">{t('admin.hr_info')}</h6>
                                {infoRows.map((row, i) => (
                                    <div key={i} className="myprofile-info-row">
                                        <span className="myprofile-label">
                                            <span className="myprofile-icon">{row.icon}</span>
                                            {row.label}
                                        </span>
                                        <span className="myprofile-value">{row.value}</span>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* 발급 이력 전체 */}
                    <Col xs={12}>
                        <Card className="admin-content-card">
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center gap-2 mb-4">
                                    <Clock size={18} color="#1C2D60" />
                                    <h6 className="history-title mb-0">{t('admin.all_issue_history')}</h6>
                                </div>

                                {loading ? (
                                    <div className="text-center py-4">
                                        <Spinner animation="border" size="sm" style={{ color: '#1C2D60' }} />
                                    </div>
                                ) : history.length === 0 ? (
                                    <p className="text-muted text-center py-3 mb-0" style={{ fontSize: '0.88rem' }}>
                                        {t('admin.no_issue_history')}
                                    </p>
                                ) : (
                                    <div className="board-table-wrap">
                                    <table className="board-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 40 }}>No.</th>
                                                <th>{t('admin.certificate_type')}</th>
                                                <th>{t('admin.submission_place')}</th>
                                                <th style={{ width: 110 }}>{t('admin.issue_date')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="text-muted" style={{ fontSize: '0.85rem' }}>{i + 1}</td>
                                                    <td style={{ fontWeight: 600 }}>{t('menu.employee_certificate')}</td>
                                                    <td style={{ color: '#555' }}>{item.purpose ?? '-'}</td>
                                                    <td style={{ color: '#888', fontSize: '0.85rem' }}>{formatDate(item.issue_date)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MyProfilePage;
