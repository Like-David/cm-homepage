import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SupportWritePage.css';
import Banner from '@/components/common/Banner';

const SupportWritePage = () => {
    const [formData, setFormData] = useState({
        author: '',
        password: '',
        title: '',
        content: '',
    });
    const [consent, setConsent] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!consent) {
            alert('개인정보 수집 및 이용에 동의해야 합니다.');
            return;
        }
        try {
            await axios.post('/api/posts', formData);
            alert('문의가 성공적으로 접수되었습니다.');
            navigate('/support');
        } catch (error) {
            console.error('문의 접수 중 오류가 발생했습니다.', error);
            alert('문의 접수 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="support-write-page">
            <Banner title="온라인 문의" subtitle="문의 내용에 대해 신속하게 답변해 드리겠습니다." />
            <div className="support-write-container">
                <form className="support-form" onSubmit={handleSubmit}>
                    <div className="form-group-inline">
                        <div className="form-group">
                            <label htmlFor="author">작성자 <span className="required">*</span></label>
                            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">비밀번호 <span className="required">*</span></label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">제목 <span className="required">*</span></label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">문의 내용 <span className="required">*</span></label>
                        <textarea id="content" name="content" rows="10" value={formData.content} onChange={handleChange} required></textarea>
                    </div>

                    <div className="privacy-policy-section">
                        {/* 개인정보처리방침 내용은 생략 */}
                        <h1 className="title">개인정보처리방침</h1>
                        <p>...</p>
                    </div>

                    <div className="consent-group">
                        <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                        <label htmlFor="consent">개인정보 수집 및 이용에 동의합니다. <span className="required">*</span></label>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>취소</button>
                        <button type="submit" className="submit-btn">문의하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupportWritePage;
