import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/SolutionPage.css';
import SolutionCard from '../components/Solution/SolutionCard';

// Image Imports
import solutionImage1 from '@/assets/images/Solution/rx.png';
import solutionImage2 from '@/assets/images/Solution/rx-cert.png';
import solutionImage3 from '@/assets/images/Solution/rx-loan.png';
import bannerBg from '@/assets/images/Solution/solution-banner-bg.png';
import flow from '@/assets/images/Solution/flow.png';
import certFlow from '@/assets/images/Solution/rx-cert-flow.png';
import loanFlow from '@/assets/images/Solution/rx-loan-flow.png';

const solutions = [
  {
    id: 'report-express',
    image: solutionImage1,
    title: '전자문서(웹리포팅) 솔루션',
    subtitle: 'ReportExpress Enterprise',
    oneLiner: '전자문서의 생성, 조회, 변환, 보관을 한 번에 처리하는 Non-ActiveX 기반 All-in-One 통합 전자문서 시스템',
    overview: 'ReportExpress Enterprise는 기업 내 모든 전자문서 업무를 웹 환경에서 통합 관리하는 최적의 웹리포팅 솔루션입니다. **HTML5 웹 표준 기술**을 기반으로 문서 생성부터 전자서명, 안전한 보관까지 전 과정을 지원하며, 국제적인 **PDF 표준**을 철저히 준수합니다. 공공기관, 금융기관 등 다양한 비즈니스 환경에 맞춰 최적의 커스터마이징 및 유연한 확장성을 보장합니다.',
    keyFeatures: [
      { type: '기술력', text: '전용 서식 툴을 이용한 직관적인 서식 개발 환경 제공' },
      { type: '신뢰성', text: 'PKI 전자서명 및 타임스탬프 인증 기능으로 문서 진본성 확보' },
      { type: '효율성', text: 'PDF 전자문서 생성 및 장기 보관 시스템 지원' },
      { type: '기술력', text: '이미지 변환 기능 및 고성능 전용 뷰어 제공' },
      { type: '확장성', text: 'Non-ActiveX / No Plugin 기반의 웹 표준 아키텍처' },
      { type: '확장성', text: '멀티 플랫폼(OS/브라우저) 지원으로 완벽한 접근성 보장' },
    ],
    strengths: '모든 환경에서 별도 설치 없이 동작하는 진정한 웹 표준 솔루션으로 탁월한 **기술력**과 **확장성**을 제공합니다. 부인방지를 위한 전자서명값 삽입 및 인증서 검증 기능을 내장하여 문서의 **신뢰성**을 극대화합니다. EDMS 등 타 시스템과의 완벽한 연동을 통해 문서 유통 및 관리의 **효율성**을 자동화합니다.',
    workflow: flow,
    catchyPhrase: '💡 웹 표준 기반의 통합 전자문서 시스템으로 비즈니스의 효율성과 신뢰성을 한 차원 높이세요.',
  },
  {
    id: 'rx-cert',
    image: solutionImage2,
    title: '증명서 위·변조방지 솔루션',
    subtitle: 'RX-Cert',
    oneLiner: '암호화 바코드와 QR코드를 통해 문서의 진본성을 보장하는 강력한 위변조 방지 전자증명 솔루션',
    overview: 'RX-Cert는 각종 증명서, 자격증, 계약서 등의 중요한 문서에 대한 진위 여부를 완벽하게 검증할 수 있는 최첨단 **보안 문서 솔루션**입니다. 2D 고밀도 바코드, QR코드, **PKI 전자서명 기술**을 적용하여 위·변조 시도를 원천적으로 차단합니다. 문서의 발급부터 조회, 검증까지 전 과정을 실시간 온라인 서비스로 제공하여 업무의 **신뢰성**과 **효율성**을 확보합니다.',
    keyFeatures: [
      { type: '신뢰성', text: '2D 고밀도 바코드 기술을 통한 문서 정보의 강력한 암호화' },
      { type: '효율성', text: 'QR코드를 이용한 즉각적이고 간편한 원본 확인 서비스 제공' },
      { type: '신뢰성', text: 'PKI 전자서명 및 워터마크 삽입으로 문서 보안 강화' },
      { type: '기술력', text: '출력 제어 및 보안 전용 EXE 모듈 제공' },
      { type: '효율성', text: '모바일 앱을 통한 언제 어디서든 가능한 신속한 진위 검증' },
      { type: '확장성', text: 'HTML5 기반의 무설치 서비스로 사용자 접근성 극대화' },
    ],
    strengths: '일반 PDF 뷰어에서도 타임스탬프와 서명 검증이 가능하여 문서 **신뢰성** 및 보편적 **확장성**을 확보합니다. **DES 암호화 알고리즘** 기반의 강력한 보안 기술로 문서 위변조를 완벽하게 차단하는 **기술력**을 갖췄습니다. 디지털 키오스크 및 웹 API 연동을 지원하여 다양한 발급 환경에 유연하게 적용 가능한 **확장성**을 자랑합니다.',
    workflow: certFlow,
    catchyPhrase: '💡 고도의 암호화 기술이 적용된 증명서 위변조 방지 솔루션으로 핵심 문서의 보안 수준을 혁신하세요.',
  },
  {
    id: 'rx-loan',
    image: solutionImage3,
    title: '여신약정 솔루션',
    subtitle: 'RX Loan',
    oneLiner: '한글(HWP) UI를 완벽하게 지원하며 여신약정 업무를 통합 처리하는 효율적인 전자약정 플랫폼',
    overview: 'RX Loan은 금융 기관의 핵심 업무인 여신약정 과정을 혁신적으로 개선하는 **통합 전자약정 시스템**입니다. 사용자에게 친숙한 **한글(HWP) 문서 환경**을 웹 환경으로 완벽하게 구현했습니다. 약정서 작성부터 출력, 보고서 생성까지 모든 과정을 하나의 화면에서 처리할 수 있는 직관적인 인터페이스로 업무 **효율성**을 극대화하는 플랫폼입니다. 금융기관, 보험사, 공공기관 등의 다양한 약정 및 문서 작업에 최적화되어 있습니다.',
    keyFeatures: [
      { type: '효율성', text: '웹 한글(HWP) UI 지원으로 이질감 없는 작업 환경 제공' },
      { type: '기술력', text: '자동 페이지 나눔 및 복잡한 문서 병합 기능 지원' },
      { type: '신뢰성', text: 'DB 연동 출력 및 부인 방지를 위한 전자서명 기능 통합' },
      { type: '효율성', text: 'PDF·Excel 포맷의 보고서 다운로드 및 자동 생성 기능' },
      { type: '기술력', text: '다양한 차트 및 스크립트 지원으로 동적인 문서 구현 가능' },
      { type: '확장성', text: 'HTML5 기반, 설치 불필요한 무설치 아키텍처' },
    ],
    strengths: '사용자 친화적인 인터페이스로 빠른 문서 작성 및 검토가 가능하여 업무 처리 **효율성**을 혁신합니다. 입력 데이터 기반으로 약정 문서가 자동 생성되고 리포트 출력이 가능하여 휴먼 에러를 최소화하는 **기술력**을 갖췄습니다. 한글 호환 환경에서 문서 편집, 결재, 관리 기능을 통합하여 시스템의 **확장성**과 사용 편의성을 높였습니다.',
    workflow: loanFlow,
    catchyPhrase: `적용 사례
* 금융기관: 차세대 여신약정 자동화 시스템
* 보험사: 전자계약 관리 통합 플랫폼
* 공공기관: 결재 문서 및 보고서 출력 시스템 통합`
  },
];

const SolutionPage = () => {
  const [activeSection, setActiveSection] = useState(solutions[0].id);
  const sectionRefs = useRef({});

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      solutions.forEach(solution => {
        const ref = sectionRefs.current[solution.id];
        if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
          setActiveSection(solution.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section from URL hash on page load
  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash) {
      const timer = setTimeout(() => {
        scrollToSection(hash);
        setActiveSection(hash);
      }, 100); // Adjust delay as needed
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjust for header height
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="solution-page">
      {/* Right-side Scroll Navigation */}
      <nav className="scroll-nav">
        <ul>
          {solutions.map(solution => (
            <li key={solution.id} className={activeSection === solution.id ? 'active' : ''} onClick={() => scrollToSection(solution.id)}>
              <span>{solution.subtitle}</span>
            </li>
          ))}
        </ul>
      </nav>

      <main className="solution-content">
        {/* 1. 상단 인트로 섹션 */}
        <section className="solution-intro" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bannerBg})`
        }}>
          <div className="container">
            <h2>Solutions</h2>
            <p>
              <strong>씨엠이노베이션</strong>은 전자문서, 보안, 약정관리 분야의
              첨단 IT 기술로 기업의 업무 효율과 신뢰성을 혁신합니다.
            </p>
            <p>
              디지털 전환 시대에 최적화된 통합 솔루션 포트폴리오로
              비즈니스 경쟁력을 한 단계 강화하세요.
            </p>
          </div>
        </section>

        {/* 2. 솔루션 상세 섹션 */}
        <div className="solution-details-container">
          {solutions.map((solution) => (
            <SolutionCard 
              key={solution.id} 
              solution={solution} 
              ref={el => sectionRefs.current[solution.id] = el}
            />
          ))}
        </div>

        {/* 3. 문의 CTA 섹션 */}
        <section className="solution-cta">
          <div className="container">
            <h3>솔루션 도입을 검토 중이신가요?</h3>
            <p>전문가와 상담해보세요.</p>
            <button>문의하기</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SolutionPage;
