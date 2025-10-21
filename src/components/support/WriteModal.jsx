import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WriteModal = ({ isOpen, onClose, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('product');

    useEffect(() => {
        if (!isOpen) {
            setTitle('');
            setContent('');
            setAuthor('');
            setPassword('');
            setCategory('product');
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/posts', {
                title,
                content,
                author,
                password,
                category,
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error submitting post:', error);
            alert('게시글 작성에 실패했습니다.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="password-modal-overlay">
            <div className="password-modal">

                <h2>문의하기</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="내용"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                    <input
                        type="text"
                        placeholder="작성자"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="product">제품</option>
                        <option value="maintenance">유지보수</option>
                        <option value="etc">기타</option>
                    </select>
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
                        <button type="submit" className="submit-btn">작성</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WriteModal;
