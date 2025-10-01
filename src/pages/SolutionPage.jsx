import React from 'react';
import '../styles/SolutionPage.css'; // CSS 파일을 import 합니다.
import solutionImage1 from '@/assets/images/Solution/rx.png';
import solutionImage2 from '@/assets/images/Solution/rx-cert.png';
import solutionImage3 from '@/assets/images/Solution/rx-loan.png';

// 솔루션 데이터 구조화
const solutions = [
  {
    id: 'report-express',
    image: solutionImage1,
    title: '전자문서(웹리포팅) 솔루션',
    subtitle: 'ReportExpress Enterprise',
    description: '전자문서 생성부터 보관까지, Non-ActiveX 기반 올인원 시스템',
    features: ['전용 서식 툴 개발', 'PKI 전자서명', 'PDF 변환 / 타임스탬프', '이미지 뷰어 제공'],
    advantages: ['#HTML5 기반', '#부인방지서명', '#Multi Platform'],
    flowImage: '/path/to/flow-image-1.png', // 실제 이미지 경로로 교체해야 합니다.
  },
  {
    id: 'rx-cert',
    image: solutionImage2,
    title: '증명서 위·변조방지 솔루션',
    subtitle: 'RX-Cert',
    description: '암호화 바코드와 QR코드를 통한 위변조 방지 전자증명 솔루션',
    features: ['2D 바코드 암호화', 'PKI 전자서명', 'QR 원본 확인', '모바일 검증 앱'],
    advantages: ['#DES암호화', '#NonActiveX', '#모바일검증'],
    flowImage: '/path/to/flow-image-2.png', // 실제 이미지 경로로 교체해야 합니다.
  },
  {
    id: 'rx-loan',
    image: solutionImage3,
    title: '여신약정 솔루션',
    subtitle: 'RX Loan',
    description: '한/글(HWP) UI를 지원하는 전자약정 통합 솔루션',
    features: ['HWP UI 호환', '자동 페이지 나눔', 'PDF/Excel 다운로드', '다양한 스크립트 및 차트'],
    advantages: ['#한글UI', '#HTML5기반', '#자동페이지분리'],
    flowImage: '/path/to/flow-image-3.png', // 실제 이미지 경로로 교체해야 합니다.
  },
];

const SolutionPage = () => {
  const scrollToAnchor = (anchorId) => {
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="solution-page">
      {/* 1. 상단 인트로 섹션 */}
      <section className="solution-intro">
        <div className="container">
          <h2>SOLUTION</h2>
          <p>디지털 산업을 이끄는 CM Innovation의 핵심 솔루션</p>
          <p>다양한 산업군에 최적화된 전자문서·보안·약정 관리 시스템</p>
        </div>
      </section>

      {/* 2. 솔루션 이미지 그리드 섹션 */}
      <section className="solution-grid">
        <div className="container">
          {solutions.map((solution) => (
            <div key={solution.id} className="solution-item" onClick={() => scrollToAnchor(solution.id)}>
              <img src={solution.image} alt={solution.title} />
              <div className="solution-overlay">
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 솔루션 상세 섹션 */}
      <div className="solution-details-container">
        {solutions.map((solution) => (
          <section key={solution.id} id={solution.id} className="solution-detail">
            <div className="container">
              <div className="detail-header">
                <h2>{solution.title}</h2>
                <h3>{solution.subtitle}</h3>
              </div>
              <p className="description">{solution.description}</p>
              
              <div className="detail-content">
                <div className="features">
                  <h4>주요 기능</h4>
                  <ul>
                    {solution.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="advantages">
                  <h4>특장점</h4>
                  <div className="tags">
                    {solution.advantages.map((advantage, index) => (
                      <span key={index} className="tag">{advantage}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 흐름도 이미지는 실제 이미지가 준비되면 여기에 추가합니다. */}
              {/* <div className="flow-image">
                <img src={solution.flowImage} alt={`${solution.title} 흐름도`} />
              </div> */}
            </div>
          </section>
        ))}
      </div>

      {/* 4. 문의 CTA 섹션 */}
      <section className="solution-cta">
        <div className="container">
          <h3>솔루션 도입을 검토 중이신가요?</h3>
          <p>전문가와 상담해보세요.</p>
          <button>문의하기</button>
        </div>
      </section>
    </div>
  );
};

export default SolutionPage;