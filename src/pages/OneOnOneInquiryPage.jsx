import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SupportNav from "../components/support/SupportNav";
import Banner from "@/components/common/Banner";
import '../styles/SupportBoardPage.css';
import '../styles/OneOnOneInquiryPage.css';

const PHONE = '02-6949-4170';
const TECH_PHONE = '0505-998-0888';
const TECH_EMAIL = 'support@cminnovation.co.kr';
const REMOTE_LINK = 'https://988.co.kr';

const OneOnOneInquiryPage = () => {
    const { t } = useTranslation();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleRemoteClick = () => setConfirmOpen(true);

    const handleConfirm = () => {
        setConfirmOpen(false);
        window.open(REMOTE_LINK, '_blank', 'noreferrer');
    };

    return (
        <div className="support-page-wrapper">
            <Banner title={t('contact.banner_title')} subtitle={t('contact.banner_subtitle')} />
            <SupportNav />

            <div className="support-content-area">
                <div className="contact-us-section inq-wrap">

                    {/* 헤더 */}
                    <div className="inq-header">
                        <p className="inq-header-label">{t('menu.contact_us')}</p>
                        <h2 className="inq-header-title">{t('contact.section_title')}</h2>
                        <p className="inq-header-desc">{t('contact.section_subtitle')}</p>
                    </div>

                    {/* 스텝 카드 */}
                    <div className="inq-steps">

                        {/* Step 1 */}
                        <div className="inq-card inq-card--primary">
                            <div className="inq-card-num">01</div>
                            <div className="inq-card-icon-wrap">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <h3 className="inq-card-title">{t('contact.step1_title')}</h3>
                            <div className="inq-card-phone">{PHONE}</div>
                            <p className="inq-card-desc">{t('contact.step1_desc')}</p>
                        </div>

                        {/* Connector — 가로 방향 */}
                        <div className="inq-connector">
                            <div className="inq-connector-row">
                                <div className="inq-connector-line" />
                                <div className="inq-connector-arrow">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C2D60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </div>
                                <div className="inq-connector-line" />
                            </div>
                            <span className="inq-connector-label">{t('contact.connector_label')}</span>
                        </div>

                        {/* Step 2 */}
                        <div className="inq-card inq-card--secondary">
                            <div className="inq-card-num">02</div>
                            <div className="inq-card-icon-wrap">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                            </div>
                            <h3 className="inq-card-title">{t('contact.step2_title')}</h3>
                            <span className="inq-card-link">{REMOTE_LINK}</span>
                            <p className="inq-card-desc">
                                {t('contact.step2_desc', { code: t('contact.step2_code_label') })}
                            </p>
                            <div className="inq-card-btns">
                                <button
                                    type="button"
                                    className="inq-btn inq-btn--solid"
                                    onClick={handleRemoteClick}
                                >
                                    {t('contact.step2_btn')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 기술 지원 연락처 */}
                    <div className="inq-tech">
                        <div className="inq-tech-header">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {t('contact.tech_support_title')}
                        </div>
                        <div className="inq-tech-body">
                            <div className="inq-tech-row">
                                <span className="inq-tech-key">{t('contact.tech_phone_label')}</span>
                                <div className="inq-tech-val-wrap">
                                    <a href={`tel:${TECH_PHONE.replace(/-/g, '')}`} className="inq-tech-val">{TECH_PHONE}</a>
                                </div>
                            </div>
                            <div className="inq-tech-sep" />
                            <div className="inq-tech-row">
                                <span className="inq-tech-key">{t('contact.tech_email_label')}</span>
                                <div className="inq-tech-val-wrap">
                                    <a href={`mailto:${TECH_EMAIL}`} className="inq-tech-val">{TECH_EMAIL}</a>
                                </div>
                            </div>
                        </div>
                        <p className="inq-tech-hours">
                            {t('contact.hours_label')}&nbsp;&nbsp;{t('contact.hours_weekdays')}&nbsp;&nbsp;·&nbsp;&nbsp;{t('contact.hours_lunch')}&nbsp;&nbsp;·&nbsp;&nbsp;{t('contact.hours_exclude')}
                        </p>
                    </div>

                </div>
            </div>

            {/* 원격지원 이동 확인 팝업 */}
            {confirmOpen && (
                <div className="password-modal-overlay" role="dialog" aria-modal="true">
                    <div className="inq-confirm-modal">
                        <div className="inq-confirm-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1C2D60" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                        </div>
                        <h3 className="inq-confirm-title">원격지원 페이지로 이동합니다</h3>
                        <p className="inq-confirm-desc">
                            외부 사이트({REMOTE_LINK})로 연결됩니다.<br />
                            담당자에게 안내받은 6자리 인증번호가 있는 경우에만 접속해주세요.
                        </p>
                        <div className="inq-confirm-actions">
                            <button type="button" className="inq-confirm-cancel" onClick={() => setConfirmOpen(false)}>
                                취소
                            </button>
                            <button type="button" className="inq-confirm-ok" onClick={handleConfirm}>
                                이동하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OneOnOneInquiryPage;
