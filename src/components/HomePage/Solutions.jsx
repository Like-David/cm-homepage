import React from 'react';
import Image from 'react-bootstrap/Image';
import BusinessImg from '@/assets/images/HomePage/Business.jpg';
import '@/styles/Index.css';
import CounterDisplay from './CounterDisplay';
import { InView } from 'react-intersection-observer';


function Solutions() {

    return (
        <InView triggerOnce={'true'}>
            {({ inView, ref }) => (
                <div ref={ref} className={`animate-container ${inView ? 'animate-in' : ''}`}>
                    <div className="business-title-overlay">
                        <i className="fa-solid fa-chart-line"></i>&nbsp; CM Innovation
                    </div>
                    <p className="business-main-subtext">
                        CM Innovation은 고객과 함께 성장하는 파트너입니다.
                    </p>
                    <div className="business-container">
                        <Image src={BusinessImg} className="business-image" />
                        <div className="overlay-content-wrapper">
                            <CounterDisplay iconClass="fa-solid fa-calendar-days" text="회사 창립 주년" endCount={5} showPlusSign={false} inView={inView} />
                            <CounterDisplay iconClass="fa-solid fa-handshake" text="납품 업체" endCount={50} inView={inView} /> {/* New CounterDisplay */}
                            <CounterDisplay iconClass="fa-solid fa-money-bill-wave" text="회사 매출액" endCount={1110000000} unit="천만원" inView={inView} />
                        </div>
                    </div>
                </div>
            )}
        </InView>
    );
}

export default Solutions;