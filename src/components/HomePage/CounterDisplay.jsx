import React, { useState, useEffect } from 'react';

function CounterDisplay({ iconClass, text, endCount, unit, showPlusSign = true, inView }) {
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
        if (unit === '천만원') {
            const billion = Math.floor(num / 100000000);
            const tenMillion = Math.floor((num % 100000000) / 10000000);
            let formatted = '';
            if (billion > 0) {
                formatted += `${billion}억 `;
            }
            if (tenMillion > 0) {
                formatted += `${tenMillion}천만원`;
            }
            return formatted.trim();
        } else {
            return num.toLocaleString();
        }
    };

    return (
        <div className="counter-item">
            {iconClass && <i className={`overlay-icon ${iconClass}`}></i>} {/* Render <i> tag with iconClass */}
            <p className="overlay-number">{formatNumber(count)}{unit && unit !== '천만원' ? unit : ''}{showPlusSign && unit !== '천만원' ? '+' : ''}</p>
            <p className="overlay-text">{text}</p>
        </div>
    );
}

export default CounterDisplay;