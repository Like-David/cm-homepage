import React from 'react';
import Image from 'react-bootstrap/Image';
import BusinessImg from '@/assets/images/Index/Business.jpg';
import '@/styles/Index.css';
import CounterDisplay from '@/components/Index/CounterDisplay'
import { InView } from 'react-intersection-observer';


function Info() {

    return (
        <InView triggerOnce={'true'}>
            {({ inView, ref }) => (
                <div ref={ref} className={`animate-container ${inView ? 'animate-in' : ''}`}>
                    <div className="business-title-overlay">
                        <i className="fa-solid fa-building"></i>&nbsp;CM Innovation
                    </div>
                    <p className="business-main-subtext">
                        전자문서 및 문서보안 증명발급을 위한 솔루션에 대한 기술 및 다양한 분야에 솔루션을 적용한 경험을 토대로 고객사의 경쟁력 강화에 최선을 다하고 있습니다.
                    </p>
                    <div className="business-container">
                        <Image src={BusinessImg} className="business-image" />
                        <div className="overlay-content-wrapper">
                            <CounterDisplay iconClass="fa-solid fa-calendar-days" text="회사 창립" endCount={5} showPlusSign={false} inView={inView} />
                            <CounterDisplay iconClass="fa-solid fa-won-sign" text="매출액" endCount={1114000000} unit="백만" inView={inView} />
                            <CounterDisplay iconClass="fa-solid fa-handshake" text="납품 업체" endCount={50} inView={inView} />
                        </div>
                    </div>
                </div>
            )}
        </InView>
    );
}

export default Info;