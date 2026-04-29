import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '@/styles/ClientPage.css';
import '@/styles/Scroll_nav.css';

import Banner from '@/components/common/Banner';

// Import all necessary images
import BAIImg from '@/assets/images/Index/Partners/BAI.png';
import CopyrightImg from '@/assets/images/Index/Partners/Copyright.png';
import FSBImg from '@/assets/images/Index/Partners/FSB.jpg';
import KCAImg from '@/assets/images/Index/Partners/KCA.png';
import SeoulEtaxImg from '@/assets/images/Index/Partners/SeoulEtax.jpg';

import BusanImg from '@/assets/images/Index/Partners/Busan.png';
import CHUBBImg from '@/assets/images/Index/Partners/CHUBB.png';
import DBLifeImg from '@/assets/images/Index/Partners/DBLife.jpg';
import HanwhaImg from '@/assets/images/Index/Partners/Hanwha.png';
import IBKImg from '@/assets/images/Index/Partners/IBK.png';
import IMBankImg from '@/assets/images/Index/Partners/IMBank.jpg';
import JBBankImg from '@/assets/images/Index/Partners/JBBank.jpg';
import KBSavingImg from '@/assets/images/Index/Partners/KBSaving.png';
import KDBImg from '@/assets/images/Index/Partners/KDB.png';
import KoreaInvestmentImg from '@/assets/images/Index/Partners/KoreaInvestment.png';
import KYOBOImg from '@/assets/images/Index/Partners/KYOBO.png';
import KyongnamImg from '@/assets/images/Index/Partners/Kyongnam.jpg';
import meritzImg from '@/assets/images/Index/Partners/meritz.jpg';
import MGImg from '@/assets/images/Index/Partners/MG.png';
import NHBankImg from '@/assets/images/Index/Partners/NHBank.png';
import OKCapitalImg from '@/assets/images/Index/Partners/OKCapital.jpg';
import SCBankImg from '@/assets/images/Index/Partners/SCBank.jpg';
import ShinhanCiImg from '@/assets/images/Index/Partners/ShinhanCi.png';

import INHAUImg from '@/assets/images/Index/Partners/INHAU.jpg';
import SJCUImg from '@/assets/images/Index/Partners/SJCU.jpg';
import SMUImg from '@/assets/images/Index/Partners/SMU.jpg';


const partnersData = {
    'financial': [
        { key: 'NHBank', logo: NHBankImg },
        { key: 'IBK', logo: IBKImg },
        { key: 'Busan', logo: BusanImg },
        { key: 'Kyongnam', logo: KyongnamImg },
        { key: 'JBBank', logo: JBBankImg },
        { key: 'IMBank', logo: IMBankImg, whiteBorder: true }
    ],
    'educational': [
        { key: 'KBSaving', logo: KBSavingImg },
        { key: 'FSB', logo: FSBImg, whiteBorder: true },
        { key: 'MG', logo: MGImg },
        { key: 'OKCapital', logo: OKCapitalImg },
        { key: 'Hanwha', logo: HanwhaImg },
        { key: 'KDB', logo: KDBImg },
        { key: 'DBLife', logo: DBLifeImg },
        { key: 'CHUBB', logo: CHUBBImg },
        { key: 'KYOBO', logo: KYOBOImg },
        { key: 'KoreaInvestment', logo: KoreaInvestmentImg },
        { key: 'meritz', logo: meritzImg },
        { key: 'ShinhanCi', logo: ShinhanCiImg }
    ],
    'public': [
        { key: 'BAI', logo: BAIImg },
        { key: 'Copyright', logo: CopyrightImg },
        { key: 'KCA', logo: KCAImg },
        { key: 'SeoulEtax', logo: SeoulEtaxImg },
        { key: 'INHAU', logo: INHAUImg },
        { key: 'SJCU', logo: SJCUImg, padded: true },
        { key: 'SMU', logo: SMUImg, padded: true }
    ]
};

const categoryIdMap = {
  'financial': 'financial-institutions',
  'educational': 'financial2-institutions',
  'public': 'public-institutions',
};

const categoryKeys = {
    'financial': 'business.financial',
    'educational': 'business.educational',
    'public': 'business.public'
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
                    <img src={partner.logo} alt={t(`partners.names.${partner.key}`)} className={[partner.whiteBorder && 'img-white-border', partner.padded && 'img-logo-padded'].filter(Boolean).join(' ')} />
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
