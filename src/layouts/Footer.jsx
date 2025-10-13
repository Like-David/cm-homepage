import React from 'react';
import '@/styles/Footer.css';

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer id="footer" className="main">
            <div className="wrap">
                <h1><a href="/">주식회사 씨엠이노베이션</a></h1>
                <nav className="gnb">
                    <ul>
                        <li><a href="http://www.cminnovation.co.kr/bbs/content.php?co_id=privacy"><strong>개인정보처리방침</strong></a></li>
                        <li><a href="http://www.cminnovation.co.kr/bbs/content.php?co_id=provision">서비스이용약관</a></li>
                    </ul>
                </nav>
                <div className="f_left">
                    <dl>
                        <dt>회사명: 주식회사 씨엠이노베이션</dt>
                        <dt>대표: 권정훈</dt>
                        <dt>주소: 서울시 구로구 디지털로 272, 310호 (한신IT타워)</dt>
                        <dt>사업자등록번호: 561-88-01986</dt>
                    </dl>
                    <dl>
                        <dt>대표전화: 02-6949-4170</dt>
                        <dt>기술지원: 0505-998-0888</dt>
                        <dt>팩스: 0505-477-4170</dt>
                    </dl>
                    <p className="copyright">Copyright © <strong>CMInnovation. </strong> All Rights Reserved.</p>
                </div>
            </div>
            <a href="#!" onClick={scrollToTop} id="top_btn">
                <span className="sound_only">상단으로</span>^
            </a>
        </footer>
    );
}

export default Footer;
