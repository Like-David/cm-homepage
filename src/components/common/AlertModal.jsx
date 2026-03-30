import React from 'react';
import { useTranslation } from 'react-i18next';

const AlertModal = ({ isOpen, onClose, type = 'success', message, title }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            case 'info':
                return 'ℹ';
            default:
                return '✓';
        }
    };

    const getTypeClass = () => {
        switch (type) {
            case 'success':
                return 'alert-success';
            case 'error':
                return 'alert-error';
            case 'warning':
                return 'alert-warning';
            case 'info':
                return 'alert-info';
            default:
                return 'alert-success';
        }
    };

    return (
        <div className="password-modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
            <div className={`password-modal alert-modal ${getTypeClass()}`} onClick={(e) => e.stopPropagation()}>
                <div className="alert-modal-header">
                    <div className="alert-icon">
                        {getIcon()}
                    </div>
                    <h3 className="alert-title">
                        {title || (type === 'success' ? t('common.success') : type === 'error' ? t('common.error') : t('common.notice'))}
                    </h3>
                </div>

                <div className="alert-modal-body">
                    <p className="alert-message">{message}</p>
                </div>

                <div className="modal-actions">
                    <button type="button" className="submit-btn" onClick={onClose}>
                        {t('common.confirm')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
