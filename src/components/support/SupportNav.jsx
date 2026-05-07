import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/SupportNav.css';

const SupportNav = () => {
    const { t } = useTranslation();
    return (
        <div className="support-nav-container">
            <ul className="support-nav">
                <li>
                    <NavLink to="/support/faq">{t('menu.faq')}</NavLink>
                </li>
                <li>
                    <NavLink to="/support" end>{t('support.board_title')}</NavLink>
                </li>
                <li>
                    <NavLink to="/support/inquiry">{t('menu.remote_support')}</NavLink>
                </li>
                <li>
                    <NavLink to="/support/resources">{t('menu.resources')}</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SupportNav;
