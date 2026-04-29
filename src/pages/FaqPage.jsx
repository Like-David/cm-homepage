import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SupportNav from "../components/support/SupportNav";
import Banner from "@/components/common/Banner";
import '../styles/SupportBoardPage.css';
import '../styles/FaqPage.css';

const FaqPage = () => {
    const { t } = useTranslation();
    const [openId, setOpenId] = useState(null);
    const panelRef = useRef(null);

    const FAQ_DATA = [
        {
            category: t('faq.categories.product'),
            categoryKey: 'product',
            items: [
                {
                    id: 'pr1',
                    question: t('faq.items.pr1.question'),
                    answers: [t('faq.items.pr1.answer')],
                },
                {
                    id: 'pr2',
                    question: t('faq.items.pr2.question'),
                    answers: [t('faq.items.pr2.answer')],
                },
                {
                    id: 'pr3',
                    question: t('faq.items.pr3.question'),
                    answers: [t('faq.items.pr3.answer')],
                },
            ],
        },
        {
            category: t('faq.categories.support'),
            categoryKey: 'support',
            items: [
                {
                    id: 's1',
                    question: t('faq.items.s1.question'),
                    answers: [t('faq.items.s1.answer')],
                },
                {
                    id: 's2',
                    question: t('faq.items.s2.question'),
                    answers: Array.isArray(t('faq.items.s2.answer', { returnObjects: true })) ? t('faq.items.s2.answer', { returnObjects: true }) : [t('faq.items.s2.answer')],
                },
                {
                    id: 's3',
                    question: t('faq.items.s3.question'),
                    answers: Array.isArray(t('faq.items.s3.answer', { returnObjects: true })) ? t('faq.items.s3.answer', { returnObjects: true }) : [t('faq.items.s3.answer')],
                },
                {
                    id: 's4',
                    question: t('faq.items.s4.question'),
                    answers: Array.isArray(t('faq.items.s4.answer', { returnObjects: true })) ? t('faq.items.s4.answer', { returnObjects: true }) : [t('faq.items.s4.answer')],
                },
            ],
        },
        {
            category: t('faq.categories.install'),
            categoryKey: 'install',
            items: [
                {
                    id: 'i1',
                    question: t('faq.items.i1.question'),
                    answers: [t('faq.items.i1.answer')],
                },
                {
                    id: 'i2',
                    question: t('faq.items.i2.question'),
                    answers: Array.isArray(t('faq.items.i2.answer', { returnObjects: true })) ? t('faq.items.i2.answer', { returnObjects: true }) : [t('faq.items.i2.answer')],
                },
                {
                    id: 'i3',
                    question: t('faq.items.i3.question'),
                    answers: [t('faq.items.i3.answer')],
                },
            ],
        },
        {
            category: t('faq.categories.print'),
            categoryKey: 'print',
            items: [
                {
                    id: 'p1',
                    question: t('faq.items.p1.question'),
                    answers: Array.isArray(t('faq.items.p1.answer', { returnObjects: true })) ? t('faq.items.p1.answer', { returnObjects: true }) : [t('faq.items.p1.answer')],
                },
                {
                    id: 'p2',
                    question: t('faq.items.p2.question'),
                    answers: Array.isArray(t('faq.items.p2.answer', { returnObjects: true })) ? t('faq.items.p2.answer', { returnObjects: true }) : [t('faq.items.p2.answer')],
                },
                {
                    id: 'p3',
                    question: t('faq.items.p3.question'),
                    answers: Array.isArray(t('faq.items.p3.answer', { returnObjects: true })) ? t('faq.items.p3.answer', { returnObjects: true }) : [t('faq.items.p3.answer')],
                },
            ],
        },
    ];

    const ALL_ITEMS = FAQ_DATA.flatMap(cat =>
        cat.items.map(item => ({ ...item, category: cat.category, categoryKey: cat.categoryKey }))
    );

    const toggle = (id) => setOpenId(p => p === id ? null : id);
    const openItem = ALL_ITEMS.find(i => i.id === openId);

    useEffect(() => {
        if (openId && panelRef.current) {
            setTimeout(() => {
                panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }, [openId]);

    return (
        <div className="support-page-wrapper">
            <Banner title={t('faq.banner_title')} subtitle={t('faq.banner_subtitle')} />
            <SupportNav />

            <div className="support-content-area">
                <div className="contact-us-section faq-page-card">
                    <div className="faq-page-header">
                        <h2 className="faq-page-title">{t('faq.section_title')}</h2>
                        <p className="faq-page-desc">{t('faq.section_subtitle')}</p>
                    </div>

                    <div className="fc-grid">
                        {ALL_ITEMS.map((item) => {
                            const isOpen = openId === item.id;
                            return (
                                <button
                                    key={item.id}
                                    className={`fc-card ${isOpen ? 'fc-card--open' : ''}`}
                                    onClick={() => toggle(item.id)}
                                >
                                    <span className={`fc-card-cat fc-card-cat--${item.categoryKey}`}>
                                        {item.category}
                                    </span>
                                    <p className="fc-card-q">{item.question}</p>
                                    <span className={`fc-card-icon ${isOpen ? 'fc-card-icon--open' : ''}`}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2.5"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div ref={panelRef} className={`fc-panel ${openId ? 'fc-panel--open' : ''}`}>
                        {openItem && (
                            <>
                                <p className="fc-panel-q">{openItem.question}</p>
                                <ul className="fc-panel-list">
                                    {openItem.answers.map((ans, i) => (
                                        <li key={i}>{ans}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    <div className="faq-cta">
                        <div>
                            <p className="faq-cta-title">{t('faq.cta_title')}</p>
                            <p className="faq-cta-desc">{t('faq.cta_desc')}</p>
                        </div>
                        <Link to="/support/inquiry" className="faq-cta-btn">{t('faq.cta_btn')}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
