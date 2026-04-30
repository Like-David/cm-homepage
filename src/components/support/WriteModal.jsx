import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import reportImg from '@/assets/images/Index/Solutions/RX-eForm.png';
import rxCertImg from '@/assets/images/Index/Solutions/RX-Cert.png';
import rxLoanImg from '@/assets/images/Index/Solutions/Rx-Loan.png';

const EMAIL_DOMAINS = ['naver.com', 'gmail.com', 'daum.net', 'kakao.com'];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordRule(pw = '') {
    const lenOk = pw.length >= 8 && pw.length <= 20;
    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasDigit = /\d/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);
    return { lenOk, hasLower, hasUpper, hasDigit, hasSpecial, passed: lenOk && hasLower && hasUpper && hasDigit && hasSpecial };
}
function strengthScore(pw = '') {
    const r = passwordRule(pw);
    const raw = [r.lenOk, r.hasUpper, r.hasLower, r.hasDigit, r.hasSpecial].filter(Boolean).length;
    return Math.floor((raw / 5) * 4);
}

const PRODUCTS = [
    {
        id: 'report',
        name: 'ReportExpress Enterprise',
        summary: '전자문서 생성부터 보관까지 관리하는 All-in-one 리포팅 솔루션',
        tags: ['HTML5', 'Non-ActiveX', 'PKI 전자서명', '타임스탬프'],
        img: reportImg,
    },
    {
        id: 'rxcert',
        name: 'RX Cert',
        summary: '2D 고밀도 바코드·QR 기반 증명서 위·변조 방지 솔루션',
        tags: ['2D Barcode', '원본확인 QR', '보안 워터마크'],
        img: rxCertImg,
    },
    {
        id: 'rxloan',
        name: 'RX Loan',
        summary: '금융권 여신약정에 특화된 웹리포팅 솔루션',
        tags: ['Multi-platform', 'JS 스크립트', '120여 종 차트'],
        img: rxLoanImg,
    },
];

const CATEGORIES = [
    { id: 'intro', label: '도입 문의', desc: '솔루션 도입 상담 및 견적' },
    { id: 'error', label: '오류 · 기술지원', desc: '기능 오류, 설치 문제 등' },
    { id: 'howto', label: '사용법 문의', desc: '기능 사용 방법 안내' },
];

const ERROR_SUBS = [
    { id: 'install', label: '설치 및 환경 설정', desc: '서버 설치, 라이선스 인증, Java/Node.js 버전 충돌 등' },
    { id: 'runtime', label: '실행 및 기능 오류', desc: '메뉴 미작동, 데이터 조회 실패, API 통신 오류 등' },
    { id: 'output', label: '출력 및 리포트 오류', desc: 'PDF 생성 실패, 바코드 인식 불량, 폰트 깨짐 등' },
    { id: 'security', label: '보안 및 인증 오류', desc: '전자서명 실패, 타임스탬프 연동 오류, 위변조 검증 실패 등' },
];

const PLACEHOLDERS = {
    intro: (name) =>
        `[${name} — 도입 문의]\n\n도입 배경 및 목적:\n검토 중인 주요 기능:\n예상 도입 규모 및 시스템 환경:\n기타 문의사항:`,
    howto: (name) =>
        `[${name} — 사용법 문의]\n\n문의 기능 또는 메뉴:\n현재 시도한 방법:\n관련 오류 메시지 (있는 경우):\n기타 문의사항:`,
    error_install: (name) =>
        `[${name} — 설치 및 환경 설정 오류]\n\n서버 OS 및 버전:\nJava / Node.js 버전:\n오류 메시지 또는 증상:\n발생 시점 (설치 중 / 설치 후 등):`,
    error_runtime: (name) =>
        `[${name} — 실행 및 기능 오류]\n\n오류 발생 메뉴 / 기능:\n재현 방법 (단계별):\n오류 메시지 또는 콘솔 로그:\n발생 빈도 (항상 / 간헐적):`,
    error_output: (name) =>
        `[${name} — 출력 및 리포트 오류]\n\n오류 유형 (PDF / 바코드 / 폰트 / 레이아웃):\n발생 환경 (브라우저, OS):\n스크린샷 첨부 여부:\n기타 증상:`,
    error_security: (name) =>
        `[${name} — 보안 및 인증 오류]\n\n오류 유형 (전자서명 / 타임스탬프 / 위변조):\n연동 시스템 및 환경:\n오류 코드 또는 메시지:\n발생 시점:`,
    general: () =>
        `[기타 문의]\n\n문의 유형 (채용 / 제휴 / 일반 기업 정보 등):\n\n문의 내용을 자세히 입력해주세요:`,
};

function getPlaceholder(inquiryType, product, category, errorSub) {
    if (inquiryType === 'general') return PLACEHOLDERS.general();
    const name = product?.name || '제품';
    if (category === 'intro') return PLACEHOLDERS.intro(name);
    if (category === 'howto') return PLACEHOLDERS.howto(name);
    if (category === 'error' && errorSub) {
        const fn = PLACEHOLDERS[`error_${errorSub}`];
        return fn ? fn(name) : PLACEHOLDERS.general();
    }
    return `[${name} 문의]\n\n문의 내용을 자세히 입력해주세요.`;
}

const GUIDE_ITEMS = {
    intro: {
        color: 'blue',
        items: ['도입 배경 및 목적', '검토 중인 주요 기능', '예상 도입 규모 (사용자 수, 서버 수 등)', '현재 시스템 환경 (OS, WAS, DB 등)', '예상 도입 일정'],
    },
    howto: {
        color: 'blue',
        items: ['문의하시는 기능 또는 메뉴 이름', '현재 시도하신 방법', '관련 오류 메시지 (있는 경우)', '사용 중인 제품 버전 및 환경'],
    },
    error_install: {
        color: 'orange',
        items: ['서버 OS 및 버전 (예: Windows Server 2019)', 'Java / Node.js 버전', '오류 메시지 또는 증상 (스크린샷 첨부 시 좋음)', '발생 시점 (설치 중 / 설치 후 최초 실행 등)', '라이선스 인증 여부'],
    },
    error_runtime: {
        color: 'orange',
        items: ['오류가 발생하는 메뉴 또는 기능명', '재현 방법 (단계별 순서)', '오류 메시지 또는 브라우저 콘솔 로그', '발생 빈도 (항상 / 간헐적)', '최근 업데이트 또는 환경 변경 이력'],
    },
    error_output: {
        color: 'orange',
        items: ['오류 유형 (PDF 생성 실패 / 바코드 불량 / 폰트 깨짐 / 레이아웃)', '발생 환경 (브라우저 및 버전, OS)', '스크린샷 또는 샘플 파일 첨부 가능 여부', '정상 출력되는 환경이 있다면 비교 정보'],
    },
    error_security: {
        color: 'orange',
        items: ['오류 유형 (전자서명 실패 / 타임스탬프 오류 / 위변조 검증 실패)', '연동 시스템 및 인증 기관 환경', '오류 코드 또는 메시지', '발생 시점 및 재현 조건'],
    },
    general: {
        color: 'green',
        items: ['문의 유형 (채용 / 제휴 / 일반 문의 등)', '요청 사항 또는 제안 내용', '연락 가능한 시간 또는 방법'],
    },
};

function getGuideKey(inquiryType, category, errorSub) {
    if (inquiryType === 'general') return 'general';
    if (category === 'intro') return 'intro';
    if (category === 'howto') return 'howto';
    if (category === 'error' && errorSub) return `error_${errorSub}`;
    return null;
}

function CategoryIcon({ id }) {
    if (id === 'intro') return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
    );
    if (id === 'error') return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
    if (id === 'howto') return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    );
    return null;
}

export default function WriteModal({ isOpen, onClose, onSuccess }) {
    const { t } = useTranslation();

    const [step, setStep] = useState(1);
    const [inquiryType, setInquiryType] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [errorSub, setErrorSub] = useState(null);

    const [emailLocal, setEmailLocal] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [agree, setAgree] = useState(false);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const emailCombined = useMemo(() => {
        const local = emailLocal.trim();
        const domain = emailDomain.trim();
        if (!local && !domain) return '';
        if (local && domain) return `${local}@${domain}`;
        return local;
    }, [emailLocal, emailDomain]);

    const pwStrength = strengthScore(password);

    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setInquiryType(null); setSelectedProduct(null);
            setCategory(null); setErrorSub(null);
            setEmailLocal(''); setEmailDomain('');
            setPassword(''); setPasswordConfirm('');
            setTitle(''); setContent('');
            setAgree(false); setTouched({}); setErrors({});
        }
    }, [isOpen]);

    const validate = () => {
        const e = {};
        if (!emailCombined.trim()) e.email = t('support.modal.errors.email');
        else if (!emailRegex.test(emailCombined)) e.email = t('support.modal.errors.email_invalid');
        if (!password) e.password = t('support.modal.errors.password');
        else if (!passwordRule(password).passed) e.password = t('support.modal.password_rule');
        if (!passwordConfirm) e.passwordConfirm = t('support.modal.errors.password_confirm');
        else if (password !== passwordConfirm) e.passwordConfirm = t('support.modal.password_mismatch');
        if (!title.trim()) e.title = t('support.modal.errors.title');
        if (!content.trim()) e.content = t('support.modal.errors.content');
        if (!agree) e.agree = t('support.modal.errors.agree');
        setErrors(e);
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ email: true, password: true, passwordConfirm: true, title: true, content: true, agree: true });
        if (Object.keys(validate()).length > 0) return;
        try {
            await axios.post('/api/posts', {
                author: emailCombined,
                password, title, content,
            });
            onSuccess?.();
            onClose?.();
        } catch {
            alert(t('support.modal.errors.fail_submit'));
        }
    };

    const handleOptionSelect = (type) => {
        setInquiryType(type);
        setStep(type === 'product' ? 2 : 4);
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setStep(3);
    };

    const canProceedPhase3 = category && (category !== 'error' || errorSub);

    const goBack = () => {
        if (step === 2) { setStep(1); setSelectedProduct(null); }
        else if (step === 3) { setStep(2); setCategory(null); setErrorSub(null); }
        else if (step === 4 && inquiryType === 'product') setStep(3);
        else if (step === 4 && inquiryType === 'general') setStep(1);
    };

    const totalSteps = inquiryType === 'general' ? 2 : 4;
    const currentStepIdx = inquiryType === 'general'
        ? (step === 1 ? 0 : 1)
        : step - 1;

    if (!isOpen) return null;

    const emailField = (
        <div>
            <label className="fm-label">{t('support.modal.email')} <span className="req">*</span></label>
            <div className={`row-2 ${touched.email && errors.email ? 'error' : ''}`}>
                <input
                    type="text"
                    placeholder={t('support.modal.email_id')}
                    value={emailLocal}
                    onChange={e => setEmailLocal(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                    onBlur={() => { setTouched(p => ({ ...p, email: true })); validate(); }}
                    autoComplete="off"
                />
                <span className="at">@</span>
                <select
                    value={emailDomain}
                    onChange={e => setEmailDomain(e.target.value)}
                    onBlur={() => { setTouched(p => ({ ...p, email: true })); validate(); }}
                    className={emailDomain ? '' : 'placeholder'}
                    autoComplete="off"
                >
                    <option value="" disabled hidden>{t('support.modal.email_domain')}</option>
                    {EMAIL_DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
            {touched.email && errors.email && <p className="err-txt">{errors.email}</p>}
        </div>
    );

    const passwordField = (
        <div>
            <label className="fm-label">{t('support.modal.password')} <span className="req">*</span></label>
            <input
                type="password"
                className={touched.password && errors.password ? 'error' : ''}
                placeholder={t('support.modal.password_placeholder')}
                value={password}
                onChange={e => { setPassword(e.target.value); if (touched.password) validate(); if (touched.passwordConfirm) validate(); }}
                onBlur={() => { setTouched(p => ({ ...p, password: true })); validate(); }}
                autoComplete="new-password"
            />
            <input
                type="password"
                className={touched.passwordConfirm && errors.passwordConfirm ? 'error' : ''}
                placeholder={t('support.modal.password_confirm')}
                value={passwordConfirm}
                onChange={e => { setPasswordConfirm(e.target.value); if (touched.passwordConfirm) validate(); }}
                onBlur={() => { setTouched(p => ({ ...p, passwordConfirm: true })); validate(); }}
                autoComplete="new-password"
            />
            {touched.passwordConfirm && errors.passwordConfirm && <p className="err-txt">{errors.passwordConfirm}</p>}
            <div className="pw-checklist">
                {(() => {
                    const r = passwordRule(password);
                    return (<>
                        <span className={r.lenOk ? 'ok' : 'no'}>8~20자</span>
                        <span className={r.hasUpper ? 'ok' : 'no'}>대문자</span>
                        <span className={r.hasLower ? 'ok' : 'no'}>소문자</span>
                        <span className={r.hasDigit ? 'ok' : 'no'}>숫자</span>
                        <span className={r.hasSpecial ? 'ok' : 'no'}>특수문자</span>
                    </>);
                })()}
            </div>
            <div className={`pw-strength s${pwStrength}`}><div className="bar" /></div>
            {touched.password && errors.password && <p className="err-txt">{errors.password}</p>}
        </div>
    );

    return (
        <div className="password-modal-overlay" role="dialog" aria-modal="true">
            <div className="password-modal wide wm-modal">

                {/* Header */}
                <div className="modal-header-cm wm-header">
                    <div className="wm-header-nav">
                        {step > 1 && (
                            <button type="button" className="wm-back-btn" onClick={goBack}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                                뒤로
                            </button>
                        )}
                        <button type="button" className="wm-close-btn" onClick={onClose} aria-label="닫기">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <div className="badge">Customer Support</div>
                    <h2 className="title">
                        {step === 1 && '문의하기'}
                        {step === 2 && '제품 선택'}
                        {step === 3 && '문의 유형 선택'}
                        {step === 4 && '문의 내용 입력'}
                    </h2>
                    <p className="subtitle">
                        {step === 1 && '어떤 유형의 문의가 필요하신가요?'}
                        {step === 2 && '문의하실 제품을 선택해주세요.'}
                        {step === 3 && selectedProduct?.name}
                        {step === 4 && (inquiryType === 'general'
                            ? '기타 문의'
                            : [selectedProduct?.name, CATEGORIES.find(c => c.id === category)?.label, ERROR_SUBS.find(s => s.id === errorSub)?.label].filter(Boolean).join(' › ')
                        )}
                    </p>

                    {/* Step dots */}
                    <div className="wm-stepdots">
                        {Array.from({ length: totalSteps }).map((_, i) => (
                            <span key={i} className={`wm-dot ${i < currentStepIdx ? 'done' : i === currentStepIdx ? 'active' : ''}`} />
                        ))}
                    </div>
                </div>

                {/* Scrollable body */}
                <div className="wm-modal-body">

                    {/* ── Phase 1: Inquiry type ── */}
                    {step === 1 && (
                        <div className="wm-phase">
                            <div className="wm-option-grid">
                                <button type="button" className="wm-option-card" onClick={() => handleOptionSelect('product')}>
                                    <div className="wm-opt-icon">
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <h3>제품 관련 문의</h3>
                                    <p>솔루션 도입, 기술 오류, 사용법 등<br />제품과 관련된 모든 문의</p>
                                    <div className="wm-opt-chips">
                                        <span>도입 상담</span><span>기술지원</span><span>사용법</span>
                                    </div>
                                    <div className="wm-opt-arrow">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                                    </div>
                                </button>

                                <button type="button" className="wm-option-card wm-option-card--b" onClick={() => handleOptionSelect('general')}>
                                    <div className="wm-opt-icon wm-opt-icon--b">
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                    </div>
                                    <h3>기타 문의</h3>
                                    <p>채용, 제휴, 일반 기업 정보 등<br />제품 이외의 문의</p>
                                    <div className="wm-opt-chips">
                                        <span>채용</span><span>제휴</span><span>일반 문의</span>
                                    </div>
                                    <div className="wm-opt-arrow">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Phase 2: Product selection ── */}
                    {step === 2 && (
                        <div className="wm-phase">
                            <div className="wm-product-grid">
                                {PRODUCTS.map(product => (
                                    <button
                                        key={product.id}
                                        type="button"
                                        className={`wm-product-card ${selectedProduct?.id === product.id ? 'selected' : ''}`}
                                        onClick={() => handleProductSelect(product)}
                                    >
                                        <div className="wm-prod-img-wrap">
                                            <img src={product.img} alt={product.name} className="wm-prod-img" />
                                        </div>
                                        <div className="wm-prod-body">
                                            <h4 className="wm-prod-name">{product.name}</h4>
                                            <p className="wm-prod-summary">{product.summary}</p>
                                            <div className="wm-prod-tags">
                                                {product.tags.map(tag => <span key={tag}>{tag}</span>)}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Phase 3: Category + Error sub ── */}
                    {step === 3 && (
                        <div className="wm-phase">
                            <div className="wm-cat-block">
                                <p className="wm-block-label">문의 유형</p>
                                <div className="wm-cat-row">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            className={`wm-cat-btn ${category === cat.id ? 'active' : ''}`}
                                            onClick={() => { setCategory(cat.id); if (cat.id !== 'error') setErrorSub(null); }}
                                        >
                                            <span className="wm-cat-ico">
                                                <CategoryIcon id={cat.id} />
                                            </span>
                                            <span className="wm-cat-label-text">{cat.label}</span>
                                            <span className="wm-cat-desc">{cat.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {category === 'error' && (
                                <div className="wm-errorsub-block">
                                    <p className="wm-block-label">오류 세부 분류</p>
                                    <div className="wm-errorsub-grid">
                                        {ERROR_SUBS.map(sub => (
                                            <button
                                                key={sub.id}
                                                type="button"
                                                className={`wm-errorsub-btn ${errorSub === sub.id ? 'active' : ''}`}
                                                onClick={() => setErrorSub(sub.id)}
                                            >
                                                <span className="wm-esub-label">{sub.label}</span>
                                                <span className="wm-esub-desc">{sub.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="wm-phase-footer">
                                <button
                                    type="button"
                                    className="wm-next-btn"
                                    disabled={!canProceedPhase3}
                                    onClick={() => setStep(4)}
                                >
                                    다음 단계
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Phase 4: Form ── */}
                    {step === 4 && (
                        <form onSubmit={handleSubmit} noValidate autoComplete="off" className="wm-form">
                            <input type="text" style={{ display: 'none' }} />
                            <input type="password" style={{ display: 'none' }} />

                            {/* Context summary */}
                            {inquiryType === 'product' && (
                                <div className="wm-context-bar">
                                    <span className="wm-ctx-chip wm-ctx-product">{selectedProduct?.name}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                                    <span className="wm-ctx-chip">{CATEGORIES.find(c => c.id === category)?.label}</span>
                                    {errorSub && <>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                                        <span className="wm-ctx-chip">{ERROR_SUBS.find(s => s.id === errorSub)?.label}</span>
                                    </>}
                                </div>
                            )}

                            {emailField}
                            {passwordField}

                            {/* 제목 */}
                            <label className="fm-label">{t('support.modal.title')} <span className="req">*</span></label>
                            <input
                                type="text"
                                className={touched.title && errors.title ? 'error' : ''}
                                placeholder={t('support.modal.title_placeholder')}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                onBlur={() => { setTouched(p => ({ ...p, title: true })); validate(); }}
                            />
                            {touched.title && errors.title && <p className="err-txt">{errors.title}</p>}

                            {/* 내용 */}
                            <label className="fm-label">{t('support.modal.content')} <span className="req">*</span></label>

                            {/* 카테고리별 가이드 카드 */}
                            {(() => {
                                const key = getGuideKey(inquiryType, category, errorSub);
                                const guide = key && GUIDE_ITEMS[key];
                                if (!guide) return null;
                                return (
                                    <div className={`wm-guide-card wm-guide-card--${guide.color}`}>
                                        <div className="wm-guide-header">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                            </svg>
                                            <span>포함하면 좋은 정보</span>
                                        </div>
                                        <ul className="wm-guide-list">
                                            {guide.items.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                    </div>
                                );
                            })()}

                            <textarea
                                className={touched.content && errors.content ? 'error' : ''}
                                placeholder={getPlaceholder(inquiryType, selectedProduct, category, errorSub)}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                onBlur={() => { setTouched(p => ({ ...p, content: true })); validate(); }}
                            />
                            {touched.content && errors.content && <p className="err-txt">{errors.content}</p>}

                            {/* 개인정보처리방침 */}
                            <div className="privacy-panel open">
                                <div className="privacy-header">
                                    <div className="left">
                                        <span className="shield" aria-hidden>🛡️</span>
                                        <strong>{t('support.modal.privacy_policy.title')}</strong>
                                    </div>
                                </div>
                                <div className="privacy-body">
                                    <div className="privacy-content">
                                        <p>{t('support.modal.privacy_policy.summary')}</p>
                                        <h4>{t('support.modal.privacy_policy.section1_title')}</h4>
                                        <p>{t('support.modal.privacy_policy.section1_content').split('\n').map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}</p>
                                        <h4>{t('support.modal.privacy_policy.section2_title')}</h4>
                                        <p>{t('support.modal.privacy_policy.section2_content').split('\n').map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}</p>
                                        <h4>{t('support.modal.privacy_policy.section3_title')}</h4>
                                        <p>{t('support.modal.privacy_policy.section3_content').split('\n').map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}</p>
                                        <h4>{t('support.modal.privacy_policy.section4_title')}</h4>
                                        <p>{t('support.modal.privacy_policy.section4_content')}</p>
                                        <h4>{t('support.modal.privacy_policy.section9_title')}</h4>
                                        <p>{t('support.modal.privacy_policy.section9_content').split('\n').map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}</p>
                                    </div>
                                </div>
                                <label className="agree-check">
                                    <input
                                        type="checkbox"
                                        checked={agree}
                                        onChange={e => { setAgree(e.target.checked); if (touched.agree) validate(); }}
                                        onBlur={() => { setTouched(p => ({ ...p, agree: true })); validate(); }}
                                    />
                                    <span className="agree-text">{t('support.modal.agree')}</span>
                                    <span className="req">*</span>
                                </label>
                            </div>
                            {touched.agree && errors.agree && <p className="err-txt">{errors.agree}</p>}

                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={onClose}>{t('support.editor.cancel')}</button>
                                <button type="submit" className="submit-btn">{t('support.write_btn')}</button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}
