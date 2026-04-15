import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const passwordRule = (pw = '') => {
    const lenOk = pw.length >= 8 && pw.length <= 20;
    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasDigit = /\d/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);
    const passed = lenOk && hasUpper && hasLower && hasDigit && hasSpecial;

    return { lenOk, hasUpper, hasLower, hasDigit, hasSpecial, passed };
};

const strengthScore = (pw = '') => {
    const r = passwordRule(pw);
    const raw =
        (r.lenOk ? 1 : 0) +
        (r.hasUpper ? 1 : 0) +
        (r.hasLower ? 1 : 0) +
        (r.hasDigit ? 1 : 0) +
        (r.hasSpecial ? 1 : 0);
    return Math.floor((raw / 5) * 4);
};

const RegisterModal = ({ isOpen, onClose, onShowLogin, onShowAlert }) => {
    const { t } = useTranslation();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'GUEST'
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);

    const pwStrength = strengthScore(formData.password);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            validateField(name, value);
        }

        // 비밀번호 변경 시 확인 비밀번호도 재검증
        if (name === 'password' && touched.confirmPassword) {
            validateField('confirmPassword', formData.confirmPassword);
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
    };

    const validateField = (field, value) => {
        const newErrors = { ...errors };

        if (field === 'name') {
            if (!value.trim()) {
                newErrors.name = t('auth.errors.name_required');
            } else if (value.trim().length < 2) {
                newErrors.name = t('auth.errors.name_min');
            } else {
                delete newErrors.name;
            }
        }

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
            const rule = passwordRule(value);
            if (!value) {
                newErrors.password = t('auth.errors.password_required');
            } else if (!rule.passed) {
                newErrors.password = t('auth.errors.password_weak');
            } else {
                delete newErrors.password;
            }
        }

        if (field === 'confirmPassword') {
            if (!value) {
                newErrors.confirmPassword = t('auth.errors.password_confirm_required');
            } else if (value !== formData.password) {
                newErrors.confirmPassword = t('auth.password_mismatch');
            } else {
                delete newErrors.confirmPassword;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validate = () => {
        const allValid = ['name', 'email', 'password', 'confirmPassword'].every(field =>
            validateField(field, formData[field])
        );
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true
        });
        return allValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            const result = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            if (result.success) {
                handleClose();
                onShowAlert?.({
                    type: 'success',
                    message: t('auth.register_success')
                });
                // 2초 후 로그인 모달 표시
                setTimeout(() => {
                    onShowLogin();
                }, 2000);
            } else {
                const errorMessage = result.errors
                    ? result.errors.map(e => e.message).join('\n')
                    : result.message;
                onShowAlert?.({
                    type: 'error',
                    message: errorMessage || t('auth.register_error')
                });
            }
        } catch (err) {
            onShowAlert?.({
                type: 'error',
                message: t('auth.register_error')
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'GUEST'
        });
        setErrors({});
        setTouched({});
        onClose();
    };

    const handleSwitchToLogin = () => {
        handleClose();
        onShowLogin();
    };

    if (!isOpen) return null;

    return (
        <div className="password-modal-overlay" role="dialog" aria-modal="true">
            <div className="password-modal wide">
                {/* Header */}
                <div className="modal-header-cm">
                    <div className="badge">{t('auth.member')}</div>
                    <h2 className="title">{t('auth.register_title')}</h2>
                    <p className="subtitle">{t('auth.register_subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {/* Name & Email */}
                    <div className="grid-2">
                        <div>
                            <label className="fm-label">
                                {t('auth.name')} <span className="req">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                className={touched.name && errors.name ? 'error' : ''}
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={() => handleBlur('name')}
                                placeholder={t('auth.name_placeholder')}
                                autoComplete="name"
                                required
                            />
                            {touched.name && errors.name && (
                                <p className="err-txt">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="fm-label">
                                {t('auth.email')} <span className="req">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                className={touched.email && errors.email ? 'error' : ''}
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={() => handleBlur('email')}
                                placeholder={t('auth.email_placeholder')}
                                autoComplete="email"
                                required
                            />
                            {touched.email && errors.email && (
                                <p className="err-txt">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Password & Confirm Password */}
                    <div className="grid-2">
                        <div>
                            <label className="fm-label">
                                {t('auth.password')} <span className="req">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                className={touched.password && errors.password ? 'error' : ''}
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={() => handleBlur('password')}
                                placeholder={t('auth.password_placeholder')}
                                autoComplete="new-password"
                                required
                            />
                            {touched.password && errors.password && (
                                <p className="err-txt">{errors.password}</p>
                            )}

                            {/* Password Checklist */}
                            <div className="pw-checklist">
                                {(() => {
                                    const r = passwordRule(formData.password);
                                    return (
                                        <>
                                            <span className={r.lenOk ? 'ok' : 'no'}>8~20자</span>
                                            <span className={r.hasUpper ? 'ok' : 'no'}>대문자</span>
                                            <span className={r.hasLower ? 'ok' : 'no'}>소문자</span>
                                            <span className={r.hasDigit ? 'ok' : 'no'}>숫자</span>
                                            <span className={r.hasSpecial ? 'ok' : 'no'}>특수문자</span>
                                        </>
                                    );
                                })()}
                            </div>

                            {/* Password Strength */}
                            <div className={`pw-strength s${pwStrength}`}>
                                <div className="bar" />
                            </div>
                        </div>

                        <div>
                            <label className="fm-label">
                                {t('auth.confirm_password')} <span className="req">*</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={() => handleBlur('confirmPassword')}
                                placeholder={t('auth.confirm_password_placeholder')}
                                autoComplete="new-password"
                                required
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <p className="err-txt">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    {/* Role */}
                    <label className="fm-label">
                        {t('auth.role')} <span className="req">*</span>
                    </label>
                    <select
                        name="role"
                        className="fm-input"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="GUEST">{t('auth.role_guest')}</option>
                        <option value="EMPLOYEE">{t('auth.role_employee')}</option>
                    </select>

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
                            {loading ? t('auth.registering') : t('auth.register')}
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="auth-switch-section">
                        <p className="auth-switch-text">
                            {t('auth.already_have_account')}
                            <button
                                type="button"
                                onClick={handleSwitchToLogin}
                                className="auth-switch-btn"
                            >
                                {t('auth.login')}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
