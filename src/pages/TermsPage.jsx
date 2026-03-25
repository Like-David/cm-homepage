import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '@/components/common/Banner';
import '@/styles/PolicyPage.css';

const TermsPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // i18next에서 객체 형태의 데이터를 가져옵니다.
    const articles = t('policy.terms.articles', { returnObjects: true });
    const articleKeys = Object.keys(articles);

    const renderContent = (content) => {
        return content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="policy-page">
            <Banner title={t('footer.terms_of_service')} subtitle={t('footer.company_name')} />
            <div className="policy-container">
                <header className="policy-header">
                    <h1>{t('policy.terms.title')}</h1>
                </header>

                <article className="policy-content">
                    {articleKeys.map((key) => (
                        <section key={key} className="policy-section">
                            <h2>{articles[key].title}</h2>
                            <p>{renderContent(articles[key].content)}</p>
                        </section>
                    ))}

                    <div className="policy-sub-content">
                        <p><strong>{t('policy.terms.appendix.title')}</strong></p>
                        <p>{t('policy.terms.appendix.content')}</p>
                    </div>

                    <p className="policy-date">{t('policy.terms.footer')}</p>
                </article>
            </div>
        </div>
    );
};

export default TermsPage;
