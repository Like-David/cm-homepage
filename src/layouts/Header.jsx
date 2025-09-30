import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/Header.css';

// Provided example structure translated into a data object
const menuItems = [
    {
        title: 'COMPANY',
        path: '/about/history',
        depth2: [
            { title: '연혁', path: '/about/history' },
            { title: '인증', path: '/bbs/certification' },
            { title: '찾아오시는 길', path: '/about/location' },
        ],
    },
    {
        title: 'BUSINESS',
        path: '/business/client',
        depth2: [
            { title: '고객사', path: '/business/client' },
            { title: '기업부설연구소', path: '/business/lab' },
        ],
    },
    {
        title: 'PRODUCT',
        path: '/product/web',
        depth2: [
            { title: '웹보안', path: '/product/web' },
            { title: 'DB암호화', path: '/product/database' },
            {
                title: 'DB접근제어',
                path: '/product/dbsafer'
            },
            { title: '네트워크보안', path: '/product/network' },
            {
                title: 'CLOUD',
                path: '/product/cloud'
            },
        ],
    },
    {
        title: 'SUPPORT',
        path: '/inquiry',
        depth2: [
            { title: 'CONTACT US', path: '/inquiry' },
        ],
    },
];

function Header() {
    const [isGnbOpen, setGnbOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) { // Standard breakpoint for desktop
                setGnbOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMobileSubmenuToggle = (e, index) => {
        e.preventDefault(); // Prevent page navigation
        setActiveMobileSubmenu(activeMobileSubmenu === index ? null : index);
    };

    return (
        <div className={`header-primary-wrap ${isGnbOpen ? 'mobile-gnb-open' : ''}`}>
            <h1>
                <Link className="logo" to="/">
                    <img src="/src/assets/images/cm-logo.png" alt="(주)잇츠비솔루션" />
                </Link>
            </h1>

            <div className="gnb">
                <nav className="nav">
                    <ul className="depth1">
                        {menuItems.map((item, index) => (
                            <li key={index} className={activeMobileSubmenu === index ? 'submenu-open' : ''}>
                                <Link to={item.path} onClick={(e) => handleMobileSubmenuToggle(e, index)}><span>{item.title}</span></Link>
                                {item.depth2 && (
                                    <ul className="depth2">
                                        {item.depth2.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                                <Link to={subItem.path}>{subItem.title}</Link>
                                                {subItem.depth3 && (
                                                    <ul className="depth3">
                                                        {subItem.depth3.map((subItem3, subIndex3) => (
                                                            <li key={subIndex3}>
                                                                <Link to={subItem3.path}>{subItem3.title}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="close">
                    <button type="button" onClick={() => setGnbOpen(false)}>
                        <span className="circle"></span>
                        <span className="blind">전체메뉴 닫기</span>
                    </button>
                </div>
            </div>

            <div className="hamburger">
                <button type="button" onClick={() => setGnbOpen(true)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="blind">전체메뉴 열기</span>
                </button>
            </div>
        </div>
    );
}

export default Header;