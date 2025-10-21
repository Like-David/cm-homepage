import React from 'react';
import SupportNav from "../components/support/SupportNav";
import Banner from "@/components/common/Banner";
import '../styles/SupportBoardPage.css'; // Reusing styles for now

const OneOnOneInquiryPage = () => {
    return (
        <div className="support-page-wrapper">
            <Banner title="고객센터" subtitle="궁금한 점이 있으시면 언제든지 문의해 주세요." />
            <SupportNav />
            <div className="support-content-area">
                <div className="section-header">
                    <h2>1:1 문의</h2>
                    <p>1:1 문의 페이지입니다. 기능이 곧 추가될 예정입니다.</p>
                </div>
                {/* 1:1 문의 관련 폼이나 내용이 여기에 추가될 수 있습니다. */}
            </div>
        </div>
    );
};

export default OneOnOneInquiryPage;
