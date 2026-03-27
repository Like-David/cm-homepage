import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import CounterDisplay from '../../components/Index/CounterDisplay';

function Info() {
    const { t } = useTranslation();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
            <div ref={ref} className="info-container text-center text-white py-5 d-flex align-items-center" style={{ minHeight: '80vh', position: 'relative' }}>

                {/* 배경 SVG 차트 영역 */}
                <svg
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '60%', // 차트 높이 조절
                        zIndex: 0,
                        pointerEvents: 'none'
                    }}
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* 하단 색칠 영역 (Area) - 더 역동적인 베지어 곡선 */}
                    <path
                        fill="url(#chartGradient)"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>

                    {/* 상단 라인 (Stroke) */}
                    <path
                        fill="none"
                        stroke="#44aaff"
                        strokeWidth="3"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96"
                    ></path>
                </svg>

                {/* 실제 콘텐츠 영역 */}
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-10">
                            <h2 className="display-6 fw-bold mb-3" style={{ lineHeight: '1.4', whiteSpace: 'pre-line' }}>
                                {t('info.main_title')}
                            </h2>
                        </div>
                    </div>

                    <div className="row justify-content-center g-4">
                        <div className="col-md-4 d-flex justify-content-center">
                            <div style={{ width: '200px' }} className="text-start">
                                <CounterDisplay text={t('info.founding_year')} endCount={2020} showPlusSign={false} inView={inView} unit="" />
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                            <div style={{ width: '200px' }} className="text-start">
                                <CounterDisplay text={t('info.delivery_companies')} endCount={50} inView={inView} unit="" />
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center g-4 mt-2">
                        <div className="col-md-4 d-flex justify-content-center">
                            <div style={{ width: '200px' }} className="text-start">
                                <CounterDisplay text={t('info.growth_rate')} endCount={325} showPlusSign={false} inView={inView} unit="%" />
                            </div>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                            {/* 빈 공간 혹은 추가 수치 */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;