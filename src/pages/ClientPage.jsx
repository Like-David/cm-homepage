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
        { name: 'NH 농협은행', logo: NHBankImg },
        { name: 'IBK 기업은행', logo: IBKImg },
        { name: 'BNK 부산은행', logo: BusanImg },
        { name: 'BNK 경남은행', logo: KyongnamImg },
        { name: '전북은행', logo: JBBankImg },
        { name: 'iM 뱅크', logo: IMBankImg, whiteBorder: true }
    ],
    'educational': [
        { name: 'KB 저축은행', logo: KBSavingImg },
        { name: '저축은행중앙회', logo: FSBImg, whiteBorder: true },
        { name: 'MG 새마을금고', logo: MGImg },
        { name: 'OK 캐피탈', logo: OKCapitalImg },
        { name: '한화금융서비스', logo: HanwhaImg },
        { name: 'KDB 생명', logo: KDBImg },
        { name: 'DB생명', logo: DBLifeImg },
        { name: '처브라이프생명보험주식회사', logo: CHUBBImg },
        { name: '교보라이프플래닛', logo: KYOBOImg },
        { name: '한국투자증권', logo: KoreaInvestmentImg },
        { name: '메리츠증권', logo: meritzImg },
        { name: '신한신용정보', logo: ShinhanCiImg }
    ],
    'public': [
        { name: '감사원', logo: BAIImg },
        { name: '한국저작권위원회', logo: CopyrightImg },
        { name: '한국방송전파진흥원', logo: KCAImg },
        { name: '서울시 Etax', logo: SeoulEtaxImg },
        { name: '인하대학교', logo: INHAUImg },
        { name: '세종사이버대학교', logo: SJCUImg, padded: true },
        { name: '상명대학교', logo: SMUImg, padded: true }
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
                  <div key={`${key}-${partner.name}-${index}`} className="partner-card">
                    <img src={partner.logo} alt={partner.name} className={[partner.whiteBorder && 'img-white-border', partner.padded && 'img-logo-padded'].filter(Boolean).join(' ')} />
                    <p className="partner-name">{partner.name}</p>
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
