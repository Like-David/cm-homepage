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
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    const [isWriteOpen, setIsWriteOpen] = useState(false);

    const fetchPosts = async ({ q = keyword, p = page } = {}) => {
        try {
            console.log('API CALL:', '/api/posts', { keyword, page, pageSize });

            const res = await axios.get('/api/posts', {
                params: {
                    keyword: q || undefined,
                    page: p,
                    pageSize,
                },
            });

            const data = res.data;

            const list = Array.isArray(data) ? data : (data?.content ?? []);
            setPosts(list);

            const currentPage = Array.isArray(data) ? p : (data?.page ?? p);
            const tp = Array.isArray(data) ? 1 : (data?.totalPages ?? 1);

            setPage(currentPage);
            setTotalPages(tp);
        } catch (e) {
            console.error('게시글을 불러오는 중 오류', e);
            setPosts([]);
            setTotalPages(1);
        }
    };

    useEffect(() => {
        fetchPosts({ p: 1 });
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
                            <form
                                className="search-bar"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    fetchPosts({ q: keyword.trim(), p: 1 });
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="검색어를 입력하세요"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <button type="submit" className="search-btn" aria-label="검색">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                            stroke="#666"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M21 21L16.65 16.65"
                                            stroke="#666"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </form>

                            <button
                                type="button"
                                className="write-btn"
                                onClick={() => setIsWriteOpen(true)}
                            >
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
                            {posts.map((p) => (
                                <tr key={p.id}>
                                    <td className="board-title">
                                        <Link to={`/support/${p.id}`}>{p.title}</Link>
                                    </td>
                                    <td>{p.author}</td>
                                    <td>{p.views}</td>
                                    <td>{new Date(p.created_at).toLocaleDateString().replace(/\.$/, '')}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="pagination">
                            <button
                                disabled={page <= 1}
                                onClick={() => fetchPosts({ p: page - 1 })}
                            >
                                &lt;
                            </button>

                            <span>{page} / {totalPages}</span>

                            <button
                                disabled={page >= totalPages}
                                onClick={() => fetchPosts({ p: page + 1 })}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <WriteModal
                isOpen={isWriteOpen}
                onClose={() => setIsWriteOpen(false)}
                onSuccess={() => fetchPosts({ p: 1 })}
            />
        </div>
    );
}
