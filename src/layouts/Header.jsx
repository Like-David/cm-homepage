import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/common/LoginModal';
import RegisterModal from '@/components/common/RegisterModal';
import AlertModal from '@/components/common/AlertModal';
import '@/styles/Header.css';
import logo from '@/assets/images/Header/cm-logo-new.png';
import logoNavy from '@/assets/images/Header/cm-logo-navy.png';

function Header() {
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isGnbOpen, setGnbOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
    const [isScrolled, setScrolled] = useState(false);
    const [isMenuHovered, setIsMenuHovered] = useState(false);
    const gnbTimerRef = useRef(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [alert, setAlert] = useState({ isOpen: false, type: 'success', message: '', title: '' });
    const location = useLocation();

    // /support 또는 /admin 으로 시작하는 페이지인지 확인
    const isDarkThemePage = location.pathname.startsWith('/support') || location.pathname.startsWith('/admin');

    const handleShowAlert = (alertData) => {
        setAlert({ isOpen: true, ...alertData });
    };

    const handleCloseAlert = () => {
        setAlert({ isOpen: false, type: 'success', message: '', title: '' });
    };

    const handleLogout = () => {
        navigate('/');
        logout();
        handleShowAlert({
            type: 'success',
            message: t('auth.logout_success')
        });
    };

    const baseMenuItems = [
        {
            title: t('menu.about'),
            path: '/about',
            depth2: [
                { title: t('menu.company_intro'), path: '/about#introduce' },
                { title: t('menu.value_system'), path: '/about#value' },
                { title: t('menu.history'), path: '/about#history' },
                { title: t('menu.ceo_message'), path: '/about#CEO' },
            ],
        },
        {
            title: t('menu.solutions'),
            path: '/solution',
            depth2: [
                {
                    title: t('menu.eform'),
                    path: '/solution',
                    depth3: [
                        { title: t('menu.report_sol'), path: '/solution#report-express' },
                        { title: t('menu.cert_sol'), path: '/solution#rx-cert' },
                        { title: t('menu.loan_sol'), path: '/solution#rx-loan' }
                    ]
                },
                { title: t('solutions.test_demo'), path: '/solution#test-demo' },
            ],
        },
        {
            title: t('menu.business'),
            path: '/business/client',
            depth2: [
                { title: t('menu.financial'), path: '/business/client#financial-institutions' },
                { title: t('menu.educational'), path: '/business/client#financial2-institutions' },
                { title: t('menu.public'), path: '/business/client#public-institutions' }
            ],
        },
        {
            title: t('menu.support'),
            path: '/support',
            depth2: [
                { title: t('menu.faq'), path: '/support/faq' },
                { title: t('support.board_title'), path: '/support' },
                { title: t('menu.remote_support'), path: '/support/inquiry' },
                { title: t('menu.resources'), path: '/support/resources' },
            ],
        },
    ];
// 관리자 메뉴 추가 (EMPLOYEE 또는 ADMIN만)
const adminMenuItem = user && (user.role === 'EMPLOYEE' || user.role === 'ADMIN') ? {
    title: user.role === 'ADMIN' ? t('admin.hr_management_system') : t('admin.hr_services'),
    path: '/admin',
    depth2: user.role === 'ADMIN' ? [
        { title: t('admin.employee_certificate'), path: '/admin/employee-certificate/manage' },
        { title: t('admin.create_certificate'), path: '/admin/employee-certificate' },
        { title: t('admin.statistics'), path: '/admin/statistics' },
        { title: t('admin.user_management'), path: '/admin/users' },
        { title: t('admin.my_profile'), path: '/admin/my-profile' },
    ] : [
        { title: t('admin.create_certificate'), path: '/admin/employee-certificate' },
        { title: t('admin.my_profile'), path: '/admin/my-profile' },
    ],
} : null;

    // 고객지원 다음에 관리자 메뉴 삽입 (복구)
    const menuItems = adminMenuItem
        ? [...baseMenuItems, adminMenuItem]
        : baseMenuItems;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            if (window.innerWidth > 1024) {
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

    useEffect(() => {
        setGnbOpen(false);
        setActiveMobileSubmenu(null);
    }, [location]);

    const handleMobileSubmenuToggle = (e, index) => {
        if (window.innerWidth <= 1024) {
            // No longer toggling, just allowing navigation if it's a link
            // or preventing default if we want it to just be a header (JobKorea style)
            // But user said "all menus expanded", so we just show them.
        }
    };

    const handleMenuClick = () => {
        if (window.innerWidth <= 1024) {
            setGnbOpen(false);
        }
    };

    const handleDepth1Click = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.innerWidth <= 1024) {
            setGnbOpen(false);
        }
    };

    const handleMenuEnter = useCallback(() => {
        if (window.innerWidth > 1024) {
            clearTimeout(gnbTimerRef.current);
            setIsMenuHovered(true);
        }
    }, []);

    const handleMenuLeave = useCallback(() => {
        if (window.innerWidth > 1024) {
            gnbTimerRef.current = setTimeout(() => setIsMenuHovered(false), 80);
        }
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const currentLang = i18n.language;

    // 테마에 따른 클래스 결정
    const headerClasses = `header-primary-wrap ${isGnbOpen ? 'mobile-gnb-open' : ''} ${isScrolled || isDarkThemePage ? 'scrolled' : ''} ${isDarkThemePage ? 'force-dark' : ''} ${isMenuHovered ? 'gnb-expanded' : ''}`;

    return (
        <div className={headerClasses}>
            <h1>
                <Link to="/" onClick={handleMenuClick}>
                    <img 
                        className="logo" 
                        src={logo} 
                        alt={t('footer.company_name')} 
                    />
                </Link>
            </h1>

            <div className="gnb">
                <div className="mobile-top-bar">
                    <div className="mobile-language-selector">
                        <button 
                            className={`lang-btn ${currentLang === 'ko' ? 'active' : ''}`}
                            onClick={() => changeLanguage('ko')}
                        >
                            {currentLang === 'ko' ? '한국어' : 'KO'}
                        </button>
                        <span className="lang-divider">|</span>
                        <button 
                            className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                            onClick={() => changeLanguage('en')}
                        >
                            {currentLang === 'ko' ? '영어' : 'EN'}
                        </button>
                    </div>
                    <div className="close">
                        <button type="button" onClick={() => setGnbOpen(false)}>
                            <span className="circle"></span>
                            <span className="blind">{t('menu.close_menu')}</span>
                        </button>
                    </div>
                </div>
                <nav className="nav">
                    <ul className="depth1">
                        {menuItems.map((item, index) => {
                            const isActiveDepth1 = location.pathname === item.path.split('#')[0];
                            return (
                                <li key={index} className={`${isActiveDepth1 ? 'active' : ''}`}
                                    onMouseEnter={handleMenuEnter}
                                    onMouseLeave={handleMenuLeave}
                                >
                                    <Link to={item.path} onClick={handleDepth1Click}><span>{item.title}</span></Link>
                                    {item.depth2 && (
                                        <ul className="depth2">
                                            {item.depth2.map((subItem, subIndex) => {
                                                const isActiveDepth2 = location.pathname + location.hash === subItem.path;
                                                return (
                                                    <li key={subIndex} className={`${isActiveDepth2 ? 'active' : ''} ${subItem.depth3 ? 'has-depth3' : ''}`}>
                                                        <Link to={subItem.path} onClick={handleMenuClick}>{subItem.title}</Link>
                                                        {subItem.depth3 && (
                                                            <ul className="depth3">
                                                                {subItem.depth3.map((thirdItem, thirdIndex) => (
                                                                    <li key={thirdIndex}>
                                                                        <Link to={thirdItem.path} onClick={handleMenuClick}>{thirdItem.title}</Link>
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

                    <div className="nav-right-section">
                        <div className="language-selector"
                            onMouseEnter={handleMenuEnter}
                            onMouseLeave={handleMenuLeave}
                        >
                            <span className="lang-current">
                                {t(`lang.${currentLang}`) || '한국어'}
                                <span className="lang-arrow" />
                            </span>
                            <ul className="lang-dropdown">
                                {['ko', 'en'].map((code) => (
                                    <li key={code} className={currentLang === code ? 'active' : ''} onClick={() => changeLanguage(code)}>
                                        {t(`lang.${code}`)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="user-menu desktop-only">
                            {user ? (
                                <>
                                    <span className="user-name">{user.name}</span>
                                    <span className="divider">|</span>
                                    <span className="logout-btn" onClick={handleLogout}>{t('auth.logout')}</span>
                                </>
                            ) : (
                                <span className="login-btn" onClick={() => setShowLoginModal(true)}>{t('auth.login')}</span>
                            )}
                        </div>
                    </div>
                </nav>
            </div>

            <div className="hamburger">
                <button type="button" onClick={() => setGnbOpen(true)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="blind">{t('menu.open_menu')}</span>
                </button>
            </div>

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onShowRegister={() => setShowRegisterModal(true)}
                onShowAlert={handleShowAlert}
            />

            <RegisterModal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onShowLogin={() => setShowLoginModal(true)}
                onShowAlert={handleShowAlert}
            />

            <AlertModal
                isOpen={alert.isOpen}
                onClose={handleCloseAlert}
                type={alert.type}
                message={alert.message}
                title={alert.title}
            />

        </div>
    );
}

export default Header;
