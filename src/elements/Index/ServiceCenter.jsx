import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import ServiceCenterImg from '@/assets/images/Index/ServiceCenter/call.png';

function ServiceCenter() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="service-center-container">
            <Image src={ServiceCenterImg} className="service-center-image" />
            <div className="service-center-text-overlay">
                <p className="main-text">
                    {t('support.index.service_center_main').split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
                <button className="service-center-button" onClick={() => navigate('/support')}>
                    {t('support.index.service_center_btn')}
                </button>
            </div>
        </div>
    );
}

export default ServiceCenter;
