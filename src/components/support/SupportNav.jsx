import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/SupportNav.css';

const SupportNav = () => {
    return (
        <div className="support-nav-container">
            <ul className="support-nav">
                <li>
                    <NavLink to="/support" end>문의사항</NavLink>
                </li>
                <li>
                    <NavLink to="/support/faq">자주묻는질문</NavLink>
                </li>
                <li>
                    <NavLink to="/support/inquiry">1:1문의</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SupportNav;
