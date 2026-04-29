import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import BAIImg from '@/assets/images/Index/Partners/BAI.png';
import BusanImg from '@/assets/images/Index/Partners/Busan.png';
import CHUBBImg from '@/assets/images/Index/Partners/CHUBB.png';
import CopyrightImg from '@/assets/images/Index/Partners/Copyright.png';
import DBLifeImg from '@/assets/images/Index/Partners/DBLife.jpg';
import FSBImg from '@/assets/images/Index/Partners/FSB.jpg';
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
import MGImg from '@/assets/images/Index/Partners/MG.png';
import NHBankImg from '@/assets/images/Index/Partners/NHBank.png';
import OKCapitalImg from '@/assets/images/Index/Partners/OKCapital.jpg';
import SCBankImg from '@/assets/images/Index/Partners/SCBank.jpg';
import SeoulEtaxImg from '@/assets/images/Index/Partners/SeoulEtax.jpg';
import ShinhanCiImg from '@/assets/images/Index/Partners/ShinhanCi.png';
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
    ],
};

const partnerKeys = Object.keys(partnersData);

const categoryKeys = {
    'financial': 'business.financial',
    'educational': 'business.educational',
    'public': 'business.public'
};

function Partners() {
    const { t } = useTranslation();
    const [activeKey, setActiveKey] = useState(partnerKeys[0]);

    return (
        <div className="partners-section">
            <div className="container">
                <div className="text-center mb-5">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="solution-title-overlay"
                    >
                        Partners
                    </motion.h2>
                    <p className="solution-main-subtext">{t('business.partners_subtext')}</p>
                </div>

                <div className="d-flex justify-content-center gap-2 mb-5">
                    {partnerKeys.map(key => (
                        <button
                            key={key}
                            className={`btn ${activeKey === key ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill partner-category-button`}
                            onClick={() => setActiveKey(key)}
                        >
                            {t(categoryKeys[key])}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center"
                >
                    <AnimatePresence mode='wait'>
                        {partnersData[activeKey].map((partner) => (
                            <motion.div
                                key={`${activeKey}-${partner.key}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="col"
                            >
                                <div className="partner-card">
                                    <div className="partner-logo-wrapper">
                                        <img src={partner.logo} alt={t(`partners.names.${partner.key}`)} className={['img-fluid', partner.whiteBorder && 'img-white-border', partner.padded && 'img-logo-padded'].filter(Boolean).join(' ')} />
                                    </div>
                                    <p className="partner-name-text">{t(`partners.names.${partner.key}`)}</p>
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
