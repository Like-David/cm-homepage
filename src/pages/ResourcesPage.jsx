import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SupportNav from '../components/support/SupportNav';
import Banner from '@/components/common/Banner';
import '../styles/ResourcesPage.css';

const RESOURCES = [
    {
        id: 1,
        category: 'guide',
        title: 'ReportExpress Enterprise 설치 가이드',
        description: 'Enterprise 버전 설치 및 초기 설정 방법을 안내합니다.',
        type: 'PDF',
        size: '3.2 MB',
        version: 'v3.5',
        date: '2024.03',
        file: '/downloads/rx-enterprise-install-guide.pdf',
    },
    {
        id: 2,
        category: 'guide',
        title: 'RX-Cert 설치 가이드',
        description: '증명서 발급 솔루션 RX-Cert의 설치 가이드입니다.',
        type: 'PDF',
        size: '2.1 MB',
        version: 'v2.1',
        date: '2024.02',
        file: '/downloads/rxcert-install-guide.pdf',
    },
    {
        id: 3,
        category: 'guide',
        title: 'RX-Loan 설치 가이드',
        description: '전자 약정서 솔루션 RX-Loan의 설치 및 연동 가이드입니다.',
        type: 'PDF',
        size: '1.8 MB',
        version: 'v1.4',
        date: '2024.01',
        file: '/downloads/rxloan-install-guide.pdf',
    },
    {
        id: 4,
        category: 'program',
        title: 'ReportExpress Enterprise',
        description: '전자문서 플랫폼의 핵심 엔진, Enterprise 최신 버전입니다.',
        type: 'EXE',
        size: '152 MB',
        version: 'v3.5.4',
        date: '2024.03',
        file: '/downloads/rx-enterprise-setup.exe',
    },
    {
        id: 5,
        category: 'program',
        title: 'RX-Cert',
        description: '기관·기업용 증명서 자동 발급 솔루션 설치 파일입니다.',
        type: 'EXE',
        size: '48 MB',
        version: 'v2.1.2',
        date: '2024.02',
        file: '/downloads/rxcert-setup.exe',
    },
    {
        id: 6,
        category: 'program',
        title: 'RX-Loan',
        description: '전자 약정서·대출 서류 자동화 솔루션 설치 파일입니다.',
        type: 'EXE',
        size: '35 MB',
        version: 'v1.4.1',
        date: '2024.01',
        file: '/downloads/rxloan-setup.exe',
    },
];

const CATEGORIES = ['all', 'guide', 'program'];

const FileIcon = ({ type, category }) => {
    if (type === 'PDF') {
        return (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="resource-card__file-icon">
                <rect width="48" height="48" rx="10" fill="#FFF0F0" />
                <path d="M14 8h14l10 10v22a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" fill="#E53935" opacity="0.15" />
                <path d="M28 8l10 10H28V8z" fill="#E53935" opacity="0.4" />
                <path d="M14 8h14l10 10v22a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" stroke="#E53935" strokeWidth="1.5" fill="none" />
                <text x="24" y="33" textAnchor="middle" fill="#E53935" fontSize="9" fontWeight="800" fontFamily="sans-serif">PDF</text>
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="resource-card__file-icon">
            <rect width="48" height="48" rx="10" fill="#FFF8F0" />
            <path d="M14 8h14l10 10v22a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" fill="#FF6F00" opacity="0.15" />
            <path d="M28 8l10 10H28V8z" fill="#FF6F00" opacity="0.4" />
            <path d="M14 8h14l10 10v22a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" stroke="#FF6F00" strokeWidth="1.5" fill="none" />
            <text x="24" y="33" textAnchor="middle" fill="#FF6F00" fontSize="9" fontWeight="800" fontFamily="sans-serif">EXE</text>
        </svg>
    );
};

const DownloadIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const ResourcesPage = () => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState('all');

    const filtered = useMemo(() => {
        return activeCategory === 'all'
            ? RESOURCES
            : RESOURCES.filter(r => r.category === activeCategory);
    }, [activeCategory]);

    const counts = useMemo(() => ({
        all: RESOURCES.length,
        guide: RESOURCES.filter(r => r.category === 'guide').length,
        program: RESOURCES.filter(r => r.category === 'program').length,
    }), []);

    return (
        <div className="support-page-wrapper">
            <Banner title={t('resources.banner_title')} subtitle={t('resources.banner_subtitle')} />
            <SupportNav />

            <div className="support-content-area">
                <div className="contact-us-section resources-section">

                    {/* 필터 탭 */}
                    <div className="resources-tabs">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`resources-tab ${activeCategory === cat ? 'resources-tab--active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {t(`resources.categories.${cat}`)}
                                <span className="resources-tab-count">
                                    {cat === 'all' ? counts.all : counts[cat]}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* 카드 그리드 */}
                    {filtered.length > 0 ? (
                        <div className="resources-grid">
                            {filtered.map(item => (
                                <div key={item.id} className={`resource-card resource-card--${item.category}`}>
                                    <div className="resource-card__top">
                                        <FileIcon type={item.type} category={item.category} />
                                        <div className="resource-card__badges">
                                            <span className={`resources-badge resources-badge--${item.category}`}>
                                                {t(`resources.categories.${item.category}`)}
                                            </span>
                                            <span className={`resources-type resources-type--${item.type.toLowerCase()}`}>
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="resource-card__body">
                                        <h3 className="resource-card__title">{item.title}</h3>
                                        <p className="resource-card__desc">{item.description}</p>
                                    </div>
                                    <div className="resource-card__meta">
                                        <span className="resource-card__meta-item">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                            {item.size}
                                        </span>
                                        <span className="resource-card__meta-item">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
                                            {item.version}
                                        </span>
                                        <span className="resource-card__meta-item resource-card__meta-date">
                                            {item.date}
                                        </span>
                                    </div>
                                    <a href={item.file} download className="resource-card__download">
                                        <DownloadIcon />
                                        {t('resources.download_btn')}
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="resources-empty">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <p>{t('resources.empty')}</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
