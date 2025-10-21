import React, { useState } from 'react';
import SupportNav from "../components/support/SupportNav";
import Banner from "@/components/common/Banner";
import '../styles/SupportBoardPage.css'; // Reusing styles for now

const FaqPage = () => {
    const faqData = [
        {
            question: '제품 도입을 위한 절차는 어떻게 되나요?',
            answer: '홈페이지의 문의하기를 통해 연락 주시거나, 대표번호로 연락 주시면 전문 컨설턴트가 도입 절차에 대해 상세히 안내해 드립니다.'
        },
        {
            question: '제품 데모를 신청하고 싶습니다.',
            answer: '데모 신청은 온라인 문의 또는 유선으로 가능하며, 담당자가 확인 후 방문 또는 원격으로 데모를 시연해 드립니다.'
        },
        {
            question: '기술 지원은 어떻게 받을 수 있나요?',
            answer: '유지보수 계약을 체결한 고객을 대상으로 기술 지원 포털과 핫라인을 운영하고 있습니다. 자세한 내용은 계약 시 안내해 드립니다.'
        },
        {
            question: '라이선스 관련 문의입니다.',
            answer: '라이선스 정책은 제품별로 상이하므로, 자세한 내용은 영업팀으로 문의해 주시기 바랍니다.'
        },
        {
            question: '설치 시 오류가 발생합니다.',
            answer: '설치 가이드를 참고하시거나, 기술 지원팀으로 문의해 주시면 신속하게 해결해 드리겠습니다.'
        }
    ];

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        if (openFaq === index) {
            setOpenFaq(null);
        } else {
            setOpenFaq(index);
        }
    };

    return (
        <div className="support-page-wrapper">
            <Banner title="고객센터" subtitle="궁금한 점이 있으시면 언제든지 문의해 주세요." />
            <SupportNav />
            <div className="support-content-area">
                <div className="faq-section">
                    <div className="section-header">
                        <h2>자주 묻는 질문</h2>
                        <p>고객님들이 자주 묻는 질문들을 모아두었습니다.</p>
                    </div>
                    <div className="faq-container">
                        {faqData.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <div className="faq-question" onClick={() => toggleFaq(index)}>
                                    <span>{faq.question}</span>
                                    <span className={`faq-toggle ${openFaq === index ? 'open' : ''}`}></span>
                                </div>
                                {openFaq === index && (
                                    <div className="faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
