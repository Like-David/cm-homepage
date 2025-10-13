import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';
import BAIImg from '@/assets/images/Index/Partners/BAI.png';
import BusanImg from '@/assets/images/Index/Partners/Busan.png';
import CHUBBImg from '@/assets/images/Index/Partners/CHUBB.png';
import CopyrightImg from '@/assets/images/Index/Partners/Copyright.png';
import DBLifeImg from '@/assets/images/Index/Partners/DBLife.jpg';
import FSBImg from '@/assets/images/Index/Partners/FSB.jpg';
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
import meritzImg from '@/assets/images/Index/Partners/meritz.jpg';
import MGImg from '@/assets/images/Index/Partners/MG.jpg';
import NHBankImg from '@/assets/images/Index/Partners/NHBank.png';
import OKCapitalImg from '@/assets/images/Index/Partners/OKCapital.jpg';
import SCBankImg from '@/assets/images/Index/Partners/SCBank.jpg';
import SeoulEtaxImg from '@/assets/images/Index/Partners/SeoulEtax.jpg';
import ShinhanCiImg from '@/assets/images/Index/Partners/ShinhanCi.png';
import SJCUImg from '@/assets/images/Index/Partners/SJCU.jpg';
import SMUImg from '@/assets/images/Index/Partners/SMU.jpg';
import '@/styles/Index.css';

const partnersData = {
    '공공기관': [
        // Add public institution logos here
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
        { name: '매리츠증권', logo: meritzImg },
        { name: 'MG 새마을금고', logo: MGImg },
        { name: 'NH 농협은행', logo: NHBankImg },
        { name: 'OK 캐피탈', logo: OKCapitalImg },
        { name: 'SC 제일은행', logo: SCBankImg },
        { name: '신한신용정보', logo: ShinhanCiImg }
        // Add more financial institution logos here
    ],
    '교육기관': [
        { name: '인하대학교', logo: INHAUImg },
        { name: '세종사이버대학교', logo: SJCUImg },
        { name: '상명대학교', logo: SMUImg },
        // Add educational institution logos here
    ],
};

const partnerCategories = Object.keys(partnersData);

function Partners() {
    const [activeCategory, setActiveCategory] = useState(partnerCategories[0]);

    return (
        <div className="partners-section">
            <InView triggerOnce={true}>
                {({ inView, ref }) => (
                    <div ref={ref} className={`animate-container ${inView ? 'animate-in' : ''}`}>
                        <div className="business-title-overlay">
                            <i className="fa-solid fa-briefcase"></i>&nbsp;Partners
                        </div>
                        <p className="business-main-subtext">
                            씨엠이노베이션은 주요 분야별 최적화된 전자문서 솔루션을 제공합니다.
                        </p>
                    </div>
                )}
            </InView>

            <div className="partner-buttons">
                {partnerCategories.map(category => (
                    <button
                        key={category}
                        className={`partner-button ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="partner-logos">
                {partnersData[activeCategory].length > 0 ? (
                    partnersData[activeCategory].map((partner, index) => (
                        <div key={index} className="partner-logo">
                            <img src={partner.logo} alt={partner.name} />
                        </div>
                    ))
                ) : (
                    <p>해당 카테고리의 파트너가 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default Partners;