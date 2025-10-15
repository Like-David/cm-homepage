import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SupportBoardPage.css';
import Banner from '@/components/common/Banner';

const SupportBoardPage = () => {
    const sectionRefs = useRef({});
    const [activeSection, setActiveSection] = useState('');

    const sections = [
        { id: 'contact-us', title: 'CONTACT US' },
        { id: 'faq', title: '자주 묻는 질문' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            sections.forEach(section => {
                const ref = sectionRefs.current[section.id];
                if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
                    setActiveSection(section.id);
                } else if (!ref && section.id === 'contact-us' && window.scrollY < sectionRefs.current['faq'].offsetTop) {
                    // Special handling for the first section if it's not yet in view
                    setActiveSection('contact-us');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (id) => {
        const element = sectionRefs.current[id];
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Adjust for header height
                behavior: 'smooth',
            });
        }
    };

    // Sample data for the board
    const inquiries = [
        { id: 1, title: '제품 문의 드립니다.', author: '홍길동', date: '2024-10-24', views: 15 },
        { id: 2, title: '기술 지원 요청합니다.', author: '김철수', date: '2024-10-23', views: 42 },
        { id: 3, title: '견적 문의 드립니다.', author: '이영희', date: '2024-10-22', views: 31 },
        { id: 4, title: '설치 관련 문의', author: '박영수', date: '2024-10-21', views: 25 },
    ];

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
            <nav className="scroll-nav">
                <ul>
                    {sections.map(section => (
                        <li key={section.id} className={activeSection === section.id ? 'active' : ''} onClick={() => scrollToSection(section.id)}>
                            <span>{section.title}</span>
                        </li>
                    ))}
                </ul>
            </nav>

            <Banner title="Customer Support" subtitle="궁금한 점이 있으시면 언제든지 문의해 주세요." />

            <div className="support-content-area">
                <div ref={el => sectionRefs.current['contact-us'] = el} className="contact-us-section">
                    <div className="section-header">
                        <h2>CONTACT US</h2>
                        <p>궁금한 점이 있으시면 언제든지 문의해 주세요.</p>
                    </div>
                    <div className="board-container">
                        <div className="board-controls">
                            <div className="search-bar">
                                <input type="text" placeholder="검색어를 입력하세요" />
                                <button>검색</button>
                            </div>
                            <Link to="/support/write" className="write-btn">글쓰기</Link>
                        </div>
                        <table className="board-table">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>작성일</th>
                                    <th>조회수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map(inquiry => (
                                    <tr key={inquiry.id}>
                                        <td>{inquiry.id}</td>
                                        <td className="board-title"><Link to={`/support/${inquiry.id}`}>{inquiry.title}</Link></td>
                                        <td>{inquiry.author}</td>
                                        <td>{inquiry.date}</td>
                                        <td>{inquiry.views}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <button>&lt;</button>
                            <span>1</span>
                            <button>&gt;</button>
                        </div>
                    </div>
                </div>

                <div ref={el => sectionRefs.current['faq'] = el} className="faq-section">
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

export default SupportBoardPage;
