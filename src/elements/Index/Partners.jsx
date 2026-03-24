import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="partners-section" style={{ padding: '300px' }}>
            <div className="container">
                {/* 헤더 부분 */}
                <div className="text-center mb-5">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="solution-title-overlay"
                    >
                        Partners
                    </motion.h2>
                    <p className="solution-main-subtext">분야별 최적화된 솔루션을 제공합니다.</p>
                </div>

                {/* 탭 버튼 스타일 개선 */}
                <div className="d-flex justify-content-center gap-2 mb-5">
                    {partnerCategories.map(category => (
                        <button
                            key={category}
                            className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill partner-category-button`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* 로고 영역 애니메이션 */}
                <motion.div
                    layout
                    className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4 justify-content-center"
                >
                    <AnimatePresence mode='wait'>
                        {partnersData[activeCategory].map((partner) => (
                            <motion.div
                                key={`${activeCategory}-${partner.name}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="col"
                            >
                                <div className="partner-card">
                                    <img src={partner.logo} alt={partner.name} />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

export default Partners;