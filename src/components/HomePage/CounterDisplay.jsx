import React, { useState, useEffect } from 'react';

function CounterDisplay({ emoji, text, endCount }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
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
    }, [endCount]);

    return (
        <div className="counter-item">
            <span role="img" aria-label="emoji" className="overlay-emoji">{emoji}</span>
            <p className="overlay-text">{text}</p>
            <p className="overlay-number">{count.toLocaleString()}+</p>
        </div>
    );
}

export default CounterDisplay;