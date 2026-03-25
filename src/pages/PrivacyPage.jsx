import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '@/components/common/Banner';
import '@/styles/PolicyPage.css';

const PrivacyPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="policy-page">
            <Banner title={t('footer.privacy_policy')} subtitle={t('footer.company_name')} />
            <div className="policy-container">
                <header className="policy-header">
                    <h1>개인정보 처리방침</h1>
                </header>
                
                <article className="policy-content">
                    <p style={{ fontSize: '1.1rem', marginBottom: '40px', fontWeight: '500' }}>
                        씨엠이노베이션(은)는 개인정보 보호법 제30조에 따라 정보주체(고객)의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립·공개합니다.
                    </p>

                    <section className="policy-section">
                        <h2><span>1.</span> 개인정보의 처리목적</h2>
                        <p>씨엠이노베이션은(는) 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.</p>
                        <ul>
                            <li>고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급·배송 등</li>
                        </ul>
                    </section>

                    <section className="policy-section">
                        <h2><span>2.</span> 개인정보의 처리 및 보유기간</h2>
                        <p>① 씨엠이노베이션은(는) 정보주체로부터 개인정보를 수집할 때 동의받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                        <p>② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
                        <div className="policy-sub-content">
                            <ul>
                                <li>고객 가입 및 관리 : 서비스 이용계약 또는 회원가입 해지시까지, 다만 채권·채무관계 잔존시에는 해당 채권 채무관계 정산시까지</li>
                                <li>전자상거래에서의 계약·청약철회, 대금결제, 재화 등 공급기록 : 5년</li>
                            </ul>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2><span>3.</span> 개인정보의 제3자 제공</h2>
                        <p>씨엠이노베이션은(는) 정보주체의 별도 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우 외에는 개인정보를 제3자에게 제공하지 않습니다.</p>
                    </section>

                    <section className="policy-section">
                        <h2><span>4.</span> 개인정보처리의 위탁</h2>
                        <p>① 씨엠이노베이션은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 외부에 위탁하고 있습니다.</p>
                        <p>② 씨엠이노베이션은(는) 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 재위탁 제한, 수탁자에 대한 관리·감독, 책임에 관한 사항을 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>
                    </section>

                    <section className="policy-section">
                        <h2><span>5.</span> 정보주체의 권리·의무 및 행사방법</h2>
                        <p>정보주체는 씨엠이노베이션에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
                        <div className="policy-sub-content">
                            <ol style={{ paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '8px' }}>1. 개인정보 열람요구</li>
                                <li style={{ marginBottom: '8px' }}>2. 개인정보에 오류 등이 있을 경우 정정 요구</li>
                                <li style={{ marginBottom: '8px' }}>3. 삭제요구</li>
                                <li style={{ marginBottom: '8px' }}>4. 처리정지 요구</li>
                            </ol>
                        </div>
                    </section>

                    <section className="policy-section">
                        <h2><span>6.</span> 처리하는 개인정보 항목</h2>
                        <p>씨엠이노베이션은(는) 다음의 개인정보 항목을 처리하고 있습니다.</p>
                        <ul>
                            <li>성명, 생년월일, 주소, 전화번호, 휴대전화번호, 성별, 이메일주소</li>
                        </ul>
                    </section>

                    <section className="policy-section">
                        <h2><span>7.</span> 개인정보의 파기</h2>
                        <p>① 씨엠이노베이션은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
                        <p>② 씨엠이노베이션은(는) 다음의 방법으로 개인정보를 파기합니다.</p>
                        <ul>
                            <li><strong>전자적 파일 :</strong> 파일 삭제 및 디스크 등 저장매체 포맷</li>
                            <li><strong>수기(手記) 문서 :</strong> 분쇄하거나 소각</li>
                        </ul>
                    </section>

                    <section className="policy-section">
                        <h2><span>8.</span> 개인정보의 안전성 확보조치</h2>
                        <p>씨엠이노베이션은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
                        <ul>
                            <li><strong>관리적 조치 :</strong> 내부관리계획 수립·시행, 직원·종업원 등에 대한 정기적 교육</li>
                            <li><strong>기술적 조치 :</strong> 개인정보처리시스템(또는 개인정보가 저장된 컴퓨터)의 비밀번호 설정 등 접근권한 관리, 백신소프트웨어 등 보안프로그램 설치, 개인정보가 저장된 파일의 암호화</li>
                            <li><strong>물리적 조치 :</strong> 개인정보가 저장·보관된 장소의 시건, 출입통제 등</li>
                        </ul>
                    </section>

                    <section className="policy-section">
                        <h2><span>9.</span> 개인정보 보호책임자</h2>
                        <p>씨엠이노베이션은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 처리하기 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                        <div className="policy-sub-content">
                            <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1C2D60', marginBottom: '15px' }}>▶ 개인정보 보호책임자 (사업주 또는 대표자)</p>
                            <p><strong>성명 :</strong> 씨엠이노베이션 | <strong>직책 :</strong> 대표이사</p>
                            <p><strong>연락처 :</strong> 대표전화 02-6949-4170 (기술지원: 0505-998-0888 / 팩스: 0505-477-4170)</p>
                            <p><strong>E-mail :</strong> support@cminnovation.co.kr</p>
                        </div>
                    </section>

                    <p className="policy-date">이 개인정보 처리방침은 2011. 9. 30.부터 적용됩니다.</p>
                </article>
            </div>
        </div>
    );
};

export default PrivacyPage;
