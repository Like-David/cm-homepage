import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '@/styles/SolutionPage.css';
import '@/styles/Scroll_nav.css';
import { showSolutionPopup } from '@/services/Solutions/Solution.js';
import SolutionCard from '../components/Solution/SolutionCard';
import SolutionModal from '../components/Solution/SolutionModal';
import Button from 'react-bootstrap/Button';

// Image Imports
import solutionImage1 from '@/assets/images/Solution/rx.png';
import solutionImage2 from '@/assets/images/Solution/rx-cert.png';
import solutionImage3 from '@/assets/images/Solution/rx-loan.png';
import bannerBg from '@/assets/images/Solution/solution-banner-bg.png';
import flow from '@/assets/images/Solution/flow.png';
import certFlow from '@/assets/images/Solution/rx-cert-flow.png';
import loanFlow from '@/assets/images/Solution/rx-loan-flow.png';

const SolutionPage = () => {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  
  const solutions = [
    {
      id: 'report-express',
      image: solutionImage1,
      title: t('solutions.report_express.title'),
      subtitle: t('solutions.report_express.subtitle'),
      oneLiner: t('solutions.report_express.oneLiner'),
      overview: t('solutions.report_express.overview'),
      keyFeatures: t('solutions.report_express.features', { returnObjects: true }),
      strengths: t('solutions.report_express.strengths'),
      workflow: flow,
      catchyPhrase: t('solutions.report_express.catchyPhrase'),
    },
    {
      id: 'rx-cert',
      image: solutionImage2,
      title: t('solutions.rx_cert.title'),
      subtitle: t('solutions.rx_cert.subtitle'),
      oneLiner: t('solutions.rx_cert.oneLiner'),
      overview: t('solutions.rx_cert.overview'),
      keyFeatures: t('solutions.rx_cert.features', { returnObjects: true }),
      strengths: t('solutions.rx_cert.strengths'),
      workflow: certFlow,
      catchyPhrase: t('solutions.rx_cert.catchyPhrase'),
    },
    {
      id: 'rx-loan',
      image: solutionImage3,
      title: t('solutions.rx_loan.title'),
      subtitle: t('solutions.rx_loan.subtitle'),
      oneLiner: t('solutions.rx_loan.oneLiner'),
      overview: t('solutions.rx_loan.overview'),
      keyFeatures: t('solutions.rx_loan.features', { returnObjects: true }),
      strengths: t('solutions.rx_loan.strengths'),
      workflow: loanFlow,
      catchyPhrase: t('solutions.rx_loan.catchyPhrase'),
    },
  ];

  const [activeSection, setActiveSection] = useState(solutions[0].id);
  const sectionRefs = useRef({});
  const ctaRef = useRef(null);
  const location = useLocation();

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let currentSection = '';

    // CTA 섹션 체크
    if (ctaRef.current) {
      const ctaTop = ctaRef.current.offsetTop;
      const ctaHeight = ctaRef.current.offsetHeight;
      if (ctaTop <= scrollPosition && ctaTop + ctaHeight > scrollPosition) {
        currentSection = 'test-demo';
      }
    }

    // 솔루션 섹션 체크 (CTA가 활성화되지 않은 경우에만)
    if (!currentSection) {
      solutions.forEach(solution => {
        const ref = sectionRefs.current[solution.id];
        if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
          currentSection = solution.id;
        }
      });
    }

    if (currentSection) {
      setActiveSection(currentSection);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToSection = (id) => {
    let element;
    if (id === 'test-demo') {
      element = ctaRef.current;
    } else {
      element = sectionRefs.current[id];
    }

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="solution-page">
      <nav className="scroll-nav">
        <ul className="scroll-nav-list">
          {solutions.map(solution => (
            <li key={solution.id} className={activeSection === solution.id ? 'active' : ''} onClick={() => scrollToSection(solution.id)}>
              <span>{solution.subtitle}</span>
            </li>
          ))}
          <li className={activeSection === 'test-demo' ? 'active' : ''} onClick={() => scrollToSection('test-demo')}>
            <span>{t('solutions.test_demo')}</span>
          </li>
        </ul>
      </nav>

      <main className="solution-content">
        <section className="solution-intro" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bannerBg})`
        }}>
          <div className="container">
            <h2>{t('menu.solutions')}</h2>
            <p>
              <strong>{t('footer.company_name')}</strong>{t('about.ceo.company_name_suffix', { defaultValue: '은' })} {t('solutions.intro_1', { defaultValue: '전자문서, 보안, 약정관리 분야의 첨단 IT 기술로 기업의 업무 효율과 신뢰성을 혁신합니다.' })}
            </p>
            <p>
              {t('solutions.intro_2', { defaultValue: '디지털 전환 시대에 최적화된 통합 솔루션 포트폴리오로 비즈니스 경쟁력을 한 단계 강화하세요.' })}
            </p>
          </div>
        </section>

        <div className="solution-details-container">
          {solutions.map((solution) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              ref={el => sectionRefs.current[solution.id] = el}
            />
          ))}
        </div>

        <section className="solution-cta" ref={ctaRef}>
          <div className="container">
            <h3>{t('solutions.cta_title')}</h3>
            <p>{t('solutions.cta_subtitle')}</p>
              <Button onClick={() => setModalShow(true)}>
                  {t('solutions.test_demo')}
              </Button>

              <SolutionModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  onSubmit={data => {
                      showSolutionPopup(data);
                  }}
              />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SolutionPage;
