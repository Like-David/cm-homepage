import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../styles/SupportWritePage.css';
import Banner from '@/components/common/Banner';

const SupportWritePage = () => {
    const { t } = useTranslation();
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
            alert(t('support.write.consent_error'));
            return;
        }
        try {
            await axios.post('/api/posts', formData);
            alert(t('support.write.success'));
            navigate('/support');
        } catch (error) {
            console.error(t('support.write.fail'), error);
            alert(t('support.write.fail'));
        }
    };

    return (
        <div className="support-write-page">
            <Banner title={t('support.write.banner_title')} subtitle={t('support.write.banner_subtitle')} />
            <div className="support-write-container">
                <form className="support-form" onSubmit={handleSubmit}>
                    <div className="form-group-inline">
                        <div className="form-group">
                            <label htmlFor="author">{t('support.write.author')} <span className="required">*</span></label>
                            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} placeholder="예: 홍길동" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{t('support.write.password')} <span className="required">*</span></label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="게시글 수정·삭제 시 사용됩니다" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">{t('support.write.title')} <span className="required">*</span></label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="예: 제품 설치 후 실행 오류가 발생합니다" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">{t('support.write.content')} <span className="required">*</span></label>
                        <textarea id="content" name="content" rows="10" value={formData.content} onChange={handleChange} placeholder="예: Windows 11 환경에서 설치 완료 후 실행 시 '응답 없음' 오류가 발생하고 있습니다.&#10;&#10;- 발생 시점: 프로그램 첫 실행 시&#10;- 운영체제: Windows 11 (64bit)&#10;- 시도한 조치: 재설치 후에도 동일 증상 지속&#10;&#10;빠른 확인 부탁드립니다." required></textarea>
                    </div>

                    <div className="privacy-policy-section">
                        {/* 개인정보처리방침 내용은 생략 */}
                        <h1 className="title">{t('support.write.privacy_policy')}</h1>
                        <p>...</p>
                    </div>

                    <div className="consent-group">
                        <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                        <label htmlFor="consent">{t('support.write.consent')} <span className="required">*</span></label>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>{t('support.editor.cancel')}</button>
                        <button type="submit" className="submit-btn">{t('support.write_btn')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupportWritePage;
