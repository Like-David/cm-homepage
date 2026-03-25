import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '@/components/common/Banner';
import '@/styles/PolicyPage.css';

const PrivacyPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const renderText = (key) => {
        return t(key).split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="policy-page">
            <Banner title={t('footer.privacy_policy')} subtitle={t('footer.company_name')} />
            <div className="policy-container">
                <header className="policy-header">
                    <h1>{t('policy.privacy.title')}</h1>
                </header>
                
                <article className="policy-content">
                    <p style={{ fontSize: '1.1rem', marginBottom: '40px', fontWeight: '500' }}>
                        {t('policy.privacy.intro')}
                    </p>

                    <section className="policy-section">
                        <h2>{t('policy.privacy.section1_title')}</h2>
                        <p>{renderText('policy.privacy.section1_content')}</p>
                    </section>

                    <section className="policy-section">
                        <h2>{t('policy.privacy.section2_title')}</h2>
                        <p>{t('policy.privacy.section2_content1')}</p>
                        <p>{t('policy.privacy.section2_content2')}</p>
                        <div className="policy-sub-content">
                            <ul>
                                <li>{t('policy.privacy.section2_item1')}</li>
                                <li>{t('policy.privacy.section2_item2')}</li>
                            </ul>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>{t('policy.privacy.section3_title')}</h2>
                        <p>{t('policy.privacy.section3_content')}</p>
                    </section>

                    <section className="policy-section">
                        <h2>{t('policy.privacy.section4_title')}</h2>
                        <p>{t('policy.privacy.section4_content1')}</p>
                        <p>{t('policy.privacy.section4_content2')}</p>
                    </section>

                    <section className="policy-section">
                        <h2>{t('policy.privacy.section5_title')}</h2>
                        <p>{t('policy.privacy.section5_content')}</p>
                        <div className="policy-sub-content">
                            <ol style={{ paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '8px' }}>{t('policy.privacy.section5_item1')}</li>
                                <li style={{ marginBottom: '8px' }}>{t('policy.privacy.section5_item2')}</li>
                                <li style={{ marginBottom: '8px' }}>{t('policy.privacy.section5_item3')}</li>
                                <li style={{ marginBottom: '8px' }}>{t('policy.privacy.section5_item4')}</li>
                            </ol>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2>{t('policy.privacy.section6_title')}</h2>
                        <p>{t('policy.privacy.section6_content')}</p>
                        <ul>
                            <li>{t('policy.privacy.section6_item1')}</li>
                        </ul>
                    </section>

                    <section className="policy-section">
                        <h2>{t('policy.privacy.section7_title')}</h2>
                        <p>{t('policy.privacy.section7_content1')}</p>
                        <p>{t('policy.privacy.section7_content2')}</p>
                        <ul>
                            <li>{t('policy.privacy.section7_item1')}</li>
                            <li>{t('policy.privacy.section7_item2')}</li>
                        </ul>
                    </section>

                    <section className="policy-section">
                        <h2>{t('policy.privacy.section8_title')}</h2>
                        <p>{t('policy.privacy.section8_content')}</p>
                        <ul>
                            <li>{t('policy.privacy.section8_item1')}</li>
                            <li>{t('policy.privacy.section8_item2')}</li>
                            <li>{t('policy.privacy.section8_item3')}</li>
                        </ul>
                    </section>

                    <section className="policy-section">
                        <h2>{t('policy.privacy.section9_title')}</h2>
                        <p>{t('policy.privacy.section9_content')}</p>
                        <div className="policy-sub-content">
                            <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1C2D60', marginBottom: '15px' }}>▶ {t('policy.privacy.section9_label')}</p>
                            <p>{t('policy.privacy.section9_name')}</p>
                            <p>{t('policy.privacy.section9_contact')}</p>
                            <p><strong>E-mail :</strong> support@cminnovation.co.kr</p>
                        </div>
                    </section>

                    <p className="policy-date">{t('policy.privacy.footer')}</p>
                </article>
            </div>
        </div>
    );
};

export default PrivacyPage;
