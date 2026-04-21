import React from 'react';
import { useTranslation } from 'react-i18next';
import image from '@/assets/images/Index/IndexImg/testImage.png';

function IndexImg() {
    const { t } = useTranslation();
    return (
        <div className="homepage-container">
            <img src={image} alt="Hero" className="homepage-main-image" style={{ filter: 'brightness(70%)' }} />
            <div className="homepage-text-overlay">
                <p className="homepage-main-text">{t('info.index_overlay_1')}</p>
                <p className="homepage-main-text">{t('info.index_overlay_2')}</p>
            </div>
        </div>
    );
}

export default IndexImg;
