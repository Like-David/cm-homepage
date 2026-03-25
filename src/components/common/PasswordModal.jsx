// src/components/common/PasswordModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

/**
 * 재사용 비밀번호 확인 모달
 */
export default function PasswordModal({
                                          isOpen,
                                          onCancel,
                                          onSuccess,
                                          verifyUrl,
                                          title,
                                          subtitle,
                                          placeholder,
                                          requestMapper = (pw) => ({ password: pw }),
                                          responseMapper = (data) => data,
                                      }) {
    const { t } = useTranslation();
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    // Default translations
    const modalTitle = title || t('support.password_modal.title');
    const modalSubtitle = subtitle || t('support.password_modal.subtitle');
    const modalPlaceholder = placeholder || t('support.password_modal.placeholder');

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
            setError(t('support.password_modal.error'));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="password-modal-overlay" role="dialog" aria-modal="true">
            <div className="password-modal">
                <form onSubmit={submit} className="password-modal-form">
                    <h2>{modalTitle}</h2>
                    {modalSubtitle && <p>{modalSubtitle}</p>}
                    <input
                        type="password"
                        ref={inputRef}
                        placeholder={modalPlaceholder}
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onCancel}>
                            {t('support.password_modal.cancel')}
                        </button>
                        <button type="submit" className="btn-confirm">
                            {t('support.password_modal.confirm')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
