import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Banner from '@/components/common/Banner';

const BRAND = '#1C2D60';

function maskAccNo(accNo) {
    if (!accNo) return '';
    const parts = accNo.split('-');
    if (parts.length >= 2) {
        return parts[0] + '-' + '*'.repeat(parts[1].length) + '-' + parts.slice(2).join('-');
    }
    const visible = accNo.slice(0, 3);
    return visible + '*'.repeat(Math.max(0, accNo.length - 3));
}

function StatusBadge({ valid }) {
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
            background: valid ? '#e8edf8' : '#fee2e2',
            color: valid ? BRAND : '#dc2626',
        }}>
            {valid ? '● 유효' : '● 무효'}
        </span>
    );
}

function InfoRow({ label, value, mono }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f3f4f6', padding: '14px 0' }}>
            <span style={{ width: '110px', flexShrink: 0, fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>
                {label}
            </span>
            <span style={{
                fontSize: '14px', color: '#111827', fontWeight: 600,
                fontFamily: mono ? 'monospace' : undefined,
                letterSpacing: mono ? '0.04em' : undefined,
            }}>
                {value}
            </span>
        </div>
    );
}

function CertVerifyPage() {
    const [params] = useSearchParams();
    const id = params.get('id');
    const [status, setStatus] = useState('loading');
    const [cert, setCert] = useState(null);
    const [verifiedAt] = useState(new Date());

    useEffect(() => {
        if (!id) { setStatus('invalid'); return; }
        fetch(`/api/cert-verify/${encodeURIComponent(id)}`)
            .then(r => {
                if (r.status === 404) { setStatus('invalid'); return null; }
                if (!r.ok) throw new Error('server error');
                return r.json();
            })
            .then(data => {
                if (!data) return;
                setCert(data);
                setStatus('valid');
            })
            .catch(() => setStatus('error'));
    }, [id]);

    const issuedAt   = cert?.issued_at   ? String(cert.issued_at).split('T')[0]              : '';
    const issuedTime = cert?.created_at  ? new Date(cert.created_at).toLocaleString('ko-KR') : '';
    const verifiedAtStr = verifiedAt.toLocaleString('ko-KR');
    const shortId = id ? id.slice(-12).toUpperCase() : '';

    return (
        <>
            <Banner title="문서 진위 확인" subtitle="ReportExpress 전자문서 진위 확인 서비스" />

            <div style={{ background: '#f1f5f9', padding: '48px 16px 80px' }}>
                <div style={{ maxWidth: '560px', margin: '0 auto' }}>

                    {/* ── LOADING ── */}
                    {status === 'loading' && (
                        <div style={{ background: 'white', borderRadius: '16px', padding: '60px 40px',
                                      textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>문서를 확인하는 중입니다...</p>
                        </div>
                    )}

                    {/* ── VALID ── */}
                    {status === 'valid' && cert && (
                        <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden',
                                      boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>

                            <div style={{ background: BRAND, padding: '36px 40px', textAlign: 'center' }}>
                                <div style={{
                                    width: '72px', height: '72px', borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 16px', fontSize: '36px', color: 'white', fontWeight: 700,
                                }}>✓</div>
                                <h2 style={{ color: 'white', fontWeight: 700, fontSize: '22px', marginBottom: '6px' }}>
                                    진위 확인 완료
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', margin: 0 }}>
                                    본 문서는 유효한 공식 증명서로 확인되었습니다.
                                </p>
                            </div>

                            <div style={{ background: '#f8faff', borderBottom: '1px solid #e2e8f0',
                                          padding: '12px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', color: '#6b7280' }}>문서 상태</span>
                                <StatusBadge valid={true} />
                            </div>

                            <div style={{ padding: '8px 40px 24px' }}>
                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700,
                                              letterSpacing: '0.08em', textTransform: 'uppercase', padding: '20px 0 4px' }}>
                                    문서 정보
                                </div>
                                <InfoRow label="성명"     value={cert.name} />
                                <InfoRow label="계좌번호" value={maskAccNo(cert.acc_no)} mono />
                                <InfoRow label="발급일"   value={issuedAt} />
                                <InfoRow label="발급 시각" value={issuedTime} />

                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700,
                                              letterSpacing: '0.08em', textTransform: 'uppercase', padding: '20px 0 4px' }}>
                                    확인 정보
                                </div>
                                <InfoRow label="문서 번호" value={shortId} mono />
                                <InfoRow label="확인 일시" value={verifiedAtStr} />
                            </div>

                            <div style={{ background: '#f8faff', borderTop: '1px solid #e2e8f0',
                                          padding: '14px 40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '16px' }}>🔒</span>
                                <span style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>
                                    본 결과는 캡소프트 ReportExpress 서버에서 실시간으로 조회된 정보입니다.
                                </span>
                            </div>
                        </div>
                    )}

                    {/* ── INVALID ── */}
                    {status === 'invalid' && (
                        <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden',
                                      boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                            <div style={{ background: '#dc2626', padding: '36px 40px', textAlign: 'center' }}>
                                <div style={{
                                    width: '72px', height: '72px', borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 16px', fontSize: '36px', color: 'white',
                                }}>✕</div>
                                <h2 style={{ color: 'white', fontWeight: 700, fontSize: '22px', marginBottom: '6px' }}>
                                    확인 불가
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', margin: 0 }}>
                                    해당 문서를 시스템에서 찾을 수 없습니다.
                                </p>
                            </div>
                            <div style={{ background: '#fff5f5', borderBottom: '1px solid #e2e8f0',
                                          padding: '12px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', color: '#6b7280' }}>문서 상태</span>
                                <StatusBadge valid={false} />
                            </div>
                            <div style={{ padding: '28px 40px' }}>
                                <p style={{ fontSize: '14px', color: '#374151', marginBottom: '12px' }}>
                                    진위 확인이 불가한 주요 원인은 다음과 같습니다.
                                </p>
                                <ul style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.9', paddingLeft: '18px', margin: 0 }}>
                                    <li>유효하지 않거나 만료된 문서 코드</li>
                                    <li>위·변조된 QR 코드</li>
                                    <li>시스템에 등록되지 않은 문서</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* ── ERROR ── */}
                    {status === 'error' && (
                        <div style={{ background: 'white', borderRadius: '16px', padding: '60px 40px',
                                      textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
                            <h3 style={{ color: '#374151', marginBottom: '8px' }}>서버 오류</h3>
                            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>잠시 후 다시 시도해주세요.</p>
                        </div>
                    )}

                    <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '24px', lineHeight: '1.7' }}>
                        본 서비스는 ㈜캡소프트 ReportExpress 전자문서 진위 확인 시스템입니다.<br />
                        문의:{' '}
                        <a href="https://cminnovation.co.kr" style={{ color: '#94a3b8' }}>cminnovation.co.kr</a>
                    </p>

                </div>
            </div>
        </>
    );
}

export default CertVerifyPage;
