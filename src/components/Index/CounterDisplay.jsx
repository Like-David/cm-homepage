import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function CounterDisplay({ iconClass, text, endCount, unit, showPlusSign = true, inView }) {
    const { t } = useTranslation();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) {
            setCount(0); // Reset count when out of view
            return;
        }

        let startTimestamp = null;
        const duration = 2000; // Duration in milliseconds

        const animateCount = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = (timestamp - startTimestamp) / duration;
            const currentCount = Math.min(Math.floor(progress * endCount), endCount);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            }
        };

        requestAnimationFrame(animateCount);
    }, [endCount, inView]);

    const formatNumber = (num) => {
        if (unit === '백만') {
            const billion = Math.floor(num / 100000000);
            const Million = Math.floor((num % 100000000) / 1000000);
            let formatted = '';
            if (billion > 0) {
                formatted += `${billion}${t('info.count_billion')} `;
            }
            if (Million > 0) {
                formatted += `${Million}${t('info.count_million')}`;
            }
            return formatted.trim();
        } else {
            return num.toString();
        }
    };

    return (
        <div className="counter-item">
            {iconClass && <i className={`overlay-icon ${iconClass}`}></i>} {/* Render <i> tag with iconClass */}
            <p className="overlay-text">{text}</p>
            <p className="overlay-number">{formatNumber(count)}{unit && unit !== '백만' ? unit : ''}{showPlusSign && unit !== '백만' ? '+' : ''}</p>
            <p className="overlay-date-text">2025.12.31 {t('info.as_of')}</p>
        </div>
    );
}

export default CounterDisplay;