// SupportBoardPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SupportBoardPage.css';
import Banner from '@/components/common/Banner';
import SupportNav from "@/components/support/SupportNav";
import WriteModal from '@/components/support/WriteModal';
import { Link } from 'react-router-dom';

export default function SupportBoardPage() {
    const [posts, setPosts] = useState([]);
    const [isWriteOpen, setIsWriteOpen] = useState(false); // ✅ 모달 상태

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/api/posts');
                setPosts(res.data);
            } catch (e) {
                console.error('게시글을 불러오는 중 오류', e);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="support-page-wrapper">
            <Banner title="고객센터" subtitle="궁금한 점이 있으시면 언제든지 문의해 주세요." />
            <SupportNav />
            <div className="support-content-area">
                <div className="contact-us-section">
                    <div className="section-header">
                        <h2>문의사항</h2>
                        <p>궁금한 점이 있으시면 언제든지 문의해 주세요.</p>
                    </div>

                    <div className="board-container">
                        <div className="board-controls">
                            <div className="search-bar">
                                <input type="text" placeholder="검색어를 입력하세요" />
                                <button className="search-btn" aria-label="검색">
                                    {/* (기존 SVG 유지) */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M21 21L16.65 16.65" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>

                            {/* ⬇️ Link → Button 변경 */}
                            <button type="button" className="write-btn" onClick={() => setIsWriteOpen(true)}>
                                문의하기
                            </button>
                        </div>

                        <table className="board-table">
                            <thead>
                            <tr>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>조회수</th>
                                <th>작성일</th>
                            </tr>
                            </thead>
                            <tbody>
                        {posts.map(p => (
                            <tr key={p.id}>
                                <td className="board-title"><Link to={`/support/${p.id}`}>{p.title}</Link></td>
                                <td>{p.author}</td>
                                <td>{p.views}</td>
                                <td>{new Date(p.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                        </table>

                        <div className="pagination">
                            <button>&lt;</button>
                            <span>1</span>
                            <button>&gt;</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ 모달 붙이기 */}
            <WriteModal
                isOpen={isWriteOpen}
                onClose={() => setIsWriteOpen(false)}
                onSuccess={() => {
                    // 글 등록 후 목록 새로고침
                    axios.get('/api/posts').then(r => setPosts(r.data));
                }}
            />
        </div>
    );
}
