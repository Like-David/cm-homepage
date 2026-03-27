import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'react-bootstrap/Image';
import image from '@/assets/images/About/Introduce/introduce.png';
import '@/styles/About.css';

function IntroduceImg() {
    const { t } = useTranslation();

    return (
        <>
            <div className="introduce-container">
                <Image src={image} className="introduce-main-image" />
                <div className="introduce-text-overlay">
                    <p className="main-text">
                        {t('about.introduce.overlay_text').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                    </p>
                </div>
            </div>
        </>
    );
}

export default IntroduceImg;