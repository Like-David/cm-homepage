import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
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

const partnerKeys = Object.keys(partnersData);

const categoryKeys = {
    'sm': 'business.sm',
    'si': 'business.si',
};

const INITIAL_COUNT = 10;

function Partners() {
    const { t } = useTranslation();
    const [activeKey, setActiveKey] = useState(partnerKeys[0]);
    const [expanded, setExpanded] = useState(false);

    const handleTabChange = (key) => {
        setActiveKey(key);
        setExpanded(false);
    };

    const allPartners = partnersData[activeKey];
    const visiblePartners = expanded ? allPartners : allPartners.slice(0, INITIAL_COUNT);
    const hiddenCount = allPartners.length - INITIAL_COUNT;

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
                            onClick={() => handleTabChange(key)}
                        >
                            {t(categoryKeys[key])}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-3 justify-content-center"
                >
                    <AnimatePresence mode='wait'>
                        {visiblePartners.map((partner) => (
                            <motion.div
                                key={`${activeKey}-${partner.key}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="col"
                            >
                                <div className="partner-card">
                                    <div className="partner-logo-wrapper">
                                        {partner.logo
                                            ? <img
                                                src={partner.logo}
                                                alt={t(`partners.names.${partner.key}`)}
                                                className={['img-fluid', partner.whiteBorder && 'img-white-border', partner.padded && 'img-logo-padded'].filter(Boolean).join(' ')}
                                              />
                                            : <div className="partner-logo-placeholder" />
                                        }
                                    </div>
                                    <p className="partner-name-text">{t(`partners.names.${partner.key}`)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {allPartners.length > INITIAL_COUNT && (
                    <div className="text-center mt-4">
                        <button
                            className="partner-expand-btn"
                            onClick={() => setExpanded(prev => !prev)}
                        >
                            {expanded
                                ? '접기 ▲'
                                : `더 보기 +${hiddenCount}`
                            }
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Partners;
