import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '@/styles/Footer.css';

function Footer() {
    const { t } = useTranslation();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer id="footer" className="main">
            <div className="wrap">
                <h1><a href="/">{t('footer.company_name')}</a></h1>
                <nav className="gnb">
                    <ul>
                        <li><Link to="/privacy"><strong>{t('footer.privacy_policy')}</strong></Link></li>
                        <li><Link to="/terms">{t('footer.terms_of_service')}</Link></li>
                    </ul>
                </nav>
                <div className="f_left">
                    <dl>
                        <dt>{t('footer.company_name')}</dt>
                        <dt>{t('footer.ceo')}: {t('footer.ceo_name')}</dt>
                        <dt>{t('footer.address_label')}: {t('footer.address')}</dt>
                        <dt>{t('footer.biz_reg_no')}: 561-88-01986</dt>
                    </dl>
                    <dl>
                        <dt>{t('footer.tel')}: 02-6949-4170</dt>
                        <dt>{t('footer.tech_support')}: 0505-998-0888</dt>
                        <dt>{t('footer.fax')}: 0505-477-4170</dt>
                    </dl>
                    <p className="copyright">Copyright © <strong>CMInnovation. </strong> All Rights Reserved.</p>
                </div>
            </div>
            <a href="#!" onClick={scrollToTop} id="top_btn">
                <span className="sound_only">{t('footer.scroll_to_top')}</span>
                <i className="fa-solid fa-caret-up"></i>
            </a>
        </footer>
    );
}

export default Footer;
