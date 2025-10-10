import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/Header.css';
import logo from '@/assets/images/Header/cm-logo.png';
import logoNavy from '@/assets/images/Header/cm-logo-navy.png';

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
        title: 'COMPANY',
        path: '/business/client',
        depth2: [
            { title: '고객사', path: '/business/client' }
        ],
    },
    {
        title: 'SOLUTIONS',
        path: '/product/web',
        depth2: [
            { title: 'ReportExpress Enterprise', path: '/product/web' },
            { title: 'RX-Cert', path: '/product/database' },
            { title: 'RX Loan', path: '/product/network' }
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
    const [isScrolled, setScrolled] = useState(false);
    const [isHeaderHovered, setIsHeaderHovered] = useState(false); // New state

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            if (window.innerWidth > 1024) { // Standard breakpoint for desktop
                setGnbOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleMobileSubmenuToggle = (e, index) => {
        e.preventDefault(); // Prevent page navigation
        setActiveMobileSubmenu(activeMobileSubmenu === index ? null : index);
    };

    return (
        <div
            className={`header-primary-wrap ${isGnbOpen ? 'mobile-gnb-open' : ''} ${isScrolled ? 'scrolled' : ''}`}
            onMouseEnter={() => window.innerWidth > 1024 && setIsHeaderHovered(true)} // Only for desktop
            onMouseLeave={() => window.innerWidth > 1024 && setIsHeaderHovered(false)} // Only for desktop
        >
            <h1>
                <img className="logo" src={ isScrolled || isGnbOpen || isHeaderHovered ? logoNavy : logo } alt="(주)씨엠이노베이션" />
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