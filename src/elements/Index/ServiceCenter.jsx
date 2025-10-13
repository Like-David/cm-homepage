import React from 'react';
import Image from 'react-bootstrap/Image';
import ServiceCenterImg from '@/assets/images/Index/ServiceCenter/ServiceCenter.png';

function ServiceCenter() {
    return (
        <div className="service-center-container">
            <Image src={ServiceCenterImg} className="service-center-image" />
            <div className="service-center-text-overlay">
                <p className="main-text">고객 센터를 운영하여 고객의 민원에<br /> 신속히 대응하고 있습니다.</p>
                <button className="service-center-button">고객센터 바로가기</button>
            </div>
        </div>
    );
}

export default ServiceCenter;
