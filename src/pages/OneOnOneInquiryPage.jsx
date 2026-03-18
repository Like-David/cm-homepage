import React from 'react';
import SupportNav from "../components/support/SupportNav";
import Banner from "@/components/common/Banner";
import '../styles/SupportBoardPage.css';

const OneOnOneInquiryPage = () => {
    const PHONE = '02-6949-4170';
    const LINK = 'https://988.co.kr';

    const copyPhone = async () => {
        try {
            await navigator.clipboard.writeText(PHONE);
            alert('대표번호가 복사되었습니다.');
        } catch {
            alert('복사에 실패했습니다. 직접 복사해주세요: ' + PHONE);
        }
    };

    return (
        <div className="support-page-wrapper">
            <Banner title="고객센터" subtitle="궁금한 점이 있으시면 언제든지 문의해 주세요." />
            <SupportNav />

            <div className="support-content-area">
                <div className="contact-us-section">
                    <div className="section-header">
                        <h2>1:1 문의</h2>
                        <p>문의 유형에 따라 아래 방법 중 하나를 선택해 주세요.</p>
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
                            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>문의채널 1</div>
                            <h3 style={{ margin: '0 0 10px', fontSize: 18, color: '#333' }}>대표번호로 문의</h3>
                            <div style={{ fontSize: 22, fontWeight: 800, color: '#1C2D60', marginBottom: 14 }}>
                                {PHONE}
                            </div>

                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                <a
                                    href={`tel:${PHONE.replace(/-/g, '')}`}
                                    className="write-btn"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    전화하기
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
                                    번호 복사
                                </button>
                            </div>

                            <p style={{ margin: '12px 0 0', fontSize: 13, color: '#666' }}>
                                전화 상담을 통해 담당자와 문의하신 후,
                                원격지원이 필요한 경우 접속 방법을 안내해 드립니다.
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
                            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>문의채널 2</div>
                            <h3 style={{ margin: '0 0 10px', fontSize: 18, color: '#333' }}>원격지원 접속</h3>

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
                                원격지원 페이지로 이동
                            </a>

                            <p style={{ margin: '12px 0 0', fontSize: 13, color: '#666' }}>
                                본 페이지는 <strong>원격지원 전용</strong>입니다.<br />
                                담당자에게 안내받은 <strong>6자리 인증번호</strong>가 있는 경우에만 접속해 주세요.
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
