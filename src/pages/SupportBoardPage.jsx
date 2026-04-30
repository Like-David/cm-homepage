// SupportBoardPage.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../styles/SupportBoardPage.css';
import Banner from '@/components/common/Banner';
import SupportNav from "@/components/support/SupportNav";
import WriteModal from '@/components/support/WriteModal';
import { Link } from 'react-router-dom';

const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const maskAuthor = (author) => {
    if (!author) return '';
    if (author.includes('@')) {
        const [local, domain] = author.split('@');
        const visible = local.slice(0, 2);
        return `${visible}***@${domain}`;
    }
    if (author.length === 1) return author;
    if (author.length === 2) return author[0] + '*';
    return author[0] + '*'.repeat(author.length - 2) + author[author.length - 1];
};

export default function SupportBoardPage() {
    const { t } = useTranslation();
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
            console.error(t('support.fail_fetch'), e);
            setPosts([]);
            setTotalPages(1);
        }
    };

    useEffect(() => {
        fetchPosts({ p: 1 });
    }, []);

    return (
        <div className="support-page-wrapper">
            <Banner title={t('support.banner_title')} subtitle={t('support.banner_subtitle')} />
            <SupportNav />

            <div className="support-content-area">
                <div className="contact-us-section">
                    <div className="board-section-header">
                        <div className="board-section-label">Customer Support</div>
                        <h2 className="board-section-title">{t('support.board_title')}</h2>
                        <p className="board-section-desc">{t('support.banner_subtitle')}</p>
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
                                    placeholder={t('support.search_placeholder')}
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <button type="submit" className="search-btn" aria-label={t('support.search_btn')}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                            stroke="#888"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M21 21L16.65 16.65"
                                            stroke="#888"
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
                                {t('support.write_btn')}
                            </button>
                        </div>

                        <div className="board-table-wrap">
                            <table className="board-table">
                                <thead>
                                    <tr>
                                        <th className="col-subject">{t('support.table.title')}</th>
                                        <th className="col-author">{t('support.table.author')}</th>
                                        <th className="col-date">{t('support.table.date')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="post-list-empty">
                                                {keyword ? t('support.no_search_results_board', { keyword }) : t('support.no_posts_board')}
                                            </td>
                                        </tr>
                                    ) : posts.map((p) => (
                                        <tr key={p.id}>
                                            <td className="board-title">
                                                <Link to={`/support/${p.id}`} className="secret-link">
                                                    <svg className="lock-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                        <path d="M7 10V8a5 5 0 1 1 10 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                        <rect x="4.5" y="10" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
                                                        <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                                                    </svg>
                                                    <span>비밀글입니다.</span>
                                                </Link>
                                            </td>
                                            <td className="board-author">{maskAuthor(p.author)}</td>
                                            <td className="board-date">{formatDateTime(p.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

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
