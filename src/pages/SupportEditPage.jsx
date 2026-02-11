// src/pages/SupportEditPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Banner from '@/components/common/Banner';
import SupportNav from '@/components/support/SupportNav';
import '../styles/SupportEditPage.css';

export default function SupportEditPage() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 비번/검증 상태
    const [viewPw, setViewPw] = useState(state?.pw || '');
    const [needVerify, setNeedVerify] = useState(!state?.pw);

    // 모달 입력값
    const [pwInput, setPwInput] = useState('');
    const [pwError, setPwError] = useState('');

    // state.pw가 있으면 자동 verify해서 프리필
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
                // state pw가 틀렸거나 서버가 거절하면 모달로 전환
                setNeedVerify(true);
            }
        };

        autoVerify();
    }, [id, state?.pw]);

    // 직접 접근: 모달에서 verify 성공 시 프리필
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
            setPwError(err.response?.data || '비밀번호가 일치하지 않습니다.');
        }
    };

    // 수정 저장
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/posts/${id}`, {
                title,
                content,
                password: viewPw,
            });
            alert('수정되었습니다.');
            // 상세로 돌아갈 때 pw 유지(원하면)
            navigate('/support');
        } catch (err) {
            alert(err.response?.data || '수정에 실패했습니다.');
        }
    };

    return (
        <div className="support-page-wrapper">
            <Banner title="고객센터" subtitle="궁금한 점이 있으시면 언제든지 문의해 주세요." />
            <SupportNav />

            {/* 비밀번호 확인 모달 */}
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
                                    <rect x="4.5" y="10" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
                                    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="cm-titles">
                                <h2>비밀번호 확인</h2>
                                <p>수정을 위해 비밀번호를 입력하세요.</p>
                            </div>
                            <button className="cm-close" onClick={() => navigate(`/support/${id}`)} aria-label="닫기">
                                ×
                            </button>
                        </div>

                        <form onSubmit={submitVerify} className="cm-form">
                            <label className="cm-label">비밀번호</label>
                            <input
                                type="password"
                                className="cm-input"
                                value={pwInput}
                                onChange={(e) => setPwInput(e.target.value)}
                                placeholder="비밀번호를 입력해 주세요."
                                required
                                autoFocus
                            />
                            {pwError && <p className="cm-error">{pwError}</p>}

                            <div className="cm-actions">
                                <button type="button" className="cm-btn ghost" onClick={() => navigate(`/support/${id}`)}>
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

            {/* 수정 페이지 본문 */}
            {!needVerify && (
                <div className="support-content-area">
                    <div className="editor-card">
                        <div className="editor-toolbar">
                            <span className="chip">수정 중</span>
                            <div className="editor-toolbar-actions">
                                <button type="button" className="cm-btn ghost sm" onClick={() => navigate(-1)}>
                                    취소
                                </button>
                            </div>
                        </div>

                        <form onSubmit={onSubmit} className="editor-form">
                            <label className="cm-label">제목</label>
                            <input
                                type="text"
                                className="cm-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목"
                                required
                            />

                            <label className="cm-label">내용</label>
                            <textarea
                                className="cm-textarea"
                                rows={12}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="내용"
                                required
                            />

                            <div className="cm-actions right">
                                <button type="button" className="cm-btn ghost" onClick={() => navigate(-1)}>
                                    취소
                                </button>
                                <button type="submit" className="cm-btn primary" disabled={!viewPw}>
                                    저장
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
