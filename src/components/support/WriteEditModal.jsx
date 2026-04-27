import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axiosInstance from '@/services/axios';

const WriteEditModal = ({ isOpen, onClose, onSuccess, post }) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('product');

    useEffect(() => {
        if (isOpen && post) {
            setTitle(post.title);
            setContent(post.content);
            setAuthor(post.author);
            setCategory(post.category || 'product');
            setPassword(''); // Password should not be pre-filled
        } else if (!isOpen) {
            setTitle('');
            setContent('');
            setAuthor('');
            setPassword('');
            setCategory('product');
        }
    }, [isOpen, post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/posts/${post.id}`, {
                title,
                content,
                author,
                password,
                category,
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error updating post:', error);
            alert(t('support.modal.errors.fail_edit'));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="password-modal-overlay">
            <div className="password-modal">
                <h2>{t('support.modal.edit_title')}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={t('support.modal.title')}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder={t('support.modal.content')}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                    <input
                        type="text"
                        placeholder={t('support.write.author')}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder={t('support.write.password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="product">{t('support.modal.product_options.etc')}</option> {/* Mapping issue: category mapping needs thought but using generic for now */}
                        <option value="maintenance">{t('support.modal.product_options.maintenance')}</option>
                        <option value="etc">{t('support.modal.product_options.etc')}</option>
                    </select>
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>{t('support.editor.cancel')}</button>
                        <button type="submit" className="submit-btn">{t('support.view.edit_btn')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WriteEditModal;
