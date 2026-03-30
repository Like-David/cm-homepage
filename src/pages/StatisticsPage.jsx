import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BarChart, TrendingUp, Users, FileText, Activity, Clock } from 'lucide-react';
import Banner from '../components/common/Banner';
import '../styles/AdminPage.css';

const StatisticsPage = () => {
    const { t } = useTranslation();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPosts: 0,
        activeUsers: 0,
        todayVisits: 0,
        weeklyGrowth: 0,
        monthlyGrowth: 0
    });

    useEffect(() => {
        // 임시 통계 데이터
        setStats({
            totalUsers: 1247,
            totalPosts: 456,
            activeUsers: 892,
            todayVisits: 2341,
            weeklyGrowth: 12.5,
            monthlyGrowth: 28.3
        });
    }, []);

    const statCards = [
        {
            title: t('admin.total_users'),
            value: stats.totalUsers.toLocaleString(),
            icon: <Users size={40} />,
            color: '#1C2D60',
            change: `+${stats.weeklyGrowth}%`,
            changeLabel: t('admin.weekly_growth')
        },
        {
            title: t('admin.total_posts'),
            value: stats.totalPosts.toLocaleString(),
            icon: <FileText size={40} />,
            color: '#2E4F8E',
            change: `+${stats.monthlyGrowth}%`,
            changeLabel: t('admin.monthly_growth')
        },
        {
            title: t('admin.active_users'),
            value: stats.activeUsers.toLocaleString(),
            icon: <Activity size={40} />,
            color: '#4A6FA5',
            change: '+15.2%',
            changeLabel: t('admin.vs_last_month')
        },
        {
            title: t('admin.today_visits'),
            value: stats.todayVisits.toLocaleString(),
            icon: <Clock size={40} />,
            color: '#6A8FBD',
            change: '+8.7%',
            changeLabel: t('admin.vs_yesterday')
        }
    ];

    const recentActivity = [
        { id: 1, user: '김철수', action: t('admin.created_post'), time: '5분 전', type: 'post' },
        { id: 2, user: '이영희', action: t('admin.registered'), time: '12분 전', type: 'user' },
        { id: 3, user: 'John Doe', action: t('admin.commented'), time: '23분 전', type: 'comment' },
        { id: 4, user: '박민수', action: t('admin.updated_profile'), time: '1시간 전', type: 'profile' },
        { id: 5, user: 'Jane Smith', action: t('admin.created_post'), time: '2시간 전', type: 'post' },
    ];

    const topPosts = [
        { id: 1, title: 'RX-CERT 솔루션 소개', views: 1234, comments: 45 },
        { id: 2, title: '고객 지원 시스템 업데이트', views: 987, comments: 32 },
        { id: 3, title: 'FAQ 가이드', views: 856, comments: 28 },
        { id: 4, title: '보안 정책 안내', views: 743, comments: 19 },
        { id: 5, title: '서비스 이용 약관', views: 621, comments: 15 },
    ];

    return (
        <div className="statistics-page">
            <Banner
                title={t('admin.statistics')}
                subtitle={t('admin.statistics_desc')}
            />

            <Container className="py-5">
                {/* 통계 카드 */}
                <Row className="mb-4">
                    {statCards.map((card, index) => (
                        <Col key={index} xs={12} sm={6} lg={3} className="mb-4">
                            <Card className="stat-card h-100">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div style={{ color: card.color }}>
                                            {card.icon}
                                        </div>
                                        <div className="text-end">
                                            <div className="stat-change text-success">
                                                <TrendingUp size={16} />
                                                <span className="ms-1">{card.change}</span>
                                            </div>
                                            <small className="text-muted">{card.changeLabel}</small>
                                        </div>
                                    </div>
                                    <h3 className="stat-value mb-1">{card.value}</h3>
                                    <p className="stat-title text-muted mb-0">{card.title}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row>
                    {/* 최근 활동 */}
                    <Col lg={6} className="mb-4">
                        <Card className="admin-content-card h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-2 mb-4">
                                    <Activity size={24} className="text-primary" />
                                    <h4 className="mb-0">{t('admin.recent_activity')}</h4>
                                </div>
                                <div className="activity-list">
                                    {recentActivity.map(activity => (
                                        <div key={activity.id} className="activity-item">
                                            <div className="activity-dot" style={{
                                                backgroundColor: activity.type === 'post' ? '#1C2D60' :
                                                               activity.type === 'user' ? '#28a745' :
                                                               activity.type === 'comment' ? '#ffc107' :
                                                               '#6c757d'
                                            }}></div>
                                            <div className="activity-content">
                                                <div className="activity-text">
                                                    <strong>{activity.user}</strong> {activity.action}
                                                </div>
                                                <div className="activity-time text-muted">{activity.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* 인기 게시글 */}
                    <Col lg={6} className="mb-4">
                        <Card className="admin-content-card h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-2 mb-4">
                                    <BarChart size={24} className="text-primary" />
                                    <h4 className="mb-0">{t('admin.top_posts')}</h4>
                                </div>
                                <div className="top-posts-list">
                                    {topPosts.map((post, index) => (
                                        <div key={post.id} className="top-post-item">
                                            <div className="post-rank">{index + 1}</div>
                                            <div className="post-info">
                                                <div className="post-title">{post.title}</div>
                                                <div className="post-stats">
                                                    <span className="text-muted">
                                                        👁️ {post.views.toLocaleString()} · 💬 {post.comments}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default StatisticsPage;
