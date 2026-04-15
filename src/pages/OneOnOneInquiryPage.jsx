import React from 'react';
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

    const copyToClipboard = async (text, label) => {
        try {
            await navigator.clipboard.writeText(text);
            alert(`${label}이(가) 복사되었습니다.`);
        } catch {
            alert(`복사에 실패했습니다. 직접 복사해주세요: ${text}`);
        }
    };

    return (
        <div className="support-page-wrapper">
            <Banner title={t('contact.banner_title')} subtitle={t('contact.banner_subtitle')} />
            <SupportNav />

            <div className="support-content-area">
                <div className="contact-us-section inq-wrap">

                    {/* 헤더 */}
                    <div className="inq-header">
                        <p className="inq-header-label">CONTACT US</p>
                        <h2 className="inq-header-title">1:1 문의</h2>
                        <p className="inq-header-desc">
                            아래 순서에 따라 문의해 주시면 담당자가 신속하게 도움을 드리겠습니다.
                        </p>
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
                            <h3 className="inq-card-title">대표번호로 문의</h3>
                            <div className="inq-card-phone">{PHONE}</div>
                            <p className="inq-card-desc">
                                먼저 대표번호로 전화 주시면 담당자가 문의 내용을 확인하고,
                                원격지원이 필요한 경우 접속 방법을 안내해 드립니다.
                            </p>
                            <div className="inq-card-btns">
                                <a href={`tel:${PHONE.replace(/-/g, '')}`} className="inq-btn inq-btn--solid">
                                    전화하기
                                </a>
                                <button type="button" onClick={() => copyToClipboard(PHONE, '대표번호')} className="inq-btn inq-btn--ghost">
                                    번호 복사
                                </button>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className="inq-connector">
                            <div className="inq-connector-line" />
                            <div className="inq-connector-arrow">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C2D60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <polyline points="19 12 12 19 5 12" />
                                </svg>
                            </div>
                            <div className="inq-connector-line" />
                            <span className="inq-connector-label">담당자 안내 후</span>
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
                            <h3 className="inq-card-title">원격지원 접속</h3>
                            <a href={REMOTE_LINK} target="_blank" rel="noreferrer" className="inq-card-link">
                                {REMOTE_LINK}
                            </a>
                            <p className="inq-card-desc">
                                담당자 안내 후 아래 버튼으로 원격지원 페이지에 접속해 주세요.
                                안내받은 <strong>6자리 인증번호</strong>가 있는 경우에만 접속 가능합니다.
                            </p>
                            <div className="inq-card-btns">
                                <a href={REMOTE_LINK} target="_blank" rel="noreferrer" className="inq-btn inq-btn--solid">
                                    원격지원 접속하기
                                </a>
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
                            기술 지원 직통 연락처
                        </div>
                        <div className="inq-tech-body">
                            <div className="inq-tech-row">
                                <span className="inq-tech-key">기술지원 전화</span>
                                <div className="inq-tech-val-wrap">
                                    <a href={`tel:${TECH_PHONE.replace(/-/g, '')}`} className="inq-tech-val">{TECH_PHONE}</a>
                                    <button type="button" onClick={() => copyToClipboard(TECH_PHONE, '기술지원 전화번호')} className="inq-copy-chip">복사</button>
                                </div>
                            </div>
                            <div className="inq-tech-sep" />
                            <div className="inq-tech-row">
                                <span className="inq-tech-key">기술지원 이메일</span>
                                <div className="inq-tech-val-wrap">
                                    <a href={`mailto:${TECH_EMAIL}`} className="inq-tech-val">{TECH_EMAIL}</a>
                                    <button type="button" onClick={() => copyToClipboard(TECH_EMAIL, '기술지원 이메일')} className="inq-copy-chip">복사</button>
                                </div>
                            </div>
                        </div>
                        <p className="inq-tech-hours">
                            운영시간&nbsp;&nbsp;평일 09:00 – 18:00&nbsp;&nbsp;·&nbsp;&nbsp;점심 12:00 – 13:00&nbsp;&nbsp;·&nbsp;&nbsp;주말·공휴일 제외
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OneOnOneInquiryPage;
