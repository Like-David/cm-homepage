import React from 'react';
import Image from 'react-bootstrap/Image';
import image from '@/assets/images/About/Introduce/introduce.png';
import '@/styles/About.css';

function IntroduceImg() {

    return (
        <>
            <div className="introduce-container">
                <Image src={image} className="introduce-main-image" />
                <div className="introduce-text-overlay">
                    <p className="main-text">창구페이퍼리스를 통해<br/>고객사의 경쟁력 강화에 최선을 다하고 있습니다.</p>
                </div>
            </div>
        </>
    );
}

export default IntroduceImg;