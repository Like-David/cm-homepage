import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SupportBoardPage.css';
import Banner from '@/components/common/Banner';
import SupportNav from "@/components/support/SupportNav";

const SupportBoardPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('게시글을 불러오는 중 오류가 발생했습니다.', error);
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
                                <button className="search-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M21 21L16.65 16.65" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            <Link to="/support/write" className="write-btn">문의하기</Link>
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
                            {posts.map(post => (
                                <tr key={post.id}>
                                    <td className="board-title"><Link to={`/support/${post.id}`}>{post.title}</Link></td>
                                    <td>{post.author}</td>
                                    <td>{post.views}</td>
                                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
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
        </div>
    );
};

export default SupportBoardPage;
