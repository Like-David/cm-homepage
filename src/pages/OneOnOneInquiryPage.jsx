import React from 'react';
import { useTranslation } from 'react-i18next';
import SupportNav from "../components/support/SupportNav";
import Banner from "@/components/common/Banner";
import '../styles/SupportBoardPage.css';

const OneOnOneInquiryPage = () => {
    const { t } = useTranslation();
    const PHONE = '02-6949-4170';
    const LINK = 'https://988.co.kr';

    const copyPhone = async () => {
        try {
            await navigator.clipboard.writeText(PHONE);
            alert(t('contact.phone_copy_success'));
        } catch {
            alert(t('contact.phone_copy_fail') + PHONE);
        }
    };

    return (
        <div className="support-page-wrapper">
            <Banner title={t('contact.banner_title')} subtitle={t('contact.banner_subtitle')} />
            <SupportNav />

            <div className="support-content-area">
                <div className="contact-us-section">
                    <div className="section-header">
                        <h2>{t('contact.section_title')}</h2>
                        <p>{t('contact.section_subtitle')}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {/* 대표번호 문의 */}
                        <div
                            style={{
                                border: '1px solid #eee',
                                borderRadius: 8,
                                padding: 20,
                                background: '#fff',
                            }}
                        >
                            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>{t('contact.channel')} 1</div>
                            <h3 style={{ margin: '0 0 10px', fontSize: 18, color: '#333' }}>{t('contact.phone_inquiry_title')}</h3>
                            <div style={{ fontSize: 22, fontWeight: 800, color: '#1C2D60', marginBottom: 14 }}>
                                {PHONE}
                            </div>

                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                <a
                                    href={`tel:${PHONE.replace(/-/g, '')}`}
                                    className="write-btn"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    {t('contact.call_btn')}
                                </a>
                                <button
                                    type="button"
                                    onClick={copyPhone}
                                    className="write-btn"
                                    style={{
                                        backgroundColor: '#f4f6f8',
                                        color: '#333',
                                        border: '1px solid #ddd',
                                    }}
                                >
                                    {t('contact.copy_btn')}
                                </button>
                            </div>

                            <p style={{ margin: '12px 0 0', fontSize: 13, color: '#666' }}>
                                {t('contact.phone_inquiry_desc')}
                            </p>
                        </div>

                        {/* 원격지원 접속 */}
                        <div
                            style={{
                                border: '1px solid #eee',
                                borderRadius: 8,
                                padding: 20,
                                background: '#fff',
                            }}
                        >
                            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>{t('contact.channel')} 2</div>
                            <h3 style={{ margin: '0 0 10px', fontSize: 18, color: '#333' }}>{t('contact.remote_inquiry_title')}</h3>

                            <div style={{ marginBottom: 14 }}>
                                <a
                                    href={LINK}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: '#1C2D60', fontWeight: 700, textDecoration: 'none' }}
                                >
                                    {LINK}
                                </a>
                            </div>

                            <a
                                href={LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="write-btn"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                {t('contact.remote_btn')}
                            </a>

                            <p style={{ margin: '12px 0 0', fontSize: 13, color: '#666' }}>
                                {t('contact.remote_inquiry_desc_1')}<strong>{t('contact.remote_inquiry_desc_2')}</strong>{t('contact.remote_inquiry_desc_3')}<br />
                                {t('contact.remote_inquiry_desc_4')}<strong>{t('contact.remote_inquiry_desc_5')}</strong>{t('contact.remote_inquiry_desc_6')}
                            </p>
                        </div>
                    </div>

                    <style>{`
            @media (max-width: 768px) {
              .support-content-area .contact-us-section > div {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
                </div>
            </div>
        </div>
    );
};

export default OneOnOneInquiryPage;
