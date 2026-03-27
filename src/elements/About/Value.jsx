import React from 'react';
import { useTranslation } from 'react-i18next';
import '@/styles/About.css';

function Value() {
    const { t } = useTranslation();
    return (
        <section id="value" className="value-section">
            <div className="container">
                <h2 className="about-title">{t('menu.value_system')}</h2>
                <div className="value-grid">
                    <div className="value-item">
                        <div className="value-icon-placeholder efficiency-icon"></div>
                        <h3>{t('about.value.efficiency_title')}</h3>
                        <p>{t('about.value.efficiency_desc')}</p>
                    </div>
                    <div className="value-item">
                        <div className="value-icon-placeholder cost-icon"></div>
                        <h3>{t('about.value.cost_title')}</h3>
                        <p>{t('about.value.cost_desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Value;