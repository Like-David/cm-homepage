import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'react-bootstrap/Image';
import image from '@/assets/images/About/CEO/CEO.png';
import '@/styles/About.css';

function CEO() {
    const { t } = useTranslation();
    return (
        <section id="CEO" className="ceo-section">
            <div className="container">
                <h2 className="about-title">{t('menu.ceo_message')}</h2>
                <div className="ceo-grid">
                    <div className="ceo-image-placeholder">
                        <img src={image} />
                    </div>
                    <div className="ceo-message">
                        <p>{t('about.ceo.greeting').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>
                        
                        <p><strong>{t('about.ceo.company_name')}</strong></p>
                        
                        <p>{t('about.ceo.p1').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>
                        
                        <p>{t('about.ceo.p2').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>
                        
                        <p>{t('about.ceo.p3').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CEO;