// src/pages/SupportEditPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Banner from '@/components/common/Banner';
import SupportNav from '@/components/support/SupportNav';
import '../styles/SupportEditPage.css';

export default function SupportEditPage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [viewPw, setViewPw] = useState(state?.pw || '');
    const [needVerify, setNeedVerify] = useState(() => !state?.pw);

    const [pwInput, setPwInput] = useState('');
    const [pwError, setPwError] = useState('');

    const goViewKeepPw = () => {
        navigate(`/support/${id}`, { state: { pw: viewPw } });
    };

    useEffect(() => {
        const autoVerify = async () => {
            if (!state?.pw) return;

            try {
                const { data } = await axios.post(`/api/posts/${id}/verify`, { password: state.pw });

                setViewPw(state.pw);
                setTitle(data.title || '');
                setContent(data.content || '');

                setNeedVerify(false);
                setPwError('');
            } catch (e) {
                setNeedVerify(true);
            }
        };

        autoVerify();
    }, [id, state?.pw]);

    const submitVerify = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/posts/${id}/verify`, { password: pwInput });

            setViewPw(pwInput);
            setTitle(data.title || '');
            setContent(data.content || '');

            setNeedVerify(false);
            setPwError('');
        } catch (err) {
            setPwError(err.response?.data || t('support.password_modal.error'));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/posts/${id}`, {
                title,
                content,
                password: viewPw,
            });
            alert(t('support.editor.success_edit'));
            navigate(`/support/${id}`, { state: { pw: viewPw } });
        } catch (err) {
            alert(err.response?.data || t('support.editor.fail_edit'));
        }
    };

    return (
        <div className="support-page-wrapper">
            <Banner title={t('support.banner_title')} subtitle={t('support.banner_subtitle')} />
            <SupportNav />

            {needVerify && (
                <div className="cm-overlay" role="dialog" aria-modal="true">
                    <div className="cm-modal">
                        <div className="cm-modal-header">
                            <div className="cm-icon-wrap" aria-hidden>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M7 10V8a5 5 0 1110 0v2"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                    <rect
                                        x="4.5"
                                        y="10"
                                        width="15"
                                        height="10"
                                        rx="3"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />
                                    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                                </svg>
                            </div>

                            <div className="cm-titles">
                                <h2>{t('support.password_modal.title')}</h2>
                                <p>{t('support.password_modal.subtitle')}</p>
                            </div>

                            <button className="cm-close" onClick={goViewKeepPw} aria-label={t('support.editor.cancel')}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={submitVerify} className="cm-form">
                            <label className="cm-label">{t('support.write.password')}</label>
                            <input
                                type="password"
                                className="cm-input"
                                value={pwInput}
                                onChange={(e) => setPwInput(e.target.value)}
                                placeholder={t('support.password_modal.placeholder')}
                                required
                                autoFocus
                            />

                            {pwError && <p className="cm-error">{pwError}</p>}

                            <div className="cm-actions">
                                <button type="button" className="cm-btn ghost" onClick={goViewKeepPw}>
                                    {t('support.password_modal.cancel')}
                                </button>
                                <button type="submit" className="cm-btn primary">
                                    {t('support.password_modal.confirm')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {!needVerify && (
                <div className="support-content-area">
                    <div className="editor-card">
                        <div className="editor-toolbar">
                            <span className="chip">{t('support.editor.editing')}</span>
                            <div className="editor-toolbar-actions">
                                <button type="button" className="cm-btn ghost sm" onClick={goViewKeepPw}>
                                    {t('support.editor.cancel')}
                                </button>
                            </div>
                        </div>

                        <form onSubmit={onSubmit} className="editor-form">
                            <label className="cm-label">{t('support.editor.title')}</label>
                            <input
                                type="text"
                                className="cm-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={t('support.editor.title')}
                                required
                            />

                            <label className="cm-label">{t('support.editor.content')}</label>
                            <textarea
                                className="cm-textarea"
                                rows={12}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={t('support.editor.content')}
                                required
                            />

                            <div className="cm-actions right">
                                <button type="button" className="cm-btn ghost" onClick={goViewKeepPw}>
                                    {t('support.editor.cancel')}
                                </button>
                                <button type="submit" className="cm-btn primary" disabled={!viewPw}>
                                    {t('support.editor.save')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
