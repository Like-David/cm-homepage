// src/pages/SupportViewPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Banner from '@/components/common/Banner';
import SupportNav from '@/components/support/SupportNav';
import '../styles/SupportViewPage.css';

export default function SupportViewPage() {
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
            setPwError(err.response?.data || '비밀번호가 일치하지 않습니다.');
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
            alert(err.response?.data || '수정에 실패했습니다.');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await axios.delete(`/api/posts/${id}`, { data: { password: viewPw } });
            alert('삭제되었습니다.');
            navigate('/support');
        } catch (err) {
            alert(err.response?.data || '삭제 실패 (권한/비밀번호 확인 필요)');
        }
    };

    const goList = () => navigate('/support');

    if (!isPwOpen && !post) return null;

    return (
        <div className="support-page-wrapper">
            <Banner title="고객센터" subtitle="궁금한 점이 있으시면 언제든지 문의해 주세요." />
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
                                <h2>비밀번호 확인</h2>
                            </div>
                            <button className="cm-close" onClick={goList} aria-label="닫기">
                                ×
                            </button>
                        </div>

                        <form onSubmit={submitVerify} className="cm-form">
                            <label className="cm-label">비밀번호</label>
                            <input
                                type="password"
                                className={`cm-input ${pwError ? 'is-error' : ''}`}
                                placeholder="보안을 위해 비밀번호를 입력해 주세요."
                                value={pwInput}
                                onChange={(e) => setPwInput(e.target.value)}
                                required
                                autoFocus
                            />
                            {pwError && <p className="cm-error">{pwError}</p>}

                            <div className="cm-actions">
                                <button type="button" className="cm-btn ghost" onClick={goList}>
                                    취소
                                </button>
                                <button type="submit" className="cm-btn primary">
                                    확인
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
                                <span>작성자: {post.author || post.company || '익명'}</span>
                                <span>작성일: {new Date(post.created_at).toLocaleDateString().replace(/\.$/, '')}</span>
                                <span>조회수: {post.views}</span>
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
                                    <span className="chip">수정 중</span>
                                    <div className="spacer" />
                                    <button type="button" className="cm-btn ghost sm" onClick={cancelEdit}>
                                        취소
                                    </button>
                                    <button type="button" className="cm-btn outline sm" onClick={() => setIsEditing(false)}>
                                        미리보기
                                    </button>
                                </div>
                                <form onSubmit={submitEdit} className="editor-form">
                                    <label className="cm-label">제목</label>
                                    <input
                                        type="text"
                                        className="cm-input"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        placeholder="제목을 입력하세요"
                                        required
                                    />
                                    <label className="cm-label">내용</label>
                                    <textarea
                                        className="cm-textarea"
                                        rows={12}
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        placeholder="내용을 입력하세요"
                                        required
                                    />
                                    <div className="cm-actions right">
                                        <button type="button" className="cm-btn ghost" onClick={cancelEdit}>
                                            취소
                                        </button>
                                        <button type="submit" className="cm-btn primary">
                                            저장
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="post-actions">
                            <button onClick={goList} className="btn-list">
                                목록
                            </button>
                            {!isEditing && (
                                <button
                                    className="btn-edit"
                                    onClick={() => navigate(`/support/${id}/edit`, { state: { pw: viewPw } })}
                                    disabled={!viewPw}
                                >
                                    수정
                                </button>
                            )}
                            <button className="btn-delete" onClick={handleDelete}>
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
