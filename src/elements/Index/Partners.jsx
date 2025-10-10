import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { InView } from 'react-intersection-observer';
import RXCertImg from '@/assets/images/Index/RX-Cert.png';
import RXeFormImg from '@/assets/images/Index/RX-eForm.png';
import RXLoanImg from '@/assets/images/Index/Rx-Loan.png';
import '@/styles/Index.css';
import SolutionCard from '@/components/Index/SolutionCard'; // Import the new component

const solutionsData = [
    {
        image: RXCertImg,
        name: '전자문서(웹리포팅) 솔루션',
        use: '전자문서(웹리포팅) 시스템 구축',
        model: 'ReportExpress Enterprise',
    },
    {
        image: RXeFormImg,
        name: '증명서 위·변조방지 솔루션',
        use: '증명서 위·변조방지 시스템 구축',
        model: 'RX-Cert',
    },
    {
        image: RXLoanImg,
        name: '여신약정 솔루션',
        use: '여신약정 내 전자계약 시스템 구축',
        model: 'RX-Loan',
    },
];

function Partners() {
    return (
        <div className="my-5 solutions-container">
            <InView triggerOnce={true}>
                {({ inView, ref }) => (
                    <div ref={ref} className={`animate-container ${inView ? 'animate-in' : ''}`}>
                        <div className="business-title-overlay">
                            <i className="fa-solid fa-briefcase"></i>&nbsp;Partners
                        </div>
                        <p className="business-main-subtext">
                            씨엠이노베이션은 주요 분야별 최적화된 전자문서 솔루션을 제공합니다.
                        </p>
                    </div>
                )}
            </InView>
            <Row className="justify-content-center g-4 mt-4">
                {solutionsData.map((solution, index) => (
                    <Col key={index} md={6} lg={4}>
                        <InView triggerOnce={true} delay={index * 200}>
                            {({ inView, ref }) => (
                                <SolutionCard solution={solution} inView={inView} fref={ref} />
                            )}
                        </InView>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Partners;
