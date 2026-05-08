import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '@/styles/ClientPage.css';
import '@/styles/Scroll_nav.css';

import Banner from '@/components/common/Banner';

import BAIImg from '@/assets/images/Index/Partners/BAI.png';
import BusanImg from '@/assets/images/Index/Partners/Busan.png';
import CHUBBImg from '@/assets/images/Index/Partners/CHUBB.png';
import CopyrightImg from '@/assets/images/Index/Partners/Copyright.png';
import DBLifeImg from '@/assets/images/Index/Partners/DBLife.jpg';
import HanaLifeImg from '@/assets/images/Index/Partners/HanaLife.png';
import HanwhaImg from '@/assets/images/Index/Partners/Hanwha.png';
import IBKImg from '@/assets/images/Index/Partners/IBK.png';
import IMBankImg from '@/assets/images/Index/Partners/IMBank.jpg';
import INHAUImg from '@/assets/images/Index/Partners/INHAU.jpg';
import JBBankImg from '@/assets/images/Index/Partners/JBBank.jpg';
import KBSavingImg from '@/assets/images/Index/Partners/KBSaving.png';
import KCAImg from '@/assets/images/Index/Partners/KCA.png';
import KDBImg from '@/assets/images/Index/Partners/KDB.png';
import KoreaInvestmentImg from '@/assets/images/Index/Partners/KoreaInvestment.png';
import KYOBOImg from '@/assets/images/Index/Partners/KYOBO.png';
import KyongnamImg from '@/assets/images/Index/Partners/Kyongnam.jpg';
import MGImg from '@/assets/images/Index/Partners/MG.png';
import NHBankImg from '@/assets/images/Index/Partners/NHBank.png';
import OKCapitalImg from '@/assets/images/Index/Partners/OKCapital.jpg';
import SeoulEtaxImg from '@/assets/images/Index/Partners/SeoulEtax.jpg';
import ShinhanCiImg from '@/assets/images/Index/Partners/ShinhanCi.png';
import SJCUImg from '@/assets/images/Index/Partners/SJCU.jpg';
import SMUImg from '@/assets/images/Index/Partners/SMU.jpg';

const partnersData = {
    'sm': [
        { key: 'IBK', logo: IBKImg },
        { key: 'ShinhanBank', logo: null },
        { key: 'WooriBank', logo: null },
        { key: 'NHBank', logo: NHBankImg },
        { key: 'Busan', logo: BusanImg },
        { key: 'Kyongnam', logo: KyongnamImg },
        { key: 'JBBank', logo: JBBankImg },
        { key: 'IMBank', logo: IMBankImg },
        { key: 'KoreaInvestment', logo: KoreaInvestmentImg },
        { key: 'HanwhaLife', logo: null },
        { key: 'Hanwha', logo: HanwhaImg },
        { key: 'HanaLife', logo: HanaLifeImg },
        { key: 'KDB', logo: KDBImg },
        { key: 'DBLife', logo: DBLifeImg },
        { key: 'CHUBB', logo: CHUBBImg },
        { key: 'KYOBO', logo: KYOBOImg },
        { key: 'MG', logo: MGImg },
        { key: 'OKCapital', logo: OKCapitalImg },
        { key: 'KBSaving', logo: KBSavingImg },
        { key: 'MGSaemaul', logo: MGImg },
        { key: 'ShinhanCi', logo: ShinhanCiImg },
        { key: 'OKFinancial', logo: OKCapitalImg },
        { key: 'SeoulEtax', logo: SeoulEtaxImg },
        { key: 'SeoulSubsidy', logo: null },
        { key: 'SaemterBuilding', logo: null },
        { key: 'NIRS', logo: null },
        { key: 'Copyright', logo: CopyrightImg },
        { key: 'KCA', logo: KCAImg },
        { key: 'INHAU', logo: INHAUImg },
        { key: 'SMU', logo: SMUImg, padded: true },
        { key: 'SJCU', logo: SJCUImg, padded: true },
        { key: 'KNOU', logo: null },
    ],
    'si': [
        { key: 'BAI', logo: BAIImg },
        { key: 'NationalDefense', logo: null },
        { key: 'WooriBank', logo: null },
        { key: 'NHBank', logo: NHBankImg },
        { key: 'NHCoOp', logo: null },
        { key: 'LaborWelfare', logo: null },
        { key: 'SMEVenture', logo: null },
        { key: 'OilManagement', logo: null },
        { key: 'KoreaRacing', logo: null },
        { key: 'NHCard', logo: null },
        { key: 'OKP2P', logo: null },
        { key: 'LotteInsurance', logo: null },
        { key: 'IMCapital', logo: null },
        { key: 'WoongjiTax', logo: null },
        { key: 'EBS', logo: null },
        { key: 'Mediawill', logo: null },
        { key: 'OKData', logo: null },
        { key: 'Busan', logo: BusanImg },
        { key: 'JBBank', logo: JBBankImg },
        { key: 'Kyongnam', logo: KyongnamImg },
        { key: 'IMBank', logo: IMBankImg },
        { key: 'SJCU', logo: SJCUImg, padded: true },
        { key: 'KNOU', logo: null },
        { key: 'KCA', logo: KCAImg },
        { key: 'DBLife', logo: DBLifeImg },
        { key: 'MGSaemaul', logo: MGImg },
        { key: 'OKCapital', logo: OKCapitalImg },
    ],
};

const categoryIdMap = {
    'sm': 'sm-projects',
    'si': 'si-projects',
};

const categoryKeys = {
    'sm': 'business.sm',
    'si': 'business.si',
};

const ClientPage = () => {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState('');
    const sectionRefs = useRef({});
    const location = useLocation();

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let currentSection = '';
        Object.keys(partnersData).forEach(key => {
            const id = categoryIdMap[key];
            const ref = sectionRefs.current[id];
            if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
                currentSection = id;
            }
        });
        if (currentSection) {
            setActiveSection(currentSection);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = sectionRefs.current[id];
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 150,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const hash = location.hash.substring(1);
        if (hash) {
            const timer = setTimeout(() => {
                scrollToSection(hash);
                setActiveSection(hash);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [location.hash]);

    return (
        <div className="client-page">
            <nav className="scroll-nav">
                <ul className="scroll-nav-list">
                    {Object.keys(partnersData).map((key) => (
                        <li
                            key={key}
                            className={activeSection === categoryIdMap[key] ? 'active' : ''}
                            onClick={() => scrollToSection(categoryIdMap[key])}
                        >
                            <span>{t(categoryKeys[key])}</span>
                        </li>
                    ))}
                </ul>
            </nav>

            <Banner title={t('business.title')} subtitle={t('business.subtitle')} />

            <div className="partners-grid-section">
                <div className="container">
                    {Object.keys(partnersData).map((key) => (
                        <div key={key}
                             id={categoryIdMap[key]}
                             ref={el => sectionRefs.current[categoryIdMap[key]] = el}
                             className="partner-category">
                            <h3>{t(categoryKeys[key])}</h3>
                            <div className="partners-grid">
                                {partnersData[key].map((partner, index) => (
                                    <div key={`${key}-${partner.key}-${index}`} className="partner-card">
                                        {partner.logo
                                            ? <img
                                                src={partner.logo}
                                                alt={t(`partners.names.${partner.key}`)}
                                                className={[
                                                    partner.whiteBorder && 'img-white-border',
                                                    partner.padded && 'img-logo-padded'
                                                ].filter(Boolean).join(' ')}
                                              />
                                            : <div className="partner-logo-placeholder" />
                                        }
                                        <p className="partner-name">{t(`partners.names.${partner.key}`)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientPage;
