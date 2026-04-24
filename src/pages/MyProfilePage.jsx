import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { User, Mail, Phone, Briefcase, Building2, Clock } from 'lucide-react';
import Banner from '../components/common/Banner';
import { useAuth } from '@/contexts/AuthContext';
import { findByName } from '@/data/employees';
import * as adminService from '../services/admin';
import '../styles/AdminPage.css';
import '../styles/MyProfilePage.css';

const STATUS_LABEL = {
    pending:  { text: '대기 중',  color: '#f59e0b', bg: '#fffbeb' },
    approved: { text: '승인됨',   color: '#3b82f6', bg: '#eff6ff' },
    rejected: { text: '반려됨',   color: '#ef4444', bg: '#fef2f2' },
    issued:   { text: '발급 완료', color: '#10b981', bg: '#ecfdf5' },
};

const MyProfilePage = () => {
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

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('ko-KR') : '-';

    const infoRows = [
        { icon: <User size={16} />,      label: '이름',     value: user?.name ?? '-' },
        { icon: <Briefcase size={16} />, label: '직급',     value: empInfo?.rank ?? '-' },
        { icon: <Building2 size={16} />, label: '소속',     value: empInfo?.department ?? '-' },
        { icon: <Briefcase size={16} />, label: '담당 업무', value: empInfo?.duties ?? '-' },
        { icon: <Mail size={16} />,      label: '이메일',   value: empInfo?.email ?? user?.email ?? '-' },
        { icon: <Phone size={16} />,     label: '내선번호', value: empInfo?.ext ?? '-' },
    ];

    return (
        <div className="admin-page">
            <Banner title="내 정보" subtitle="나의 인사 정보를 확인합니다." />

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
                                <p className="profile-role text-muted mb-0">{empInfo?.rank ?? '임직원'}</p>
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
                                <h6 className="history-title mb-4">인사 정보</h6>
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
                                    <h6 className="history-title mb-0">전체 발급 이력</h6>
                                </div>

                                {loading ? (
                                    <div className="text-center py-4">
                                        <Spinner animation="border" size="sm" style={{ color: '#1C2D60' }} />
                                    </div>
                                ) : history.length === 0 ? (
                                    <p className="text-muted text-center py-3 mb-0" style={{ fontSize: '0.88rem' }}>
                                        발급 이력이 없습니다.
                                    </p>
                                ) : (
                                    <div className="board-table-wrap">
                                    <table className="board-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 40 }}>No.</th>
                                                <th>증명서 종류</th>
                                                <th>제출처</th>
                                                <th style={{ width: 110 }}>발급일</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="text-muted" style={{ fontSize: '0.85rem' }}>{i + 1}</td>
                                                    <td style={{ fontWeight: 600 }}>재직증명서</td>
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
