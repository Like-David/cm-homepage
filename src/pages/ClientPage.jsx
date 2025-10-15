import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '@/styles/ClientPage.css';
import PartnerCategory from '../components/business/PartnerCategory';

import solutionBannerBg from '@/assets/images/Solution/solution-banner-bg.png';
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
    '공공기관': [
        { name: '감사원', logo: BAIImg },
        { name: '한국저작권위원회', logo: CopyrightImg },
        { name: '저축은행중앙회', logo: FSBImg },
        { name: '한국방송전파진흥원', logo: KCAImg },
        { name: '서울시 Etax', logo: SeoulEtaxImg }
    ],
    '금융기관': [
        { name: 'BNK 부산은행', logo: BusanImg },
        { name: '처브라이프생명보험주식회사', logo: CHUBBImg },
        { name: 'DB생명', logo: DBLifeImg },
        { name: '한화금융서비스', logo: HanwhaImg },
        { name: 'IBK 기업은행', logo: IBKImg },
        { name: 'iM 뱅크', logo: IMBankImg },
        { name: '전북은행', logo: JBBankImg },
        { name: 'KB 저축은행', logo: KBSavingImg },
        { name: 'KDB 생명', logo: KDBImg },
        { name: '한국투자증권', logo: KoreaInvestmentImg },
        { name: '교보라이프플래닛', logo: KYOBOImg },
        { name: 'BNK 경남은행', logo: KyongnamImg },
        { name: '메리츠증권', logo: meritzImg },
        { name: 'MG 새마을금고', logo: MGImg },
        { name: 'NH 농협은행', logo: NHBankImg },
        { name: 'OK 캐피탈', logo: OKCapitalImg },
        { name: 'SC 제일은행', logo: SCBankImg },
        { name: '신한신용정보', logo: ShinhanCiImg }
    ],
    '교육기관': [
        { name: '인하대학교', logo: INHAUImg },
        { name: '세종사이버대학교', logo: SJCUImg },
        { name: '상명대학교', logo: SMUImg },
    ],
};

// Map category names to IDs for URL hashes and refs
const categoryIdMap = {
  '공공기관': 'public-institutions',
  '금융기관': 'financial-institutions',
  '교육기관': 'educational-institutions',
};

const ClientPage = () => {
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef({});
  const location = useLocation();

  // Function to scroll to a section
  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjust for fixed header height
        behavior: 'smooth',
      });
    }
  };

  // Effect to handle scroll events and update activeSection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      Object.keys(partnersData).forEach((categoryName) => {
        const id = categoryIdMap[categoryName];
        const ref = sectionRefs.current[id];
        if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to handle URL hash changes and scroll on load/hash change
  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash && categoryIdMap[Object.keys(partnersData).find(key => categoryIdMap[key] === hash)]) { // Validate hash against known categories
      const timer = setTimeout(() => { // Use a small timeout to allow DOM to render
        scrollToSection(hash);
        setActiveSection(hash);
      }, 100); // Small delay
      return () => clearTimeout(timer);
    } else if (!hash && Object.keys(partnersData).length > 0) {
      // If no hash, set active to the first category
      setActiveSection(categoryIdMap[Object.keys(partnersData)[0]]);
    }
  }, [location.hash]); // Re-run when hash changes


  return (
    <div className="client-page">
      {/* Right-side Scroll Navigation */}
      <nav className="scroll-nav">
        <ul>
          {Object.keys(partnersData).map((categoryName) => (
            <li
              key={categoryName}
              className={activeSection === categoryIdMap[categoryName] ? 'active' : ''}
              onClick={() => scrollToSection(categoryIdMap[categoryName])}
            >
              <span>{categoryName}</span>
            </li>
          ))}
        </ul>
      </nav>

      <Banner title="Our Partners" subtitle="씨엠이노베이션과 함께하는 소중한 파트너사들을 소개합니다." />

      <div className="partners-grid-section">
        <div className="container">
          {Object.keys(partnersData).map((categoryName) => (
            <div key={categoryName}
                 id={categoryIdMap[categoryName]} // Assign ID
                 ref={el => sectionRefs.current[categoryIdMap[categoryName]] = el} // Assign ref
                 className="partner-category">
              <h3>{categoryName}</h3>
              <div className="partners-grid">
                {partnersData[categoryName].map((partner, index) => (
                  <div key={`${categoryName}-${partner.name}-${index}`} className="partner-card">
                    <img src={partner.logo} alt={partner.name} />
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

export { ClientPage };
