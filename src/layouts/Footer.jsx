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
                        <dt>회사명</dt>
                        <dd>주식회사 씨엠이노베이션</dd>
                        <dt>대표</dt>
                        <dd>권정훈</dd><br className="s_mobile_only" />
                        <dt>주소</dt>
                        <dd>서울시 구로구 디지털로 272 3층, 310호 (한신IT타워)</dd><br />
                        <dt>사업자등록번호</dt>
                        <dd>561-88-01986</dd><br className="s_mobile_only" />
                        <dt>대표전화</dt>
                        <dd>02-6949-4170</dd>
                    </dl>
                    <dl>
                        <dt>기술지원</dt>
                        <dd>0505-998-0888</dd>
                        <dt>팩스</dt>
                        <dd>0505-477-4170</dd>
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
