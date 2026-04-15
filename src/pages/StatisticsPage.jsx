import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Users, FileText, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Banner from '../components/common/Banner';
import { getStatistics } from '../services/admin';
import '../styles/AdminPage.css';
import '../styles/StatisticsPage.css';

const ROLE_LABEL = { ADMIN: '관리자', EMPLOYEE: '임직원', GUEST: '게스트' };
const ROLE_COLOR = { ADMIN: '#1C2D60', EMPLOYEE: '#2E4F8E', GUEST: '#9aa3b2' };

const growthRate = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
};

const GrowthBadge = ({ rate }) => {
    if (rate > 0) return (
        <span className="st-growth positive">
            <TrendingUp size={13} /> +{rate}%
        </span>
    );
    if (rate < 0) return (
        <span className="st-growth negative">
            <TrendingDown size={13} /> {rate}%
        </span>
    );
    return (
        <span className="st-growth neutral">
            <Minus size={13} /> 0%
        </span>
    );
};

const StatisticsPage = () => {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getStatistics()
            .then(setData)
            .catch(() => setError('통계 데이터를 불러오는데 실패했습니다.'))
            .finally(() => setLoading(false));
    }, []);

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('ko-KR') : '-';

    if (loading) return (
        <div className="admin-page">
            <Banner title={t('admin.statistics')} subtitle={t('admin.statistics_desc')} />
            <div className="text-center py-5 mt-5">
                <Spinner animation="border" style={{ color: '#1C2D60' }} />
            </div>
        </div>
    );

    const s = data?.summary ?? {};
    const userWeeklyRate  = growthRate(s.newUsersThisWeek, s.newUsersLastWeek);
    const postMonthlyRate = growthRate(s.newPostsThisMonth, s.newPostsLastMonth);

    const summaryCards = [
        {
            title: '전체 사용자',
            value: (s.totalUsers ?? 0).toLocaleString(),
            sub: `이번 주 신규 ${s.newUsersThisWeek ?? 0}명`,
            rate: userWeeklyRate,
            rateLabel: '저번 주 대비',
            icon: <Users size={36} />,
            color: '#1C2D60',
        },
        {
            title: '전체 게시글',
            value: (s.totalPosts ?? 0).toLocaleString(),
            sub: `이번 달 ${s.newPostsThisMonth ?? 0}건`,
            rate: postMonthlyRate,
            rateLabel: '저번 달 대비',
            icon: <FileText size={36} />,
            color: '#2E4F8E',
        },
        {
            title: '재직증명서 발급',
            value: (s.totalCertificates ?? 0).toLocaleString(),
            sub: '누적 발급 건수',
            rate: null,
            icon: <Award size={36} />,
            color: '#4A6FA5',
        },
    ];

    // 게시글 답변 현황
    const answered = data?.postStatus?.find(p => p.status === '답변완료')?.count ?? 0;
    const waiting  = data?.postStatus?.find(p => p.status === '답변대기')?.count ?? 0;
    const totalStatus = answered + waiting;
    const answeredPct = totalStatus > 0 ? Math.round((answered / totalStatus) * 100) : 0;

    return (
        <div className="admin-page">
            <Banner title={t('admin.statistics')} subtitle={t('admin.statistics_desc')} />

            <Container className="py-5">
                {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

                {/* 요약 카드 */}
                <Row className="mb-4">
                    {summaryCards.map((card, i) => (
                        <Col key={i} xs={12} sm={6} lg={4} className="mb-4">
                            <Card className="st-summary-card h-100">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="st-icon" style={{ background: `${card.color}18`, color: card.color }}>
                                            {card.icon}
                                        </div>
                                        {card.rate !== null && (
                                            <div className="text-end">
                                                <GrowthBadge rate={card.rate} />
                                                <div className="st-rate-label">{card.rateLabel}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="st-value">{card.value}</div>
                                    <div className="st-title">{card.title}</div>
                                    <div className="st-sub">{card.sub}</div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="mb-4">
                    {/* 역할별 사용자 분포 */}
                    <Col lg={4} className="mb-4">
                        <Card className="st-card h-100">
                            <Card.Body>
                                <h6 className="st-card-title">역할별 사용자 분포</h6>
                                <div className="st-role-list">
                                    {(data?.roleDistribution ?? []).map((r) => {
                                        const pct = s.totalUsers > 0
                                            ? Math.round((r.count / s.totalUsers) * 100)
                                            : 0;
                                        return (
                                            <div key={r.role} className="st-role-item">
                                                <div className="st-role-header">
                                                    <span className="st-role-dot" style={{ background: ROLE_COLOR[r.role] }} />
                                                    <span className="st-role-name">{ROLE_LABEL[r.role] ?? r.role}</span>
                                                    <span className="st-role-count ms-auto">{r.count}명</span>
                                                    <span className="st-role-pct">{pct}%</span>
                                                </div>
                                                <div className="st-bar-bg">
                                                    <div
                                                        className="st-bar-fill"
                                                        style={{ width: `${pct}%`, background: ROLE_COLOR[r.role] }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* 게시글 답변 현황 */}
                    <Col lg={4} className="mb-4">
                        <Card className="st-card h-100">
                            <Card.Body>
                                <h6 className="st-card-title">게시글 답변 현황</h6>
                                <div className="st-donut-wrap">
                                    <svg viewBox="0 0 36 36" className="st-donut">
                                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f0f2f6" strokeWidth="3" />
                                        <circle
                                            cx="18" cy="18" r="15.9" fill="none"
                                            stroke="#1C2D60" strokeWidth="3"
                                            strokeDasharray={`${answeredPct} ${100 - answeredPct}`}
                                            strokeDashoffset="25"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="st-donut-center">
                                        <div className="st-donut-pct">{answeredPct}%</div>
                                        <div className="st-donut-label">답변완료</div>
                                    </div>
                                </div>
                                <div className="st-status-row">
                                    <div className="st-status-item">
                                        <span className="st-role-dot" style={{ background: '#1C2D60' }} />
                                        <span>답변완료</span>
                                        <strong className="ms-auto">{answered}건</strong>
                                    </div>
                                    <div className="st-status-item">
                                        <span className="st-role-dot" style={{ background: '#e4e8f0' }} />
                                        <span>답변대기</span>
                                        <strong className="ms-auto">{waiting}건</strong>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* 최근 가입 사용자 */}
                    <Col lg={4} className="mb-4">
                        <Card className="st-card h-100">
                            <Card.Body>
                                <h6 className="st-card-title">최근 가입 사용자</h6>
                                <div className="st-user-list">
                                    {(data?.recentUsers ?? []).length === 0 ? (
                                        <p className="text-muted text-center mt-3" style={{ fontSize: '0.85rem' }}>
                                            가입 사용자가 없습니다
                                        </p>
                                    ) : (data?.recentUsers ?? []).map((u) => (
                                        <div key={u.id} className="st-user-item">
                                            <div className="st-user-info">
                                                <span className="st-user-name">{u.name}</span>
                                                <span className="st-user-email">{u.email}</span>
                                            </div>
                                            <div className="text-end">
                                                <span
                                                    className="um-badge"
                                                    style={{ color: ROLE_COLOR[u.role], background: `${ROLE_COLOR[u.role]}18`, fontSize: '0.72rem' }}
                                                >
                                                    {ROLE_LABEL[u.role] ?? u.role}
                                                </span>
                                                <div className="st-user-date">{formatDate(u.created_at)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* 인기 게시글 */}
                <Row>
                    <Col>
                        <Card className="st-card">
                            <Card.Body>
                                <h6 className="st-card-title">인기 게시글 Top 5 <span className="st-card-sub">조회수 기준</span></h6>
                                {(data?.topPosts ?? []).length === 0 ? (
                                    <p className="text-muted text-center py-3" style={{ fontSize: '0.85rem' }}>
                                        게시글이 없습니다
                                    </p>
                                ) : (
                                    <table className="st-top-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 40 }}>순위</th>
                                                <th>제목</th>
                                                <th style={{ width: 80 }}>작성자</th>
                                                <th style={{ width: 80 }}>조회수</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(data?.topPosts ?? []).map((p, i) => (
                                                <tr key={p.id}>
                                                    <td>
                                                        <span className={`st-rank ${i < 3 ? 'top' : ''}`}>
                                                            {i + 1}
                                                        </span>
                                                    </td>
                                                    <td className="st-post-title">{p.title}</td>
                                                    <td className="text-muted">{p.author}</td>
                                                    <td>
                                                        <span className="st-views">
                                                            {(p.views ?? 0).toLocaleString()}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default StatisticsPage;
