// WriteModal.jsx
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const EMAIL_DOMAINS = [
    'gmail.com','naver.com','daum.net','kakao.com','hotmail.com','outlook.com','icloud.com'
];

const nameRegex = /^[A-Za-z가-힣]+(?:\s+[A-Za-z가-힣]+)*$/; // (레거시) 필요 시 회사명과 구분
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

    // 길이 1점 + (대/소/숫자/특수) 최대 4점 = 최대 5점
    const raw =
        (r.lenOk ? 1 : 0) +
        (r.hasUpper ? 1 : 0) +
        (r.hasLower ? 1 : 0) +
        (r.hasDigit ? 1 : 0) +
        (r.hasSpecial ? 1 : 0);

    // raw: 0~5  →  score: 0~4로 변환
    // 0 ->0, 1->1, 2->2, 3->3, 4~5->4
    return Math.floor((raw / 5) * 4);
}

export default function WriteModal({ isOpen, onClose, onSuccess }) {
    // 필드 (요청 순서에 맞춤)
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
        if (!product) e.product = '제품을 선택하세요.';
        if (!company.trim()) e.company = '회사명을 입력하세요.';
        if (!emailCombined.trim()) e.email = '이메일을 입력하세요.';
        if (!phone.trim()) e.phone = '휴대폰 번호를 입력하세요.';
        if (!password) e.password = '비밀번호를 입력하세요.';
        if (!passwordConfirm) e.passwordConfirm = '비밀번호 확인을 입력하세요.';
        if (!title.trim()) e.title = '제목을 입력하세요.';
        if (!content.trim()) e.content = '내용을 입력하세요.';
        if (!agree) e.agree = '개인정보 수집·이용에 동의가 필요합니다.';

        // 이메일 형식
        if (emailCombined && !emailRegex.test(emailCombined)) {
            e.email = '올바른 이메일 형식이 아닙니다.';
        }

        // 휴대폰: 10~11자리
        const digits = onlyDigits(phone);
        if (digits.length < 10 || digits.length > 11) {
            e.phone = '휴대폰 번호(10~11자리)를 정확히 입력하세요.';
        }

        // 비밀번호 규칙
        const pw = passwordRule(password);
        if (password && !pw.passed) {
            e.password = '8~20자, 대/소문자/숫자/특수문자를 각각 1개 이상 포함해야 합니다.';
        }

        if (passwordConfirm && password !== passwordConfirm) {
            e.passwordConfirm = '비밀번호가 일치하지 않습니다.';
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
            alert('게시글 작성에 실패했습니다.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="password-modal-overlay" role="dialog" aria-modal="true">
            <div className="password-modal wide">
                {/* ── 상단 타이틀 영역 (CM Innovation 스타일) ── */}
                <div className="modal-header-cm">
                    <div className="badge">고객센터</div>
                    <h2 className="title">
                        문의하기
                    </h2>
                    <p className="subtitle">제품/유지보수/도입 상담 등 문의 내용을 남겨주세요. 담당자가 신속히 답변드립니다.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {/* 1) 제품 선택 */}
                    <label className="fm-label">제품 선택 <span className="req">*</span></label>
                    <select
                        className={`fm-input ${touched.product && errors.product ? 'error' : ''}`}
                        value={product}
                        onChange={(e)=>setProduct(e.target.value)}
                        onBlur={()=>{ setTouched(t=>({...t,product:true})); validate(); }}
                        required
                    >
                        <option>ReportExpress Enterprise</option>
                        <option>RX-Cert (증명서·위변조방지)</option>
                        <option>RX-Loan (여신약정)</option>
                        <option>기타/협업 문의</option>
                    </select>
                    {touched.product && errors.product && <p className="err-txt">{errors.product}</p>}

                    {/* 2) 회사명 + 이메일 */}
                    <div className="grid-2">
                        <div>
                            <label className="fm-label">회사명 <span className="req">*</span></label>
                            <input
                                type="text"
                                className={touched.company && errors.company ? 'error' : ''}
                                placeholder="예: 씨엠이노베이션"
                                value={company}
                                onChange={(e)=>onCompanyChange(e.target.value)}
                                onBlur={()=>{ setTouched(t=>({...t,company:true})); validate(); }}
                                required
                            />
                            {touched.company && errors.company && <p className="err-txt">{errors.company}</p>}
                        </div>

                        <div>
                            <label className="fm-label">이메일 <span className="req">*</span></label>
                            <div className={`row-2 ${touched.email && errors.email ? 'error' : ''}`}>
                                <input
                                    type="text"
                                    placeholder="아이디"
                                    value={emailLocal}
                                    onChange={(e)=>onEmailLocalChange(e.target.value)}
                                    onBlur={()=>{ setTouched(t=>({...t,email:true})); validate(); }}
                                    required
                                />
                                <span className="at">@</span>
                                <select
                                    value={emailDomain}
                                    onChange={(e)=>onEmailDomainChange(e.target.value)}
                                    onBlur={()=>{ setTouched(t=>({...t,email:true})); validate(); }}
                                    required
                                    className={emailDomain ? '' : 'placeholder'}
                                >
                                    <option value="" disabled hidden>도메인 선택</option>
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
                            <label className="fm-label">휴대폰 번호 <span className="req">*</span></label>
                            <input
                                inputMode="numeric"
                                className={touched.phone && errors.phone ? 'error' : ''}
                                placeholder="010-1234-5678"
                                value={phone}
                                onChange={(e)=>onPhoneChange(e.target.value)}
                                onPaste={preventNonDigitPasteDrop}
                                onDrop={preventNonDigitPasteDrop}
                                onBlur={()=>{ setTouched(t=>({...t,phone:true})); validate(); }}
                                required
                            />
                            {touched.phone && errors.phone && <p className="err-txt">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="fm-label">비밀번호 <span className="req">*</span></label>
                            <input
                                type="password"
                                className={touched.password && errors.password ? 'error' : ''}
                                placeholder="8~20자, 2종 이상 조합"
                                value={password}
                                onChange={(e)=>{ setPassword(e.target.value); if(touched.password) validate(); if(touched.passwordConfirm) validate(); }}
                                onBlur={()=>{ setTouched(t=>({...t,password:true})); validate(); }}
                                required
                            />
                            <input
                                type="password"
                                className={touched.passwordConfirm && errors.passwordConfirm ? 'error' : ''}
                                placeholder="비밀번호 확인"
                                value={passwordConfirm}
                                onChange={(e)=>{ setPasswordConfirm(e.target.value); if(touched.passwordConfirm) validate(); }}
                                onBlur={()=>{ setTouched(t=>({...t,passwordConfirm:true})); validate(); }}
                                required
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
                    <label className="fm-label">제목 <span className="req">*</span></label>
                    <input
                        type="text"
                        className={touched.title && errors.title ? 'error' : ''}
                        placeholder="문의 제목을 입력하세요"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        onBlur={()=>{ setTouched(t=>({...t,title:true})); validate(); }}
                        required
                    />
                    {touched.title && errors.title && <p className="err-txt">{errors.title}</p>}

                    <label className="fm-label">내용 <span className="req">*</span></label>
                    <textarea
                        className={touched.content && errors.content ? 'error' : ''}
                        placeholder="문의 내용을 자세히 작성해주세요."
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
                                <strong>개인정보처리방침 (Privacy Policy)</strong>
                            </div>
                        </div>

                        <div className="privacy-body">
                            <div className="privacy-content">
                                <p><strong>씨엠이노베이션(주)(이하 ‘회사’라 합니다)</strong>는 「개인정보 보호법」 제30조에 따라 고객의 개인정보를 보호하고, 정보주체의 권익을 보장하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.</p>

                                <h4>1. 개인정보의 처리 목적</h4>
                                <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리한 개인정보는 다음 목적 외의 용도로는 이용되지 않습니다.</p>
                                <ul>
                                    <li>고객 문의 및 기술지원 서비스 응대</li>
                                    <li>계약 및 견적 요청, 유지보수 관리</li>
                                    <li>전자문서·인증·리포트 등 솔루션 관련 업무 처리</li>
                                    <li>홈페이지 서비스 제공 및 회원 관리</li>
                                </ul>

                                <h4>2. 처리하는 개인정보 항목</h4>
                                <p>회사는 서비스 이용을 위해 다음의 개인정보 항목을 처리할 수 있습니다.</p>
                                <ul>
                                    <li><strong>필수항목:</strong> 이름, 회사명, 직책, 이메일, 연락처</li>
                                    <li><strong>선택항목:</strong> 서비스 이용 기록, 접속 로그, 쿠키, IP 주소 등</li>
                                </ul>

                                <h4>3. 개인정보의 보유 및 이용기간</h4>
                                <p>회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만, 관련 법령에 따라 일정 기간 보관이 필요한 경우에는 다음과 같이 보유합니다.</p>
                                <ul>
                                    <li>계약 및 거래 관련 기록: 5년 (전자상거래법 등)</li>
                                    <li>서비스 이용 관련 기록: 3년 (통신비밀보호법 등)</li>
                                </ul>

                                <h4>4. 개인정보의 제3자 제공</h4>
                                <p>회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우 예외로 합니다.</p>
                                <ul>
                                    <li>정보주체의 사전 동의가 있는 경우</li>
                                    <li>법률에 특별한 규정이 있는 경우</li>
                                </ul>

                                <h4>5. 개인정보의 처리 위탁</h4>
                                <p>회사는 서비스 제공을 위해 일부 업무를 외부 전문업체에 위탁할 수 있으며, 위탁 시 개인정보보호법에 따라 안전하게 관리됩니다. (현재 위탁 내역이 있는 경우, 업체명 및 위탁업무 기재)</p>

                                <h4>6. 정보주체의 권리·의무 및 행사 방법</h4>
                                <p>이용자는 언제든지 개인정보 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다. 서면, 이메일 또는 전화 등으로 요청하시면 지체 없이 조치합니다.</p>

                                <h4>7. 개인정보의 파기 절차 및 방법</h4>
                                <ul>
                                    <li><strong>파기절차:</strong> 내부 방침 및 관련 법령에 따라 안전하게 삭제</li>
                                    <li><strong>파기방법:</strong> 전자파일은 복구 불가능한 기술적 방법으로 삭제, 인쇄물은 파쇄</li>
                                </ul>

                                <h4>8. 개인정보 보호를 위한 기술적·관리적 대책</h4>
                                <ul>
                                    <li>개인정보 접근권한 최소화</li>
                                    <li>접근통제시스템 및 암호화 적용</li>
                                    <li>보안 프로그램의 주기적 점검 및 업데이트</li>
                                    <li>내부관리계획 수립 및 정기 교육 시행</li>
                                </ul>

                                <h4>9. 개인정보 보호책임자</h4>
                                <p><strong>개인정보 보호책임자:</strong> 유지훈 상무 <br/>
                                    <strong>전화번호:</strong> 02-6949-4170<br/>
                                    <strong>이메일:</strong> support@cminnovation.co.kr</p>

                                <h4>10. 개인정보 처리방침의 변경</h4>
                                <p>이 개인정보처리방침은 <strong>2020년 1월 1일</strong>부터 적용됩니다. 법령 또는 정책 변경에 따라 내용이 수정될 경우, 홈페이지를 통해 공지합니다.</p>
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
                            <span className="agree-text">개인정보처리방침을 확인하였으며, 수집·이용에 동의합니다.</span>
                            <span className="req">*</span>
                        </label>
                    </div>
                    {touched.agree && errors.agree && <p className="err-txt">{errors.agree}</p>}

                    {/* 액션 버튼 */}
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
                        <button type="submit" className="submit-btn">문의하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
