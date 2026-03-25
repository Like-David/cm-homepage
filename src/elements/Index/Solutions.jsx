import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import RXeFormImg from '@/assets/images/Index/Solutions/RX-eForm.png';
import RXCertImg from '@/assets/images/Index/Solutions/RX-Cert.png';
import RXLoanImg from '@/assets/images/Index/Solutions/Rx-Loan.png';

function Solutions() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(null);

    const solutionsData = [
        {
            id: 'report-express',
            image: RXeFormImg,
            name: t('solutions.web_reporting_name'),
            use: t('solutions.web_reporting_use'),
            model: 'ReportExpress Enterprise',
        },
        {
            id: 'rx-cert',
            image: RXCertImg,
            name: t('solutions.cert_name'),
            use: t('solutions.cert_use'),
            model: 'RX-Cert',
        },
        {
            id: 'rx-loan',
            image: RXLoanImg,
            name: t('solutions.loan_name'),
            use: t('solutions.loan_use'),
            model: 'RX-Loan',
        },
    ];

    const handleClick = (index) => {
        // On mobile, toggle the active state
        if (window.innerWidth <= 768) {
            setActiveIndex(activeIndex === index ? null : index);
        }
    };

    return (
        <div className="solutions-container">
            <InView triggerOnce={true}>
                {({ inView, ref }) => (
                    <div ref={ref} className={`animate-container ${inView ? 'animate-in' : ''}`}>
                        <div className="business-title-overlay">
                            {t('solutions.title')}
                        </div>
                        <p className="business-main-subtext">
                            {t('solutions.description')}
                        </p>
                    </div>
                )}
            </InView>
            <ul className="product">
                {solutionsData.map((solution, index) => (
                    <li key={index} onClick={() => handleClick(index)}>
                        <InView triggerOnce={true} delay={index * 200}>
                            {({ inView, ref }) => (
                                <div ref={ref} className={`product-box ${inView ? 'animate-in' : ''}`}>
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
                                            <a href={`/solution#${solution.id}`}>
                                                <img src={solution.image} alt={solution.name} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </InView>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Solutions;