import React from 'react';
import '../../styles/common/Banner.css';
import bannerBg from '@/assets/images/Solution/solution-banner-bg.png';

const Banner = ({ title, subtitle }) => {
    return (
        <div className="common-banner" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerBg})`
        }}>
            <div className="banner-content">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </div>
    );
};

export default Banner;
