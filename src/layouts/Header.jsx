import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
    const [isGnbOpen, setGnbOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
    const [isScrolled, setScrolled] = useState(false);
    const [isHeaderHovered, setIsHeaderHovered] = useState(false);
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
                { title: t('menu.contact_us'), path: '/support' },
                { title: t('menu.faq'), path: '/support/faq' },
                { title: t('menu.one_on_one'), path: '/support/inquiry' },
            ],
        },
    ];

    // 관리자 메뉴 추가 (EMPLOYEE 또는 ADMIN만)
    const adminMenuItem = user && (user.role === 'EMPLOYEE' || user.role === 'ADMIN') ? {
        title: user.role === 'ADMIN' ? '인사관리시스템' : '인사 서비스',
        path: '/admin',
        depth2: user.role === 'ADMIN' ? [
            { title: '발급 현황 관리', path: '/admin/employee-certificate/manage' },
            { title: '이용 통계', path: '/admin/statistics' },
            { title: '임직원 명부', path: '/admin/users' },
            { title: '시스템 설정', path: '/admin/settings' },
            { title: '내 정보', path: '/admin/my-profile' },
        ] : [
            { title: '재직증명서 발급', path: '/admin/employee-certificate' },
            { title: '내 정보', path: '/admin/my-profile' },
        ],
    } : null;

    // 고객지원 다음에 관리자 메뉴 삽입
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

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const currentLang = i18n.language;

    // 테마에 따른 클래스 결정
    const headerClasses = `header-primary-wrap ${isGnbOpen ? 'mobile-gnb-open' : ''} ${isScrolled || isDarkThemePage ? 'scrolled' : ''} ${isDarkThemePage ? 'force-dark' : ''}`;

    return (
        <div
            className={headerClasses}
            onMouseEnter={() => window.innerWidth > 1024 && setIsHeaderHovered(true)}
            onMouseLeave={() => window.innerWidth > 1024 && setIsHeaderHovered(false)}
        >
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
                <nav className="nav">
                    <ul className="depth1">
                        {menuItems.map((item, index) => {
                            const isActiveDepth1 = location.pathname === item.path.split('#')[0];
                            return (
                                <li key={index} className={`${isActiveDepth1 ? 'active' : ''}`}>
                                    <Link to={item.path} onClick={handleMenuClick}><span>{item.title}</span></Link>
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
                        <div className={`language-selector ${isGnbOpen ? 'mobile-visible' : ''}`}>
                            <span className="lang-current">
                                {{ ko: 'KOR', en: 'ENG', zh: 'CHN', ja: 'JPN' }[currentLang] ?? 'KOR'}
                                <span className="lang-arrow" />
                            </span>
                            <ul className="lang-dropdown">
                                {[
                                    { code: 'ko', label: 'KOR' },
                                    { code: 'en', label: 'ENG' },
                                    { code: 'zh', label: 'CHN' },
                                    { code: 'ja', label: 'JPN' },
                                ].map(({ code, label }) => (
                                    <li key={code} className={currentLang === code ? 'active' : ''} onClick={() => changeLanguage(code)}>
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={`user-menu ${isGnbOpen ? 'mobile-visible' : ''}`}>
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
                <div className="close">
                    <button type="button" onClick={() => setGnbOpen(false)}>
                        <span className="circle"></span>
                        <span className="blind">{t('menu.close_menu')}</span>
                    </button>
                </div>
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
