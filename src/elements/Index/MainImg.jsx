// npm import
import React from 'react';
import Image from 'react-bootstrap/Image';
import mainImg from '@/assets/images/Index/main.png';

function MainImg() {
    return (
        <div className="homepage-container">
            <Image src={mainImg} fluid className="homepage-main-image" />
            <div className="homepage-text-overlay">
                <p className="sub-text">전자문서 ALL-IN-ONE 솔루션</p>
                <p className="main-text">문서 생성부터 문서 보관과<br/>문서의 위조 및 변조방지 기능으로<br/>디지털기반 비대면 산업에 압장섭니다.</p>
            </div>
        </div>
    );
}

export default MainImg;