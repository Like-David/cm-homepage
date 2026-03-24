// npm import
import React from 'react';
import Image from 'react-bootstrap/Image';
import image from '@/assets/images/Index/IndexImg/index.png';

function IndexImg() {
    return (
        <div className="homepage-container">
            <Image src={image} fluid className="homepage-main-image" style={{ filter: 'brightness(70%)' }} />
            <div className="homepage-text-overlay">
                <p className="homepage-main-text">디지털이라는 본질 위에,</p>
                <p className="homepage-main-text">비대면 산업의 내일을 쌓아갑니다.</p>
            </div>
        </div>
    );
}

export default IndexImg;