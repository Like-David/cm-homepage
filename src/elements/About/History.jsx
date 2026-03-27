import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/styles/About.css';

const historyData = [
    {
        year: '2024',
        events: [
            { month: '09', key: '2024_09_1' },
        ],
    },
    {
        year: '2023',
        events: [
            { month: '09', key: '2023_09_1' },
        ],
    },
    {
        year: '2022',
        events: [
            { month: '', key: '2022_1' },
            { month: '', key: '2022_2' },
            { month: '', key: '2022_3' },
            { month: '', key: '2022_4' },
            { month: '05', key: '2022_05_1' },
            { month: '', key: '2022_6' },
        ],
    },
    {
        year: '2021',
        events: [
            { month: '', key: '2021_1' },
            { month: '02', key: '2021_02_1' },
            { month: '', key: '2021_2' },
            { month: '', key: '2021_3' },
            { month: '', key: '2021_4' },
            { month: '', key: '2021_5' },
            { month: '', key: '2021_6' },
            { month: '', key: '2021_7' },
            { month: '', key: '2021_8' },
            { month: '', key: '2021_9' },
            { month: '', key: '2021_10' },
            { month: '04', key: '2021_04_1' },
            { month: '', key: '2021_11' },
            { month: '', key: '2021_12' },
            { month: '', key: '2021_13' },
            { month: '', key: '2021_14' },
            { month: '', key: '2021_15' },
            { month: '', key: '2021_16' },
            { month: '', key: '2021_17' },
            { month: '', key: '2021_18' },
            { month: '09', key: '2021_09_1' },
            { month: '', key: '2021_19' },
            { month: '', key: '2021_20' },
            { month: '10', key: '2021_10_1' },
            { month: '', key: '2021_21' },
        ],
    },
    {
        year: '2020',
        events: [
            { month: '07', key: '2020_07_1' },
            { month: '07', key: '2020_07_2' },
            { month: '08', key: '2020_08_1' },
            { month: '', key: '2020_1' },
            { month: '', key: '2020_2' },
            { month: '', key: '2020_3' },
            { month: '', key: '2020_4' },
            { month: '', key: '2020_5' },
            { month: '', key: '2020_6' },
        ],
    },
];

const INITIAL_EVENTS_TO_SHOW = 3;

function History() {
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState('card'); // 'card' or 'timeline'
    const [expandedCards, setExpandedCards] = useState({});

    const toggleCardExpansion = (year) => {
        setExpandedCards(prev => ({ ...prev, [year]: !prev[year] }));
    };

    const renderDescription = (description) => {
        return description.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                <br/>
            </React.Fragment>
        ));
    };

    return (
        <section id="hsitory" className="history-section">
            <div className="container">
                <h2 className="history-title">{t('menu.history')}</h2>
                <div className="view-toggle-container">
                    <button onClick={() => setViewMode(viewMode === 'card' ? 'timeline' : 'card')} className="view-toggle-btn">
                        {viewMode === 'card' ? t('about.history.view_timeline') : t('about.history.view_card')}
                    </button>
                </div>
                
                {viewMode === 'card' ? (
                    <div className="history-card-view">
                        {historyData.map((yearData) => {
                            const isExpanded = !!expandedCards[yearData.year];
                            const eventsToShow = isExpanded ? yearData.events : yearData.events.slice(0, INITIAL_EVENTS_TO_SHOW);
                            
                            return (
                                <div key={yearData.year} className="history-card">
                                    <div className="card-content-wrapper">
                                        <h3 className="card-year">{yearData.year}</h3>
                                        <ul className="card-events-list">
                                            {eventsToShow.map((event, index) => (
                                                <li key={index}>
                                                    <span className="card-event-month">{event.month && `${event.month}${t('about.history.month')}`}</span>
                                                    <p className="card-event-description">
                                                        {renderDescription(t(`about.history.items.${event.key}`))}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {yearData.events.length > INITIAL_EVENTS_TO_SHOW && (
                                        <button onClick={() => toggleCardExpansion(yearData.year)} className="expand-btn">
                                            {isExpanded ? '-' : '+'}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="history-timeline-view-alt">
                        {historyData.map((yearData, index) => (
                            <div key={yearData.year} className={`timeline-year-block ${index % 2 === 0 ? 'left' : 'right'}`}>
                                <div className="timeline-year-header">{yearData.year}</div>
                                <div className="timeline-year-content">
                                    <ul className="timeline-events-list">
                                        {yearData.events.map((event, eventIndex) => (
                                            <li key={eventIndex}>
                                                <span className="timeline-event-month">{event.month && `${event.month}${t('about.history.month')}`}</span>
                                                <p className="timeline-event-description">
                                                    {renderDescription(t(`about.history.items.${event.key}`))}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default History;
