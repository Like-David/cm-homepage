import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SupportNav from "../components/support/SupportNav";
import Banner from "@/components/common/Banner";
import '../styles/SupportBoardPage.css';
import '../styles/FaqPage.css';

const FAQ_DATA = [
    {
        category: '제품 · 도입',
        categoryKey: 'product',
        items: [
            {
                id: 'pr1',
                question: '제품 도입을 위한 절차는 어떻게 되나요?',
                answers: [
                    '홈페이지의 문의하기를 통해 연락 주시거나, 대표번호로 연락 주시면 전문 컨설턴트가 도입 절차에 대해 상세히 안내해 드립니다.',
                ],
            },
            {
                id: 'pr2',
                question: '제품 데모를 신청하고 싶습니다.',
                answers: [
                    '데모 신청은 온라인 문의 또는 유선으로 가능하며, 담당자가 확인 후 방문 또는 원격으로 데모를 시연해 드립니다.',
                ],
            },
            {
                id: 'pr3',
                question: '라이선스 관련 문의입니다.',
                answers: [
                    '라이선스 정책은 제품별로 상이하므로, 자세한 내용은 영업팀으로 문의해 주시기 바랍니다.',
                ],
            },
        ],
    },
    {
        category: '기술 지원',
        categoryKey: 'support',
        items: [
            {
                id: 's1',
                question: '기술 지원은 어떻게 받을 수 있나요?',
                answers: [
                    '유지보수 계약을 체결한 고객을 대상으로 기술 지원 포털과 핫라인을 운영하고 있습니다. 자세한 내용은 계약 시 안내해 드립니다.',
                ],
            },
        ],
    },
    {
        category: '설치 · 실행',
        categoryKey: 'install',
        items: [
            {
                id: 'i1',
                question: '설치 시 오류가 발생합니다.',
                answers: [
                    '설치 가이드를 참고하시거나, 기술 지원팀으로 문의해 주시면 신속하게 해결해 드리겠습니다.',
                ],
            },
            {
                id: 'i2',
                question: '프로그램 설치 후에도 반복해서 설치 안내가 뜰 때',
                answers: [
                    '기존 프로그램을 삭제하고 다시 설치해 주세요.',
                    '재설치 후에도 동일하다면, PC의 보안 프로그램(백신 등)에 의해 차단되었는지 확인이 필요합니다.',
                ],
            },
            {
                id: 'i3',
                question: "'응답 없음' 오류로 프로그램 실행이 안 될 때",
                answers: [
                    "프로그램을 재설치해도 실행되지 않는다면, 보안 프로그램의 실시간 감시 기능을 잠시 끄거나 차단 목록을 확인해 주세요.",
                ],
            },
        ],
    },
    {
        category: '출력 · 인쇄',
        categoryKey: 'print',
        items: [
            {
                id: 'p1',
                question: "미리보기 화면에서 '처리 중' 상태가 지속될 때",
                answers: [
                    '미리보기 창을 닫고 다시 실행해 주세요.',
                    '문제가 지속되면 프로그램을 제거 후 재설치하시기 바랍니다.',
                ],
            },
            {
                id: 'p2',
                question: '출력 버튼을 눌렀으나 프린터 반응이 없을 때',
                answers: [
                    '프린터 전원을 껐다 켜서 연결 상태를 확인해 주세요.',
                    "해결되지 않을 경우, 제어판에서 '프린터 추가'를 통해 동일한 드라이버를 새로 등록한 후 해당 프린터로 출력을 시도하세요.",
                ],
            },
            {
                id: 'p3',
                question: '인쇄 대기열에 문서가 걸려 출력이 안 될 때',
                answers: [
                    "[PC 설정 → 장치 → 프린터 및 스캐너]로 이동합니다.",
                    "사용 중인 프린터의 '대기열 열기'를 클릭하여 대기 중인 문서를 모두 삭제한 후 다시 출력해 주세요.",
                ],
            },
        ],
    },
];

const ALL_ITEMS = FAQ_DATA.flatMap(cat =>
    cat.items.map(item => ({ ...item, category: cat.category, categoryKey: cat.categoryKey }))
);

const FaqPage = () => {
    const { t } = useTranslation();
    const [openId, setOpenId] = useState(null);
    const toggle = (id) => setOpenId(p => p === id ? null : id);
    const openItem = ALL_ITEMS.find(i => i.id === openId);

    return (
        <div className="support-page-wrapper">
            <Banner title={t('faq.banner_title')} subtitle={t('faq.banner_subtitle')} />
            <SupportNav />

            <div className="support-content-area">
                <div className="contact-us-section faq-page-card">
                    <div className="faq-page-header">
                        <h2 className="faq-page-title">자주 묻는 질문</h2>
                        <p className="faq-page-desc">자주 접수되는 문의를 유형별로 정리했습니다.</p>
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

                    <div className={`fc-panel ${openId ? 'fc-panel--open' : ''}`}>
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
                            <p className="faq-cta-title">원하시는 답변을 찾지 못하셨나요?</p>
                            <p className="faq-cta-desc">1:1 문의를 통해 담당자가 직접 답변해 드립니다.</p>
                        </div>
                        <Link to="/support/inquiry" className="faq-cta-btn">1:1 문의하기</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
