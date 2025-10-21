import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Banner from '@/components/common/Banner';
import SupportNav from '@/components/support/SupportNav';
import Modal from '@/components/common/Modal';
import '../styles/SupportViewPage.css';

const SupportViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [error, setError] = useState('');

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/posts/${id}/verify`, { password });
            setPost(response.data);
            setIsModalOpen(false);
            setError('');
        } catch (err) {
            setError('비밀번호가 일치하지 않습니다.');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navigate('/support');
    };

    if (!isModalOpen && !post) {
        return null; // Redirecting or showing nothing
    }

    return (
        <div className="support-page-wrapper">
            <Banner title="고객센터" subtitle="궁금한 점이 있으시면 언제든지 문의해 주세요." />
            <SupportNav />
            {isModalOpen && !post && (
                <Modal onClose={handleCancel}>
                    <form onSubmit={handlePasswordSubmit} className="password-modal-form">
                        <h2>비밀번호 확인</h2>
                        <p>게시글을 보려면 비밀번호를 입력하세요.</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호"
                            required
                        />
                        {error && <p className="error-message">{error}</p>}
                        <div className="modal-actions">
                            <button type="submit" className="btn-confirm">확인</button>
                            <button type="button" onClick={handleCancel} className="btn-cancel">취소</button>
                        </div>
                    </form>
                </Modal>
            )}

            {post && (
                <div className="support-content-area">
                    <div className="post-view-container">
                        <div className="post-header">
                            <h1>{post.title}</h1>
                            <div className="post-meta">
                                <span>작성자: {post.author}</span>
                                <span>작성일: {new Date(post.created_at).toLocaleDateString()}</span>
                                <span>조회수: {post.views}</span>
                            </div>
                        </div>
                        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                        <div className="post-actions">
                            <button onClick={() => navigate('/support')} className="btn-list">목록</button>
                            {/* 수정 및 삭제 버튼 추가 예정 */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupportViewPage;
