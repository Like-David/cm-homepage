// src/components/common/PasswordModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

/**
 * 재사용 비밀번호 확인 모달
 *
 * Props
 * - isOpen: boolean — 모달 열림 여부
 * - onCancel: () => void — 취소/닫기
 * - onSuccess: (result) => void — 검증 성공 시 콜백 (서버 응답 전달)
 * - verifyUrl: string — 검증 API URL (예: `/api/posts/${id}/verify`)
 * - title?: string — 헤더 타이틀 (기본: "비밀번호 확인")
 * - subtitle?: string — 서브 텍스트
 * - placeholder?: string — 입력 placeholder
 * - requestMapper?: (password: string) => any — 요청 바디 커스터마이징 (기본: { password })
 * - responseMapper?: (respData: any) => any — 응답 가공(예: {post, token} → {post, token})
 */
export default function PasswordModal({
                                          isOpen,
                                          onCancel,
                                          onSuccess,
                                          verifyUrl,
                                          title = '비밀번호 확인',
                                          subtitle = '보안을 위해 비밀번호를 입력해 주세요.',
                                          placeholder = '비밀번호',
                                          requestMapper = (pw) => ({ password: pw }),
                                          responseMapper = (data) => data,
                                      }) {
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setPw('');
            setError('');
            // 포커스
            setTimeout(() => inputRef.current?.focus(), 0);
            // ESC 닫기
            const onKey = (e) => { if (e.key === 'Escape') onCancel?.(); };
            window.addEventListener('keydown', onKey);
            return () => window.removeEventListener('keydown', onKey);
        }
    }, [isOpen, onCancel]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const body = requestMapper(pw);
            const { data } = await axios.post(verifyUrl, body);
            const result = responseMapper(data);
            setError('');
            onSuccess?.(result, pw); // 필요 시 이후 수정/삭제 인증용으로 pw도 넘겨줌
        } catch (err) {
            setError('비밀번호가 일치하지 않습니다.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="password-modal-overlay" role="dialog" aria-modal="true">
            <div className="password-modal">
                <form onSubmit={submit} className="password-modal-form">
                    <h2>{title}</h2>
                    {subtitle && <p>{subtitle}</p>}
                    <input
                        type="password"
                        ref={inputRef}
                        placeholder={placeholder}
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onCancel}>
                            취소
                        </button>
                        <button type="submit" className="btn-confirm">
                            확인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
