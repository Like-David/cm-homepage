import React from 'react';
import '@/styles/About.css';

function Introduce() {
    return (
        <section id="introduce" className="introduce-content-section">
            <div className="container">
                <h2 className="about-title">회사소개</h2>
                <p className="main-text-introduce">
                    "저희가 추구하는 목표는 <br/>전자문서 분야에서의<br/>업무 효율성 증대와 비용 절감입니다."
                </p>
                <div className="sub-text-introduce">
                    <p>
                        씨엠이노베이션은 2013년 설립 이후, 페이퍼리스 솔루션 및 리포팅 툴 솔루션 개발과 공급에 주력해왔습니다.
                    </p>
                    <p>
                        다양한 금융권 프로젝트 경험을 통해 축적된 기술력과 노하우를 바탕으로, 고객의 비즈니스 환경에 최적화된 솔루션을 제공하며 높은 평가를 받고 있습니다.
                    </p>
                    <p>
                        또한, 전자문서 분야에서의 혁신과 지속적인 연구개발을 통해 기술을 선도하는 기업으로 나아가고 있습니다.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Introduce;