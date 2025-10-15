import React from 'react';
import '@/styles/About.css';

function Value() {
    return (
        <section id="value" className="value-section">
            <div className="container">
                <h2 className="about-title">가치체계</h2>
                <div className="value-grid">
                    <div className="value-item">
                        <div className="value-icon-placeholder efficiency-icon"></div>
                        <h3>업무 효율성 증대</h3>
                        <p>혁신적인 페이퍼리스 솔루션으로 불필요한 수기 업무를 제거하고, 모든 프로세스를 자동화하여 직원들이 핵심 업무에 집중할 수 있는 환경을 제공합니다.</p>
                    </div>
                    <div className="value-item">
                        <div className="value-icon-placeholder cost-icon"></div>
                        <h3>비용 절감</h3>
                        <p>종이, 인쇄, 보관, 유통 등 전통적인 문서 관리 방식에서 발생하는 모든 부대 비용을 획기적으로 절감하여 기업의 이익 증대에 직접적으로 기여합니다.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Value;