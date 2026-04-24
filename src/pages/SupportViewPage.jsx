// src/pages/SupportViewPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Banner from '@/components/common/Banner';
import SupportNav from '@/components/support/SupportNav';
import AlertModal from '@/components/common/AlertModal';
import '../styles/SupportViewPage.css';

export default function SupportViewPage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [post, setPost] = useState(null);
    const [isPwOpen, setIsPwOpen] = useState(() => !state?.pw);
    const [pwInput, setPwInput] = useState('');
    const [viewPw, setViewPw] = useState(state?.pw || '');
    const [pwError, setPwError] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'success', message: '' });
    const [confirmModal, setConfirmModal] = useState({ isOpen: false });

    const showAlert = (type, message) => setAlertModal({ isOpen: true, type, message });
    const closeAlert = () => setAlertModal({ isOpen: false, type: 'success', message: '' });

    useEffect(() => {
        const autoVerify = async () => {
            if (!state?.pw) return;

            try {
                const { data } = await axios.post(`/api/posts/${id}/verify`, { password: state.pw });
                setPost(data);
                setViewPw(state.pw);
                setIsPwOpen(false);
                setPwError('');
            } catch {
                setIsPwOpen(true);
                setViewPw('');
            }
        };

        autoVerify();
    }, [id, state?.pw]);

    const submitVerify = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/posts/${id}/verify`, { password: pwInput });
            setPost(data);
            setViewPw(pwInput);
            setIsPwOpen(false);
            setPwError('');
        } catch (err) {
            setPwError(err.response?.data || t('support.password_modal.error'));
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/posts/${id}`, {
                title: editTitle,
                content: editContent,
                password: viewPw,
            });
            setPost((prev) => ({ ...prev, title: editTitle, content: editContent }));
            setIsEditing(false);
        } catch (err) {
            showAlert('error', err.response?.data || t('support.editor.fail_edit'));
        }
    };

    const handleDelete = () => {
        setConfirmModal({ isOpen: true });
    };

    const confirmDelete = async () => {
        setConfirmModal({ isOpen: false });
        try {
            await axios.delete(`/api/posts/${id}`, { data: { password: viewPw } });
            showAlert('success', t('support.editor.success_delete'));
            setTimeout(() => navigate('/support'), 1200);
        } catch (err) {
            showAlert('error', err.response?.data || t('support.editor.fail_delete'));
        }
    };

    const goList = () => navigate('/support');

    if (!isPwOpen && !post) return null;

    return (
        <div className="support-page-wrapper">
        <AlertModal
            isOpen={alertModal.isOpen}
            onClose={closeAlert}
            type={alertModal.type}
            message={alertModal.message}
        />

        {/* 삭제 확인 모달 */}
        {confirmModal.isOpen && (
            <div className="cm-overlay" role="dialog" aria-modal="true">
                <div className="cm-modal">
                    <div className="cm-modal-header">
                        <div className="cm-titles">
                            <h2>게시글 삭제</h2>
                        </div>
                    </div>
                    <div className="cm-form">
                        <p style={{ color: '#444', marginBottom: '1.5rem' }}>
                            이 게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다.
                        </p>
                        <div className="cm-actions">
                            <button type="button" className="cm-btn ghost" onClick={() => setConfirmModal({ isOpen: false })}>
                                취소
                            </button>
                            <button type="button" className="cm-btn primary" style={{ background: '#dc3545', borderColor: '#dc3545' }} onClick={confirmDelete}>
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
            <Banner title={t('support.banner_title')} subtitle={t('support.banner_subtitle')} />
            <SupportNav />

            {isPwOpen && !post && (
                <div className="cm-overlay" role="dialog" aria-modal="true">
                    <div className="cm-modal">
                        <div className="cm-modal-header">
                            <div className="cm-icon-wrap">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M7 10V8a5 5 0 1110 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    <rect x="4.5" y="10" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
                                    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="cm-titles">
                                <h2>{t('support.password_modal.title')}</h2>
                            </div>
                            <button className="cm-close" onClick={goList} aria-label={t('support.editor.cancel')}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={submitVerify} className="cm-form">
                            <label className="cm-label">{t('support.write.password')}</label>
                            <input
                                type="password"
                                className={`cm-input ${pwError ? 'is-error' : ''}`}
                                placeholder={t('support.password_modal.placeholder')}
                                value={pwInput}
                                onChange={(e) => setPwInput(e.target.value)}
                                required
                                autoFocus
                            />
                            {pwError && <p className="cm-error">{pwError}</p>}

                            <div className="cm-actions">
                                <button type="button" className="cm-btn ghost" onClick={goList}>
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

            {post && (
                <div className="support-content-area">
                    <div className="post-view-container">
                        <div className="post-header">
                            <h1>{post.title}</h1>
                            <div className="post-meta">
                                <span>{t('support.table.author')}: {post.author || post.company || t('support.table.anonymous')}</span>
                                <span>{t('support.table.date')}: {new Date(post.created_at).toLocaleDateString().replace(/\.$/, '')}</span>
                                <span>{t('support.table.views')}: {post.views}</span>
                                {post.product && <span className="badge">{post.product}</span>}
                            </div>
                        </div>

                        {!isEditing ? (
                            <div
                                className="post-content"
                                dangerouslySetInnerHTML={{ __html: (post.content || '').replace(/\n/g, '<br />') }}
                            />
                        ) : (
                            <div className="editor-card">
                                <div className="editor-toolbar">
                                    <span className="chip">{t('support.editor.editing')}</span>
                                    <div className="spacer" />
                                    <button type="button" className="cm-btn ghost sm" onClick={cancelEdit}>
                                        {t('support.editor.cancel')}
                                    </button>
                                    <button type="button" className="cm-btn outline sm" onClick={() => setIsEditing(false)}>
                                        {t('support.editor.preview')}
                                    </button>
                                </div>
                                <form onSubmit={submitEdit} className="editor-form">
                                    <label className="cm-label">{t('support.editor.title')}</label>
                                    <input
                                        type="text"
                                        className="cm-input"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        placeholder={t('support.editor.title_placeholder')}
                                        required
                                    />
                                    <label className="cm-label">{t('support.editor.content')}</label>
                                    <textarea
                                        className="cm-textarea"
                                        rows={12}
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        placeholder={t('support.editor.content_placeholder')}
                                        required
                                    />
                                    <div className="cm-actions right">
                                        <button type="button" className="cm-btn ghost" onClick={cancelEdit}>
                                            {t('support.editor.cancel')}
                                        </button>
                                        <button type="submit" className="cm-btn primary">
                                            {t('support.editor.save')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="post-actions">
                            <button onClick={goList} className="btn-list">
                                {t('support.view.list_btn')}
                            </button>
                            {!isEditing && (
                                <button
                                    className="btn-edit"
                                    onClick={() => navigate(`/support/${id}/edit`, { state: { pw: viewPw } })}
                                    disabled={!viewPw}
                                >
                                    {t('support.view.edit_btn')}
                                </button>
                            )}
                            <button className="btn-delete" onClick={handleDelete}>
                                {t('support.view.delete_btn')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
