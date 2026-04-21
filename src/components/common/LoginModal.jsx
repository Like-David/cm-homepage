import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const LoginModal = ({ isOpen, onClose, onShowRegister, onShowAlert }) => {
    const { t } = useTranslation();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
    };

    const validateField = (field, value) => {
        const newErrors = { ...errors };

        if (field === 'email') {
            if (!value.trim()) {
                newErrors.email = t('auth.errors.email_required');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                newErrors.email = t('auth.errors.email_invalid');
            } else {
                delete newErrors.email;
            }
        }

        if (field === 'password') {
            if (!value) {
                newErrors.password = t('auth.errors.password_required');
            } else {
                delete newErrors.password;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validate = () => {
        const allValid = ['email', 'password'].every(field =>
            validateField(field, formData[field])
        );
        setTouched({ email: true, password: true });
        return allValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                handleClose();
                onShowAlert?.({
                    type: 'success',
                    message: t('auth.login_success')
                });
            } else {
                onShowAlert?.({
                    type: 'error',
                    message: result.message || t('auth.login_error')
                });
            }
        } catch (err) {
            onShowAlert?.({
                type: 'error',
                message: t('auth.login_error')
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({ email: '', password: '' });
        setErrors({});
        setTouched({});
        onClose();
    };

    const handleSwitchToRegister = () => {
        handleClose();
        onShowRegister();
    };

    if (!isOpen) return null;

    return (
        <div className="password-modal-overlay" role="dialog" aria-modal="true">
            <div className="password-modal">
                {/* Header */}
                <div className="modal-header-cm">
                    <div className="badge">{t('auth.member')}</div>
                    <h2 className="title">{t('auth.login_title')}</h2>
                    <p className="subtitle">{t('auth.login_subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    {/* 브라우저 자동완성 차단용 더미 입력 */}
                    <input type="text" style={{ display: 'none' }} />
                    <input type="password" style={{ display: 'none' }} />

                    {/* Email */}
                    <label className="fm-label">
                        {t('auth.email')} <span className="req">*</span>
                    </label>
                    <input
                        type="text"
                        name="email"
                        className={`fm-input ${touched.email && errors.email ? 'error' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        onFocus={(e) => e.target.removeAttribute('readOnly')}
                        placeholder="이메일을 입력하세요"
                        autoComplete="off"
                        readOnly
                        required
                    />
                    {touched.email && errors.email && (
                        <p className="err-txt">{errors.email}</p>
                    )}

                    {/* Password */}
                    <label className="fm-label">
                        {t('auth.password')} <span className="req">*</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        className={`fm-input ${touched.password && errors.password ? 'error' : ''}`}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() => handleBlur('password')}
                        onFocus={(e) => e.target.removeAttribute('readOnly')}
                        placeholder="비밀번호를 입력하세요"
                        autoComplete="new-password"
                        readOnly
                        required
                    />
                    {touched.password && errors.password && (
                        <p className="err-txt">{errors.password}</p>
                    )}

                    {/* Actions */}
                    <div className="modal-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleClose}
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? t('auth.logging_in') : t('auth.login')}
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="auth-switch-section">
                        <p className="auth-switch-text">
                            {t('auth.no_account')}
                            <button
                                type="button"
                                onClick={handleSwitchToRegister}
                                className="auth-switch-btn"
                            >
                                {t('auth.register')}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
