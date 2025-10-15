import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import '@/styles/Header.css';
import logo from '@/assets/images/Header/cm-logo.png';
import logoNavy from '@/assets/images/Header/cm-logo-navy.png';

// Provided example structure translated into a data object
const menuItems = [
    {
        title: 'ABOUT',
        path: '/about#introduce',
        depth2: [
            { title: '회사소개', path: '/about#introduce' },
            { title: '가치체계', path: '/about#value' },
            { title: '회사연혁', path: '/about#hsitory' },
            { title: 'CEO 인사말', path: '/about#CEO' },
            /*{ title: '오시는 길', path: '/about#location' },*/
        ],
    },
    {
        title: 'BUSINESS',
        path: '/business/client',
        depth2: [
            { title: '금융기관', path: '/business/client#financial-institutions' },
            { title: '공공기관', path: '/business/client#public-institutions' },
            { title: '교육기관', path: '/business/client#educational-institutions' }
        ],
    },
    {
        title: 'SOLUTIONS',
        path: '/solution#report-express',
        depth2: [
            { title: 'ReportExpress Enterprise', path: '/solution#report-express' },
            { title: 'RX-Cert', path: '/solution#rx-cert' },
            { title: 'RX Loan', path: '/solution#rx-loan' }
        ],
    },
    {
        title: 'SUPPORT',
        path: '/support',
        depth2: [
            { title: 'CONTACT US', path: '/support' },
        ],
    },
];

function Header() {
    const [isGnbOpen, setGnbOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
    const [isScrolled, setScrolled] = useState(false);
    const [isHeaderHovered, setIsHeaderHovered] = useState(false); // New state
    const location = useLocation(); // Get current location

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
        //e.preventDefault(); // Prevent page navigation
        setActiveMobileSubmenu(activeMobileSubmenu === index ? null : index);
    };

    return (
        <div
            className={`header-primary-wrap ${isGnbOpen ? 'mobile-gnb-open' : ''} ${isScrolled ? 'scrolled' : ''}`}
            onMouseEnter={() => window.innerWidth > 1024 && setIsHeaderHovered(true)} // Only for desktop
            onMouseLeave={() => window.innerWidth > 1024 && setIsHeaderHovered(false)} // Only for desktop
        >
            <h1>
                <Link to="/"><img className="logo" src={ isScrolled || isGnbOpen || isHeaderHovered ? logoNavy : logo } alt="(주)씨엠이노베이션" /></Link>
            </h1>


            <div className="gnb">
                <nav className="nav">
                    <ul className="depth1">
                        {menuItems.map((item, index) => {
                            // Determine if depth1 item is active
                            const isActiveDepth1 = location.pathname === item.path.split('#')[0];
                            return (
                                <li key={index} className={`${activeMobileSubmenu === index ? 'submenu-open' : ''} ${isActiveDepth1 ? 'active' : ''}`}>
                                    <Link to={item.path} onClick={(e) => handleMobileSubmenuToggle(e, index)}><span>{item.title}</span></Link>
                                    {item.depth2 && (
                                        <ul className="depth2">
                                            {item.depth2.map((subItem, subIndex) => {
                                                // Determine if depth2 item is active
                                                const isActiveDepth2 = location.pathname + location.hash === subItem.path;
                                                return (
                                                    <li key={subIndex} className={isActiveDepth2 ? 'active' : ''}>
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
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
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