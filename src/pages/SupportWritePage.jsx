import React, { useState } from 'react';
import '../styles/SupportWritePage.css';
import Banner from '@/components/common/Banner';

const SupportWritePage = () => {
    const [consent, setConsent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!consent) {
            alert('개인정보 수집 및 이용에 동의해야 합니다.');
            return;
        }
        // Handle form submission logic here
        alert('문의가 접수되었습니다.');
    };

    return (
        <div className="support-write-page">
            <Banner title="온라인 문의" subtitle="문의 내용에 대해 신속하게 답변해 드리겠습니다." />
            <div className="support-write-container">
                <form className="support-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="category">구분 <span className="required">*</span></label>
                        <select id="category" name="category" required>
                            <option value="">선택하세요</option>
                            <option value="product">제품</option>
                            <option value="maintenance">유지보수</option>
                            <option value="etc">기타</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">회사명 <span className="required">*</span></label>
                        <input type="text" id="company" name="company" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="jobTitle">직급 <span className="required">*</span></label>
                        <input type="text" id="jobTitle" name="jobTitle" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">연락처 <span className="required">*</span></label>
                        <input type="tel" id="contact" name="contact" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">이메일 <span className="required">*</span></label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">제목 <span className="required">*</span></label>
                        <input type="text" id="title" name="title" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">문의 내용 <span className="required">*</span></label>
                        <textarea id="content" name="content" rows="10" required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="attachment">첨부파일</label>
                        <input type="file" id="attachment" name="attachment" />
                    </div>
                    <div className="privacy-policy-section">
                        <h1 class="title">개인정보처리방침</h1>
                        <p>(주)씨엠이노베이션(이하 ‘회사’)은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고,
                        이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.</p>

                        <h2>제1조 (개인정보의 처리 목적)</h2>
                        <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
                        이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다.</p>
                        <ul>
                            <li><strong>서비스 제공:</strong> 홈페이지 문의, 기술지원, 견적 요청 등 고객 응대 및 서비스 제공을 위한 본인확인 및 내용 전달</li>
                        </ul>

                        <h2>제2조 (처리하는 개인정보 항목)</h2>
                        <p>회사는 다음의 개인정보 항목을 처리합니다.</p>
                        <ul>
                            <li>성명, 연락처, 이메일, 직장정보(회사명, 직책 등)</li>
                            <li>고객 서비스 및 거래관계의 설정·유지·이행·관리 과정에서 생성 또는 제공된 정보</li>
                        </ul>

                        <h2>제3조 (개인정보의 처리 및 보유 기간)</h2>
                        <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 동의받은 기간 내에서 개인정보를 처리·보유합니다.</p>
                        <p>수집된 개인정보는 처리 목적이 달성되거나 정보주체가 동의를 철회할 때까지 보유하며,
                        목적 달성 시 지체 없이 안전하게 파기합니다. 단, 관계 법령에 따라 보존이 필요한 경우에는 해당 법령에서 정한 기간 동안 보유할 수 있습니다.</p>

                        <h2>제4조 (개인정보 수집 방법)</h2>
                        <ul>
                            <li>홈페이지 내 [Contact Us] 문의하기 양식</li>
                            <li>기술지원, 유지보수, 상담 과정에서 고객이 직접 제공한 정보</li>
                        </ul>

                        <h2>제5조 (개인정보의 파기 절차 및 방법)</h2>
                        <p>회사는 개인정보 보유기간의 경과 또는 처리목적이 달성된 경우 지체 없이 해당 정보를 파기합니다.</p>
                        <ul>
                            <li><strong>파기절차:</strong> 파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호책임자의 승인을 받아 파기합니다.</li>
                            <li><strong>파기방법:</strong> 종이 문서는 분쇄 또는 소각, 전자파일은 복원이 불가능한 기술적 방법으로 삭제합니다.</li>
                        </ul>

                        <h2>제6조 (정보주체의 권리와 행사 방법)</h2>
                        <p>정보주체는 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있으며,
                        회사는 관련 법령에 따라 이를 신속히 처리합니다.</p>

                        <h2>제7조 (개인정보의 안전성 확보조치)</h2>
                        <ul>
                            <li>관리적 조치 : 내부관리계획 수립 및 시행, 정기적 직원 교육</li>
                            <li>기술적 조치 : 접근권한 관리, 암호화, 해킹방지 보안대책 수립</li>
                        </ul>

                        <h2>제8조 (쿠키 사용 관련)</h2>
                        <p>회사는 이용자의 정보를 저장하는 ‘쿠키(cookie)’를 사용하지 않습니다.</p>

                        <h2>제9조 (행태정보 수집 및 활용)</h2>
                        <p>회사는 온라인 맞춤형 광고 등 행태정보를 수집·이용하지 않습니다.</p>

                        <h2>제10조 (개인정보 보호책임자)</h2>
                        <p>회사는 개인정보 처리와 관련한 업무를 총괄하여 책임지고 있으며, 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                        <ul>
                            <li><strong>부서명:</strong> 경영지원부</li>
                            <li><strong>연락처:</strong> 02-6121-8492</li>
                        </ul>

                        <h2>제11조 (개인정보 열람청구 접수 및 처리 부서)</h2>
                        <ul>
                            <li><strong>부서명:</strong> 경영지원부</li>
                            <li><strong>연락처:</strong> 02-6121-8492</li>
                        </ul>

                        <h2>제12조 (권익침해 구제방법)</h2>
                        <ul>
                            <li>개인정보분쟁조정위원회 : 1833-6972 (<a href="https://www.kopico.go.kr" target="_blank">www.kopico.go.kr</a>)</li>
                            <li>개인정보침해신고센터 : 118 (<a href="https://privacy.kisa.or.kr" target="_blank">privacy.kisa.or.kr</a>)</li>
                            <li>대검찰청 : 1301 (<a href="https://www.spo.go.kr" target="_blank">www.spo.go.kr</a>)</li>
                            <li>경찰청 : 182 (<a href="https://ecrm.cyber.go.kr" target="_blank">ecrm.cyber.go.kr</a>)</li>
                        </ul>

                        <h2>제13조 (개인정보 처리방침의 변경)</h2>
                                                <p>이 개인정보처리방침은 <strong>2024년 8월 28일</strong>부터 적용됩니다.<br />
                                                법령이나 내부 정책 변경 시 홈페이지를 통해 공지합니다.</p>
                    </div>
                    <div className="consent-group">
                        <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                        <label htmlFor="consent">개인정보 수집 및 이용에 동의합니다. <span className="required">*</span></label>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => window.history.back()}>취소</button>
                        <button type="submit" className="submit-btn">문의하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupportWritePage;
