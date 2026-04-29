import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Users, FileText, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Banner from '../components/common/Banner';
import { getStatistics } from '../services/admin';
import '../styles/AdminPage.css';
import '../styles/StatisticsPage.css';

const StatisticsPage = () => {
    const { t } = useTranslation();

    const ROLE_LABEL = {
        ADMIN:    t('auth.role_admin'),
        EMPLOYEE: t('auth.role_employee'),
        GUEST:    t('auth.role_guest')
    };
    const ROLE_COLOR = { ADMIN: '#1C2D60', EMPLOYEE: '#2E4F8E', GUEST: '#9aa3b2' };

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getStatistics()
            .then(setData)
            .catch(() => setError(t('admin.stats_load_fail')))
            .finally(() => setLoading(false));
    }, [t]);

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('ko-KR') : '-';

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
    const certMonthlyRate = growthRate(s.newCertificatesThisMonth, s.newCertificatesLastMonth);

    const summaryCards = [
        {
            title: t('admin.total_users_label'),
            value: (s.totalUsers ?? 0).toLocaleString(),
            sub: t('admin.new_users_week', { count: s.newUsersThisWeek ?? 0 }),
            rate: userWeeklyRate,
            rateLabel: t('admin.vs_prev_week'),
            icon: <Users size={36} />,
            color: '#1C2D60',
        },
        {
            title: t('admin.total_posts_label'),
            value: (s.totalPosts ?? 0).toLocaleString(),
            sub: t('admin.new_posts_month', { count: s.newPostsThisMonth ?? 0 }),
            rate: postMonthlyRate,
            rateLabel: t('admin.vs_prev_month'),
            icon: <FileText size={36} />,
            color: '#2E4F8E',
        },
        {
            title: t('admin.total_certs_label'),
            value: (s.totalCertificates ?? 0).toLocaleString(),
            sub: t('admin.new_certs_month', { count: s.newCertificatesThisMonth ?? 0 }),
            rate: certMonthlyRate,
            rateLabel: t('admin.vs_prev_month'),
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
                                <h6 className="st-card-title">{t('admin.role_distribution')}</h6>
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
                                                    <span className="st-role-count ms-auto">{r.count}{t('admin.count_unit_person')}</span>
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
                                <h6 className="st-card-title">{t('admin.inquiry_status')}</h6>
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
                                        <div className="st-donut-label">{t('admin.answered_label')}</div>
                                    </div>
                                </div>
                                <div className="st-status-row">
                                    <div className="st-status-item">
                                        <span className="st-role-dot" style={{ background: '#1C2D60' }} />
                                        <span>{t('admin.answered_label')}</span>
                                        <strong className="ms-auto">{answered}{t('admin.count_unit_case')}</strong>
                                    </div>
                                    <div className="st-status-item">
                                        <span className="st-role-dot" style={{ background: '#e4e8f0' }} />
                                        <span>{t('admin.waiting_label')}</span>
                                        <strong className="ms-auto">{waiting}{t('admin.count_unit_case')}</strong>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* 최근 가입 사용자 */}
                    <Col lg={4} className="mb-4">
                        <Card className="st-card h-100">
                            <Card.Body>
                                <h6 className="st-card-title">{t('admin.recent_users')}</h6>
                                <div className="st-user-list">
                                    {(data?.recentUsers ?? []).length === 0 ? (
                                        <p className="text-muted text-center mt-3" style={{ fontSize: '0.85rem' }}>
                                            {t('admin.no_recent_users')}
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
                                <h6 className="st-card-title">{t('admin.popular_posts')} <span className="st-card-sub">{t('admin.by_views')}</span></h6>
                                {(data?.topPosts ?? []).length === 0 ? (
                                    <p className="text-muted text-center py-3" style={{ fontSize: '0.85rem' }}>
                                        {t('admin.no_posts')}
                                    </p>
                                ) : (
                                    <table className="st-top-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 40 }}>{t('admin.rank_label')}</th>
                                                <th>{t('support.table.title')}</th>
                                                <th style={{ width: 80 }}>{t('support.table.author')}</th>
                                                <th style={{ width: 80 }}>{t('support.table.views')}</th>
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
