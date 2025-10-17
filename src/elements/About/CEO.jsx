import React from 'react';
import Image from 'react-bootstrap/Image';
import image from '@/assets/images/About/CEO/CEO.png';
import '@/styles/About.css';

function CEO() {
    return (
        <section id="CEO" className="ceo-section">
            <div className="container">
                <h2 className="about-title">CEO 인사말</h2>
                <div className="ceo-grid">
                    <div className="ceo-image-placeholder">
                        <img src={image} />
                    </div>
                    <div className="ceo-message">
                        <p>안녕하십니까?<br/>
                        홈페이지를 방문해 주신 여러분께 감사의 말씀을 드리며, 항상 건강과 행복이 함께 하시기를 기원합니다.</p>
                        
                        <p><strong>주식회사 씨엠이노베이션은</strong></p>
                        
                        <p>금융/기업의 업무 효율성과 고객의 편의성을 최우선 가치로 4차 산업혁명 시대를 맞이하여,<br/>
                        현재 IT 기술에 핵심 과제인 신뢰 구축, 변화 형성, 성장 가속을 주제로 성장 발전을 주도하고자 설립한 IT 스타트업 회사입니다.</p>
                        
                        <p>금융 및 기업의 업무 아키텍처 및 보안 기술을 기반으로하여 빠르게 변화하는 IT 패러다임에 능동적으로 대응하고<br/>
                        디지털 경제의 확산으로 촉발된 디지털 트랜스포메이션의 시대에 지속적인 IT 기술 혁신을 도약하며,<br/>
                        디지털 트랜드 및 IT 기술 트랜드의 최고의 맞춤형 솔루션을 제공하는 IT 트랜드를 선도하는 기업이 될 수 있도록 더욱 노력하겠습니다!</p>
                        
                        <p>고객의 비즈니스에 최선을 다하는 마음과 혁신적인 기술의 노하우로 행복하고 신뢰할 수 있는 파트너사가 됨으로써 고객께 보답하겠습니다.<br/>
                        감사합니다.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CEO;