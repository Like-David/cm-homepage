// src/pages/SupportEditPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PasswordModal from '@/components/common/PasswordModal'; // 이전에 만든 공용 모달 재사용 권장

export default function SupportEditPage() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [viewPw, setViewPw] = useState(state?.pw || '');
    const [needVerify, setNeedVerify] = useState(!state?.pw); // 직접 접근 시 true

    // 기존 글 프리필
    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await axios.get(`/api/posts/${id}`);
                // 서버가 공개 GET을 막고 있다면 verify 후 token 헤더로 가져오게 바꾸면 됨
                setTitle(data.title || '');
                setContent(data.content || '');
            } catch (e) {
                // 공개 GET이 막혀있으면 verify 성공 후에 다시 GET하는 흐름으로 바꿔도 OK
                // 여기서는 간단히 실패 시 목록으로
                console.error(e);
            }
        };
        load();
    }, [id]);

    // 수정 저장
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/posts/${id}`, {
                title,
                content,
                password: viewPw,          // ✅ 서버 요구 필드
            });
            alert('수정되었습니다.');
            navigate(`/support/${id}`);
        } catch (err) {
            alert(err.response?.data || '수정에 실패했습니다.');
        }
    };

    return (
        <div className="password-modal-overlay">
            <div className="password-modal">
                <form onSubmit={onSubmit} className="password-modal-form">
                    <h2>게시글 수정</h2>

                    <input
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        rows={10}
                        placeholder="내용"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>취소</button>
                        <button type="submit" className="btn-confirm" disabled={!viewPw}>
                            저장
                        </button>
                    </div>
                </form>
            </div>

            {/* 직접 들어온 경우 비번 검증 모달 띄움 */}
            <PasswordModal
                isOpen={needVerify}
                onCancel={() => navigate(`/support/${id}`)}
                onSuccess={(result, pw) => {
                    setViewPw(pw);           // ✅ 검증 성공한 비번 보관
                    setNeedVerify(false);
                    // 공개 GET이 막힌 서버라면 여기서 verify 성공 후에 GET으로 프리필 다시 불러오면 됨
                }}
                verifyUrl={`/api/posts/${id}/verify`}
                title="비밀번호 확인"
                subtitle="수정을 위해 비밀번호를 입력하세요."
            />
        </div>
    );
}
