import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// component import
import IntroduceImg from '@/elements/About/IntroduceImg';
import Introduce from '@/elements/About/Introduce';
import Value from '@/elements/About/Value';
import CEO from '@/elements/About/CEO';
import History from '@/elements/About/History';

// assets import
import '@/styles/About.css';
import '@/styles/Scroll_nav.css';

const aboutSections = [
    { id: 'introduce', title: '회사소개' },
    { id: 'value', title: '가치체계' },
    { id: 'history', title: '회사연혁' },
    { id: 'CEO', title: 'CEO 인사말' },
];

function About() {
    const [activeSection, setActiveSection] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRefs = useRef({});
    const location = useLocation();

    const handleScroll = () => {
        // Active section logic
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let currentSection = '';
        aboutSections.forEach(section => {
            const ref = sectionRefs.current[section.id];
            if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
                currentSection = section.id;
            }
        });
        if (currentSection) {
            setActiveSection(currentSection);
        }

        // Progress bar logic
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (windowHeight > 0) {
            const progress = (totalScroll / windowHeight) * 100;
            setScrollProgress(progress);
        } else {
            setScrollProgress(0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = sectionRefs.current[id];
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Adjust for header height
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const hash = location.hash.substring(1);
        if (hash) {
            const timer = setTimeout(() => {
                scrollToSection(hash);
                setActiveSection(hash);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [location.hash]);

    return (
        <div className="about-page">
            <nav className="scroll-nav about-scroll-nav">
                <ul className="scroll-nav-list">
                    {aboutSections.map(section => (
                        <li key={section.id} className={activeSection === section.id ? 'active' : ''} onClick={() => scrollToSection(section.id)}>
                            <span>{section.title}</span>
                        </li>
                    ))}
                </ul>
            </nav>

            <main>
                <IntroduceImg />
                <div ref={el => sectionRefs.current['introduce'] = el}><Introduce /></div>
                <div ref={el => sectionRefs.current['value'] = el}><Value /></div>
                <div ref={el => sectionRefs.current['history'] = el}><History /></div>
                <div ref={el => sectionRefs.current['CEO'] = el}><CEO /></div>
            </main>
        </div>
    );
}

export default About;