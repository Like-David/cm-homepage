import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '@/styles/Header.css';
import logo from '@/assets/images/Header/cm-logo.png';
import logoNavy from '@/assets/images/Header/cm-logo-navy.png';

function Header() {
    const { t, i18n } = useTranslation();
    const [isGnbOpen, setGnbOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
    const [isScrolled, setScrolled] = useState(false);
    const [isHeaderHovered, setIsHeaderHovered] = useState(false);
    const location = useLocation();

    const menuItems = [
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
            title: t('menu.business'),
            path: '/business/client',
            depth2: [
                { title: t('menu.financial'), path: '/business/client#financial-institutions' },
                { title: t('menu.educational'), path: '/business/client#financial2-institutions' },
                { title: t('menu.public'), path: '/business/client#public-institutions' }
            ],
        },
        {
            title: t('menu.solutions'),
            path: '/solution',
            depth2: [
                { title: t('menu.report_express'), path: '/solution#report-express' },
                { title: t('menu.rx_cert'), path: '/solution#rx-cert' },
                { title: t('menu.rx_loan'), path: '/solution#rx-loan' }
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

    const handleMobileSubmenuToggle = (e, index) => {
        setActiveMobileSubmenu(activeMobileSubmenu === index ? null : index);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const currentLang = i18n.language;

    return (
        <div
            className={`header-primary-wrap ${isGnbOpen ? 'mobile-gnb-open' : ''} ${isScrolled ? 'scrolled' : ''}`}
            onMouseEnter={() => window.innerWidth > 1024 && setIsHeaderHovered(true)}
            onMouseLeave={() => window.innerWidth > 1024 && setIsHeaderHovered(false)}
        >
            <h1>
                <Link to="/"><img className="logo" src={ isScrolled || isGnbOpen || isHeaderHovered ? logoNavy : logo } alt={t('footer.company_name')} /></Link>
            </h1>

            <div className={`language-selector ${isGnbOpen ? 'mobile-visible' : ''}`}>
                <span className={currentLang === 'ko' ? 'active' : ''} onClick={() => changeLanguage('ko')}>KOR</span>
                <span className="divider">|</span>
                <span className={currentLang === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>ENG</span>
                <span className="divider">|</span>
                <span className={currentLang === 'zh' ? 'active' : ''} onClick={() => changeLanguage('zh')}>CHN</span>
                <span className="divider">|</span>
                <span className={currentLang === 'ja' ? 'active' : ''} onClick={() => changeLanguage('ja')}>JPN</span>
            </div>

            <div className="gnb">
                <nav className="nav">
                    <ul className="depth1">
                        {menuItems.map((item, index) => {
                            const isActiveDepth1 = location.pathname === item.path.split('#')[0];
                            return (
                                <li key={index} className={`${activeMobileSubmenu === index ? 'submenu-open' : ''} ${isActiveDepth1 ? 'active' : ''}`}>
                                    <Link to={item.path} onClick={(e) => handleMobileSubmenuToggle(e, index)}><span>{item.title}</span></Link>
                                    {item.depth2 && (
                                        <ul className="depth2">
                                            {item.depth2.map((subItem, subIndex) => {
                                                const isActiveDepth2 = location.pathname + location.hash === subItem.path;
                                                return (
                                                    <li key={subIndex} className={isActiveDepth2 ? 'active' : ''}>
                                                        <Link to={subItem.path}>{subItem.title}</Link>
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
        </div>
    );
}

export default Header;
