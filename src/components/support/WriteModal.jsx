// WriteModal.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const EMAIL_DOMAINS = [
    'gmail.com','naver.com','daum.net','kakao.com','hotmail.com','outlook.com','icloud.com'
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeSpaces(s='') { return s.replace(/\s+/g, ' ').trim(); }
function onlyDigits(s='') { return s.replace(/\D/g, ''); }
function fmtPhone(digits) {
    const num = onlyDigits(digits).slice(0, 11);
    if (num.length <= 3) return num;
    if (num.length <= 7) return `${num.slice(0,3)}-${num.slice(3)}`;
    return `${num.slice(0,3)}-${num.slice(3,7)}-${num.slice(7)}`;
}
function passwordRule(pw='') {
    const lenOk = pw.length >= 8 && pw.length <= 20;
    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasDigit = /\d/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);
    const passed =
        lenOk &&
        hasUpper &&
        hasLower &&
        hasDigit &&
        hasSpecial;

    return {
        lenOk,
        hasUpper,
        hasLower,
        hasDigit,
        hasSpecial,
        passed
    };
}
function strengthScore(pw = '') {
    const r = passwordRule(pw);
    const raw =
        (r.lenOk ? 1 : 0) +
        (r.hasUpper ? 1 : 0) +
        (r.hasLower ? 1 : 0) +
        (r.hasDigit ? 1 : 0) +
        (r.hasSpecial ? 1 : 0);
    return Math.floor((raw / 5) * 4);
}

export default function WriteModal({ isOpen, onClose, onSuccess }) {
    const { t } = useTranslation();
    // 필드 (초기값 빈 문자열로 설정)
    const [product, setProduct] = useState('ReportExpress Enterprise');
    const [company, setCompany] = useState('');
    const [emailLocal, setEmailLocal] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [agree, setAgree] = useState(false);

    // 상태
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
            setProduct('ReportExpress Enterprise');
            setCompany(''); setEmailLocal(''); setEmailDomain('');
            setPhone(''); setPassword(''); setPasswordConfirm('');
            setTitle(''); setContent('');
            setAgree(false);
            setTouched({}); setErrors({});
        }
    }, [isOpen]);

    const validate = () => {
        const e = {};
        // 필수값
        if (!product) e.product = t('support.modal.errors.product');
        if (!company.trim()) e.company = t('support.modal.errors.company');
        if (!emailCombined.trim()) e.email = t('support.modal.errors.email');
        if (!phone.trim()) e.phone = t('support.modal.errors.phone');
        if (!password) e.password = t('support.modal.errors.password');
        if (!passwordConfirm) e.passwordConfirm = t('support.modal.errors.password_confirm');
        if (!title.trim()) e.title = t('support.modal.errors.title');
        if (!content.trim()) e.content = t('support.modal.errors.content');
        if (!agree) e.agree = t('support.modal.errors.agree');

        // 이메일 형식
        if (emailCombined && !emailRegex.test(emailCombined)) {
            e.email = t('support.modal.errors.email_invalid');
        }

        // 휴대폰: 10~11자리
        const digits = onlyDigits(phone);
        if (digits.length < 10 || digits.length > 11) {
            e.phone = t('support.modal.errors.phone_invalid');
        }

        // 비밀번호 규칙
        const pw = passwordRule(password);
        if (password && !pw.passed) {
            e.password = t('support.modal.password_rule');
        }

        if (passwordConfirm && password !== passwordConfirm) {
            e.passwordConfirm = t('support.modal.password_mismatch');
        }

        setErrors(e);
        return e;
    };

    // 핸들러
    const onCompanyChange = (v) => setCompany(normalizeSpaces(v));
    const onEmailLocalChange = (v) => setEmailLocal(v.replace(/[^a-zA-Z0-9]/g, ''));
    const onEmailDomainChange = (v) => setEmailDomain(v.replace(/\s/g, ''));
    const onPhoneChange = (v) => setPhone(fmtPhone(v));

    const preventNonDigitPasteDrop = (ev) => {
        const text = (ev.clipboardData || ev.dataTransfer)?.getData('text') ?? '';
        if (/\D/.test(text)) ev.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({
            product: true, company: true, email: true, phone: true, password: true, passwordConfirm: true,
            title: true, content: true, agree: true,
        });
        const eMap = validate();
        if (Object.keys(eMap).length > 0) return;

        try {
            await axios.post('/api/posts', {
                author: company,
                password,
                title,
                content,
            });
            onSuccess?.();
            onClose?.();
        } catch (error) {
            console.error('Error submitting post:', error);
            alert(t('support.modal.errors.fail_submit'));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="password-modal-overlay" role="dialog" aria-modal="true">
            <div className="password-modal wide">
                {/* ── 상단 타이틀 영역 (CM Innovation 스타일) ── */}
                <div className="modal-header-cm">
                    <div className="badge">{t('support.banner_title')}</div>
                    <h2 className="title">
                        {t('support.modal.write_title')}
                    </h2>
                    <p className="subtitle">{t('support.modal.write_subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    {/* 브라우저 자동완성 차단용 더미 */}
                    <input type="text" style={{ display: 'none' }} />
                    <input type="password" style={{ display: 'none' }} />

                    {/* 1) 제품 선택 */}
                    <label className="fm-label">{t('support.modal.product_select')} <span className="req">*</span></label>
                    <select
                        className={`fm-input ${touched.product && errors.product ? 'error' : ''}`}
                        value={product}
                        onChange={(e)=>setProduct(e.target.value)}
                        onBlur={()=>{ setTouched(t=>({...t,product:true})); validate(); }}
                        required
                        autoComplete="off"
                    >
                        <option>{t('support.modal.product_options.report_express')}</option>
                        <option>{t('support.modal.product_options.rx_cert')}</option>
                        <option>{t('support.modal.product_options.rx_loan')}</option>
                        <option>{t('support.modal.product_options.etc')}</option>
                    </select>
                    {touched.product && errors.product && <p className="err-txt">{errors.product}</p>}

                    {/* 2) 회사명 + 이메일 */}
                    <div className="grid-2">
                        <div>
                            <label className="fm-label">{t('support.modal.company')} <span className="req">*</span></label>
                            <input
                                type="text"
                                className={touched.company && errors.company ? 'error' : ''}
                                placeholder={t('support.modal.company_placeholder')}
                                value={company}
                                onChange={(e)=>onCompanyChange(e.target.value)}
                                onBlur={()=>{ setTouched(t=>({...t,company:true})); validate(); }}
                                required
                                autoComplete="off"
                            />
                            {touched.company && errors.company && <p className="err-txt">{errors.company}</p>}
                        </div>

                        <div>
                            <label className="fm-label">{t('support.modal.email')} <span className="req">*</span></label>
                            <div className={`row-2 ${touched.email && errors.email ? 'error' : ''}`}>
                                <input
                                    type="text"
                                    placeholder={t('support.modal.email_id')}
                                    value={emailLocal}
                                    onChange={(e)=>onEmailLocalChange(e.target.value)}
                                    onBlur={()=>{ setTouched(t=>({...t,email:true})); validate(); }}
                                    required
                                    autoComplete="off"
                                />
                                <span className="at">@</span>
                                <select
                                    value={emailDomain}
                                    onChange={(e)=>onEmailDomainChange(e.target.value)}
                                    onBlur={()=>{ setTouched(t=>({...t,email:true})); validate(); }}
                                    required
                                    className={emailDomain ? '' : 'placeholder'}
                                    autoComplete="off"
                                >
                                    <option value="" disabled hidden>{t('support.modal.email_domain')}</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="kakao.com">kakao.com</option>
                                </select>
                            </div>
                            {touched.email && errors.email && <p className="err-txt">{errors.email}</p>}
                        </div>
                    </div>

                    {/* 3) 휴대폰번호 + 비밀번호 */}
                    <div className="grid-2">
                        <div>
                            <label className="fm-label">{t('support.modal.phone')} <span className="req">*</span></label>
                            <input
                                inputMode="numeric"
                                className={touched.phone && errors.phone ? 'error' : ''}
                                placeholder={t('support.modal.phone_placeholder')}
                                value={phone}
                                onChange={(e)=>onPhoneChange(e.target.value)}
                                onPaste={preventNonDigitPasteDrop}
                                onDrop={preventNonDigitPasteDrop}
                                onBlur={()=>{ setTouched(t=>({...t,phone:true})); validate(); }}
                                required
                                autoComplete="one-time-code"
                            />
                            {touched.phone && errors.phone && <p className="err-txt">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="fm-label">{t('support.modal.password')} <span className="req">*</span></label>
                            <input
                                type="password"
                                className={touched.password && errors.password ? 'error' : ''}
                                placeholder={t('support.modal.password_placeholder')}
                                value={password}
                                onChange={(e)=>{ setPassword(e.target.value); if(touched.password) validate(); if(touched.passwordConfirm) validate(); }}
                                onBlur={()=>{ setTouched(t=>({...t,password:true})); validate(); }}
                                required
                                autoComplete="new-password"
                            />
                            <input
                                type="password"
                                className={touched.passwordConfirm && errors.passwordConfirm ? 'error' : ''}
                                placeholder={t('support.modal.password_confirm')}
                                value={passwordConfirm}
                                onChange={(e)=>{ setPasswordConfirm(e.target.value); if(touched.passwordConfirm) validate(); }}
                                onBlur={()=>{ setTouched(t=>({...t,passwordConfirm:true})); validate(); }}
                                required
                                autoComplete="new-password"
                            />
                            {touched.passwordConfirm && errors.passwordConfirm && <p className="err-txt">{errors.passwordConfirm}</p>}

                            <div className="pw-checklist">
                                {(() => {
                                    const r = passwordRule(password);
                                    return (
                                        <>
                                            <span className={r.lenOk ? 'ok' : 'no'}>8~20자</span>
                                            <span className={r.hasUpper ? 'ok' : 'no'}>대문자</span>
                                            <span className={r.hasLower ? 'ok' : 'no'}>소문자</span>
                                            <span className={r.hasDigit ? 'ok' : 'no'}>숫자</span>
                                            <span className={r.hasSpecial ? 'ok' : 'no'}>특수문자</span>
                                        </>
                                    );
                                })()}
                            </div>
                            <div className={`pw-strength s${pwStrength}`}>
                                <div className="bar" />
                            </div>
                            {touched.password && errors.password && <p className="err-txt">{errors.password}</p>}
                        </div>
                    </div>

                    {/* 4) 제목 + 내용 */}
                    <label className="fm-label">{t('support.modal.title')} <span className="req">*</span></label>
                    <input
                        type="text"
                        className={touched.title && errors.title ? 'error' : ''}
                        placeholder={t('support.modal.title_placeholder')}
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        onBlur={()=>{ setTouched(t=>({...t,title:true})); validate(); }}
                        required
                    />
                    {touched.title && errors.title && <p className="err-txt">{errors.title}</p>}

                    <label className="fm-label">{t('support.modal.content')} <span className="req">*</span></label>
                    <textarea
                        className={touched.content && errors.content ? 'error' : ''}
                        placeholder={t('support.modal.content_placeholder')}
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                        onBlur={()=>{ setTouched(t=>({...t,content:true})); validate(); }}
                        required
                    />
                    {touched.content && errors.content && <p className="err-txt">{errors.content}</p>}

                    {/* 5) 개인정보 수집·이용 동의 (CM 네이비 스타일 + 펼침/접기) */}
                    <div className={`privacy-panel open`}>
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
                                <p>{t('support.modal.privacy_policy.section1_content').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>

                                <h4>{t('support.modal.privacy_policy.section2_title')}</h4>
                                <p>{t('support.modal.privacy_policy.section2_content').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>

                                <h4>{t('support.modal.privacy_policy.section3_title')}</h4>
                                <p>{t('support.modal.privacy_policy.section3_content').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>

                                <h4>{t('support.modal.privacy_policy.section4_title')}</h4>
                                <p>{t('support.modal.privacy_policy.section4_content')}</p>

                                <h4>{t('support.modal.privacy_policy.section9_title')}</h4>
                                <p>{t('support.modal.privacy_policy.section9_content').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>
                            </div>
                        </div>

                        <label className="agree-check">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e)=>{ setAgree(e.target.checked); if(touched.agree) validate(); }}
                                onBlur={()=>{ setTouched(t=>({...t,agree:true})); validate(); }}
                                required
                            />
                            <span className="agree-text">{t('support.modal.agree')}</span>
                            <span className="req">*</span>
                        </label>
                    </div>
                    {touched.agree && errors.agree && <p className="err-txt">{errors.agree}</p>}

                    {/* 액션 버튼 */}
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>{t('support.editor.cancel')}</button>
                        <button type="submit" className="submit-btn">{t('support.write_btn')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
