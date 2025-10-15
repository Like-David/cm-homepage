import React, { useState } from 'react';
import '@/styles/About.css';

const historyData = [
    {
        year: '2024',
        events: [
            { month: '09', description: '"전자서명을 통한 부인방지 기술을 적용하여 종이나 인감없이도 온라인 자필서명으로 거래계약하는 시스템" 특허 출원' },
        ],
    },
    {
        year: '2023',
        events: [
            { month: '09', description: '2023년도 창업성장기술개발사업 디딤돌 협약 체결' },
        ],
    },
    {
        year: '2022',
        events: [
            { month: '', description: '웅지세무대학교 웹리포팅 Non-Active-X 전환 프로젝트 수주' },
            { month: '', description: '부산은행 영업점 잔앵증명서 발급 프로세스 개선 프로젝트 수주' },
            { month: '', description: '대구은행 증명서 개발 프로젝트 5월 중 수주 예정' },
            { month: '', description: '전북은행 주택담보 여신약정 고도화 프로젝트 5월 중 수주 예정' },
            { month: '05', description: '27일-28일 제 2회 사내 워크샵 시행' },
            { month: '', description: '더욱 더 전문적인 기술개발 능력을 보유하기 위해 발전 중!!' },
        ],
    },
    {
        year: '2021',
        events: [
            { month: '', description: '한국석유관리원 전자증명발급 서비스 사업 수주' },
            { month: '02', description: '09일 기업부설연구소 설립' },
            { month: '', description: 'OK금융그룹 P2P 서비스 구축 수주' },
            { month: '', description: '전북은행 금융소비자보호법 대응 관련 프로젝트 수주 (2022년 3월 까지 총 기간 15개월 프로젝트)' },
            { month: '', description: '전북은행 모바일 뱅킹 고도화 프로젝트 수주 (2022년 1월 까지 총 기간 12개월 프로젝트)' },
            { month: '', description: '농협 콕팜, 콕뱅크, 올원뱅크 신규 서비스 전자문서 솔루션 도입 및 개발관련 수주' },
            { month: '', description: '우리은행 기업뱅킹 캡소프트사 제품 고도화 프로젝트 수주' },
            { month: '', description: '경남은행 캡소프트사 전자문서 솔루션 앱 뷰어 고도화 프로젝트 수주' },
            { month: '', description: '세종사이버대학교 캡소프트사 Non-ActiveX 제품 교체 작업 프로젝트 수주' },
            { month: '', description: '근로복지공단 솔루션 신규도입 프로젝트 수주' },
            { month: '', description: '부산은행 여신약정(BPR) 서비스 확장 사업 수주' },
            { month: '04', description: '02일 대표이사 김준식 사임 및 권정훈 취임' },
            { month: '', description: '한국석유관리원 전자증명발급 서비스 사업 수주' },
            { month: '', description: 'OK금융그룹 P2P 서비스 구축 수주' },
            { month: '', description: '전북은행 솔루션 고도화 프로젝트 수주' },
            { month: '', description: '전북은행 PDF 뷰어 제작 수주' },
            { month: '', description: '부산은행 전자지갑 서비스 구축 프로젝트 수주' },
            { month: '', description: '농협카드 전자증명서 도입 프로젝트 수주' },
            { month: '', description: '한화생명 영업지원 시스템 내 전자증명발급 도입 프로젝트 수주' },
            { month: '', description: '농협 올원뱅크 여신약정 프로세스 고도화 프로젝트 수주' },
            { month: '09', description: '15일 벤처기업 인증 획득(혁신성장유형)' },
            { month: '', description: '전북은행 스마트뱅킹 고도화 프로젝트 수주' },
            { month: '', description: '라이나생명 신규 상품 개발 프로젝트 수주' },
            { month: '10', description: '22일-23일 제 1회 사내 워크샵 시행' },
            { month: '', description: 'OK저축은행 여신약정 차세대 프로젝트 수주' },
        ],
    },
    {
        year: '2020',
        events: [
            { month: '07', description: '20일 회사 설립 (김준식 대표이사 권정훈 이사 유지훈 이사 공동 출자)' },
            { month: '07', description: '30일 기존 캡소프트사 솔루션 유지보수 사이트 71개 양수양도 계약 완료, (농협, 우리은행, 기업은행 등 다수의 금융권과 식약처, 서울시etax 등 다수의 정부기관 및 공공기관 유지보수 계약 이전)' },
            { month: '08', description: '10일 금융결제원 금융인증서비스 활성화 및 상호협력을 위한 협약 체결' },
            { month: '', description: '농협 콕팜, 콕뱅크, 올원뱅크 신규 서비스 전자문서 솔루션 도입 및 개발관련 수주' },
            { month: '', description: '우리은행 기업뱅킹 캡소프트사 제품 고도화 프로젝트 수주' },
            { month: '', description: '경남은행 캡소프트사 전자문서 솔루션 앱 뷰어 고도화 프로젝트 수주' },
            { month: '', description: '세종사이버대학교 캡소프트사 Non-ActiveX 제품 교체 작업 프로젝트 수주' },
            { month: '', description: '근로복지공단 솔루션 신규도입 프로젝트 수주' },
            { month: '', description: '부산은행 여신약정(BPR) 서비스 확장 사업 수주' },
        ],
    },
];

const INITIAL_EVENTS_TO_SHOW = 3;

function History() {
    const [viewMode, setViewMode] = useState('card'); // 'card' or 'timeline'
    const [expandedCards, setExpandedCards] = useState({});

    const toggleCardExpansion = (year) => {
        setExpandedCards(prev => ({ ...prev, [year]: !prev[year] }));
    };

    return (
        <section id="hsitory" className="history-section">
            <div className="container">
                <h2 className="history-title">회사 연혁</h2>
                <div className="view-toggle-container">
                    <button onClick={() => setViewMode(viewMode === 'card' ? 'timeline' : 'card')} className="view-toggle-btn">
                        {viewMode === 'card' ? '타임라인 보기' : '카드형 보기'}
                    </button>
                </div>
                
                {viewMode === 'card' ? (
                    <div className="history-card-view">
                        {historyData.map((yearData) => {
                            const isExpanded = !!expandedCards[yearData.year];
                            const eventsToShow = isExpanded ? yearData.events : yearData.events.slice(0, INITIAL_EVENTS_TO_SHOW);
                            
                            return (
                                <div key={yearData.year} className="history-card">
                                    <div className="card-content-wrapper">
                                        <h3 className="card-year">{yearData.year}</h3>
                                        <ul className="card-events-list">
                                            {eventsToShow.map((event, index) => (
                                                <li key={index}>
                                                    <span className="card-event-month">{event.month && `${event.month}월`}</span>
                                                    <p className="card-event-description">{event.description.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {yearData.events.length > INITIAL_EVENTS_TO_SHOW && (
                                        <button onClick={() => toggleCardExpansion(yearData.year)} className="expand-btn">
                                            {isExpanded ? '-' : '+'}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="history-timeline-view-alt">
                        {historyData.map((yearData, index) => (
                            <div key={yearData.year} className={`timeline-year-block ${index % 2 === 0 ? 'left' : 'right'}`}>
                                <div className="timeline-year-header">{yearData.year}</div>
                                <div className="timeline-year-content">
                                    <ul className="timeline-events-list">
                                        {yearData.events.map((event, eventIndex) => (
                                            <li key={eventIndex}>
                                                <span className="timeline-event-month">{event.month && `${event.month}월`}</span>
                                                <p className="timeline-event-description">{event.description.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default History;
