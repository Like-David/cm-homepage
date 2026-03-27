import React from 'react';
import { useTranslation } from 'react-i18next';
import '@/styles/About.css';

function Introduce() {
    const { t } = useTranslation();
    return (
        <section id="introduce" className="introduce-content-section">
            <div className="container">
                <h2 className="about-title">{t('menu.company_intro')}</h2>
                <p className="main-text-introduce">
                    {t('about.introduce.main_text').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                </p>
                <div className="sub-text-introduce">
                    <p>
                        {t('about.introduce.sub_text_1')}
                    </p>
                    <p>
                        {t('about.introduce.sub_text_2')}
                    </p>
                    <p>
                        {t('about.introduce.sub_text_3')}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Introduce;