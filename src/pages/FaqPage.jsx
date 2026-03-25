import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SupportNav from "../components/support/SupportNav";
import Banner from "@/components/common/Banner";
import '../styles/SupportBoardPage.css'; // Reusing styles for now

const FaqPage = () => {
    const { t } = useTranslation();
    const faqData = [
        {
            question: t('faq.q1.question'),
            answer: t('faq.q1.answer')
        },
        {
            question: t('faq.q2.question'),
            answer: t('faq.q2.answer')
        },
        {
            question: t('faq.q3.question'),
            answer: t('faq.q3.answer')
        },
        {
            question: t('faq.q4.question'),
            answer: t('faq.q4.answer')
        },
        {
            question: t('faq.q5.question'),
            answer: t('faq.q5.answer')
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
            <Banner title={t('faq.banner_title')} subtitle={t('faq.banner_subtitle')} />
            <SupportNav />
            <div className="support-content-area">
                <div className="faq-section">
                    <div className="section-header">
                        <h2>{t('faq.section_title')}</h2>
                        <p>{t('faq.section_subtitle')}</p>
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
