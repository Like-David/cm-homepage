import React from 'react';
import { InView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import RXCertImg from '@/assets/images/Index/Solutions/RX-Cert.png';
import RXeFormImg from '@/assets/images/Index/Solutions/RX-eForm.png';
import RXLoanImg from '@/assets/images/Index/Solutions/Rx-Loan.png';
import '@/styles/Index.css';

const solutionsData = [
    {
        id: 'report-express',
        image: RXCertImg,
        name: '전자문서(웹리포팅) 솔루션',
        use: '전자문서(웹리포팅) 시스템 구축',
        model: 'ReportExpress Enterprise',
    },
    {
        id: 'rx-cert',
        image: RXeFormImg,
        name: '증명서 위·변조방지 솔루션',
        use: '증명서 위·변조방지 시스템 구축',
        model: 'RX-Cert',
    },
    {
        id: 'rx-loan',
        image: RXLoanImg,
        name: '여신약정 솔루션',
        use: '여신약정 내 전자계약 시스템 구축',
        model: 'RX-Loan',
    },
];

function Solutions() {
    return (
        <div className="my-5 solutions-container">
            <InView triggerOnce={true}>
                {({ inView, ref }) => (
                    <div ref={ref} className={`animate-container ${inView ? 'animate-in' : ''}`}>
                        <div className="business-title-overlay">
                            <i className="fa-solid fa-diagram-project"></i>&nbsp;Solutions
                        </div>
                        <p className="business-main-subtext">
                            문서 생성과 문서의 위조 및 변조방지 기능 및 문서 보관 기능을 제공합니다.
                        </p>
                    </div>
                )}
            </InView>
            <ul className="product">
                {solutionsData.map((solution, index) => (
                    <li key={index}>
                        <InView triggerOnce={true} delay={index * 200}>
                            {({ inView, ref }) => (
                                <Link ref={ref} className={`product-box ${inView ? 'animate-in' : ''}`} to={`/solution#${solution.id}`}>
                                    <div className="product-head">
                                        <em className="num">{String(index + 1).padStart(2, '0')}</em>
                                    </div>
                                    <div className="product-body">
                                        <p className="title">{solution.name}</p>
                                        <p className="text">
                                            {solution.use}
                                            <br />
                                            <span className="model-name">{solution.model}</span>
                                        </p>
                                        <div className="thumbnail">
                                            <img src={solution.image} alt={solution.name} />
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </InView>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Solutions;