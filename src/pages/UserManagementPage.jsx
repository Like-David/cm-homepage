import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Spinner, Modal, Form, Button } from 'react-bootstrap';
import { Search } from 'lucide-react';
import Banner from '../components/common/Banner';
import { useAuth } from '@/contexts/AuthContext';
import * as adminService from '../services/admin';
import '../styles/AdminPage.css';
import '../styles/UserManagementPage.css';

const ROLE_BADGE = {
    ADMIN:    { label: '관리자', color: '#dc3545', bg: '#fff0f0' },
    EMPLOYEE: { label: '임직원', color: '#1C2D60', bg: '#eef1f9' },
    GUEST:    { label: '게스트', color: '#6c757d', bg: '#f2f3f5' },
};

const UserManagementPage = () => {
    const { t } = useTranslation();
    const { user: currentUser } = useAuth();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('ALL');

    const [roleModal, setRoleModal] = useState({ show: false, user: null, role: '' });
    const [deleteModal, setDeleteModal] = useState({ show: false, user: null });
    const [actionLoading, setActionLoading] = useState(false);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {};
            if (searchTerm) params.search = searchTerm;
            if (filterRole !== 'ALL') params.role = filterRole;
            const result = await adminService.getUsers(params);
            setUsers(result.data);
        } catch (err) {
            setError(err.response?.data?.message || '사용자 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }, [searchTerm, filterRole]);

    useEffect(() => { fetchUsers(); }, [filterRole]);

    const handleSearch = (e) => { e.preventDefault(); fetchUsers(); };

    const handleRoleChange = async () => {
        setActionLoading(true);
        try {
            await adminService.updateUserRole(roleModal.user.id, roleModal.role);
            setRoleModal({ show: false, user: null, role: '' });
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || '역할 변경에 실패했습니다.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        setActionLoading(true);
        try {
            await adminService.deleteUser(deleteModal.user.id);
            setDeleteModal({ show: false, user: null });
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || '사용자 삭제에 실패했습니다.');
        } finally {
            setActionLoading(false);
        }
    };

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('ko-KR') : '-';

    return (
        <div className="support-page-wrapper">
            <Banner title={t('admin.user_management')} subtitle={t('admin.user_management_desc')} />

            <div className="support-content-area">
                {error && (
                    <Alert variant="danger" onClose={() => setError('')} dismissible className="mb-4">
                        {error}
                    </Alert>
                )}

                <div className="contact-us-section">
                    <div className="section-header">
                        <h2>{t('admin.user_list')}</h2>
                        <p>전체 <strong>{users.length}</strong>명의 사용자가 등록되어 있습니다</p>
                    </div>

                    {/* 검색 + 필터 */}
                    <div className="board-controls">
                        <form className="search-bar" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="이름 또는 이메일로 검색"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="um-search-icon-btn" aria-label="검색">
                                <Search size={18} color="#fff" />
                            </button>
                        </form>

                        <select
                            className="um-role-select"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="ALL">전체 역할</option>
                            <option value="ADMIN">관리자</option>
                            <option value="EMPLOYEE">임직원</option>
                            <option value="GUEST">게스트</option>
                        </select>
                    </div>

                    {/* 테이블 */}
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" style={{ color: '#1C2D60' }} />
                        </div>
                    ) : (
                        <table className="board-table">
                            <thead>
                                <tr>
                                    <th style={{ width: 50 }}>No.</th>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>역할</th>
                                    <th>가입일</th>
                                    <th style={{ width: 100 }}>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted">
                                            등록된 사용자가 없습니다
                                        </td>
                                    </tr>
                                ) : users.map((u, idx) => {
                                    const isSelf = u.id === currentUser?.id;
                                    const badge = ROLE_BADGE[u.role] || ROLE_BADGE.GUEST;
                                    return (
                                        <tr key={u.id}>
                                            <td className="text-muted" style={{ fontSize: '0.85rem' }}>
                                                {idx + 1}
                                            </td>
                                            <td>
                                                <span className="fw-bold">{u.name}</span>
                                                {isSelf && <span className="um-me-tag">나</span>}
                                            </td>
                                            <td style={{ color: '#555' }}>{u.email}</td>
                                            <td>
                                                <span className="um-badge"
                                                    style={{ color: badge.color, background: badge.bg }}>
                                                    {badge.label}
                                                </span>
                                            </td>
                                            <td style={{ color: '#888', fontSize: '0.88rem' }}>
                                                {formatDate(u.created_at)}
                                            </td>
                                            <td>
                                                <div className="um-action-group">
                                                    <button
                                                        className="um-btn-role"
                                                        disabled={isSelf}
                                                        onClick={() => setRoleModal({ show: true, user: u, role: u.role })}
                                                    >
                                                        역할
                                                    </button>
                                                    <button
                                                        className="um-btn-del"
                                                        disabled={isSelf}
                                                        onClick={() => setDeleteModal({ show: true, user: u })}
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* 역할 변경 모달 */}
            <Modal show={roleModal.show} onHide={() => setRoleModal({ show: false, user: null, role: '' })} centered>
                <Modal.Header closeButton style={{ borderBottom: '2px solid #1C2D60' }}>
                    <Modal.Title style={{ color: '#1C2D60', fontWeight: 700, fontSize: '1rem' }}>
                        역할 변경
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    {roleModal.user && (
                        <>
                            <p className="mb-3">
                                <strong>{roleModal.user.name}</strong>({roleModal.user.email})의 역할을 변경합니다.
                            </p>
                            <Form.Label className="fw-semibold mb-2">새 역할 선택</Form.Label>
                            <Form.Select
                                value={roleModal.role}
                                onChange={(e) => setRoleModal((p) => ({ ...p, role: e.target.value }))}
                            >
                                <option value="GUEST">게스트</option>
                                <option value="EMPLOYEE">임직원</option>
                                <option value="ADMIN">관리자</option>
                            </Form.Select>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setRoleModal({ show: false, user: null, role: '' })}>
                        취소
                    </Button>
                    <Button style={{ backgroundColor: '#1C2D60', borderColor: '#1C2D60' }}
                        onClick={handleRoleChange} disabled={actionLoading}>
                        {actionLoading ? '처리 중...' : '변경 완료'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 삭제 확인 모달 */}
            <Modal show={deleteModal.show} onHide={() => setDeleteModal({ show: false, user: null })} centered>
                <Modal.Header closeButton style={{ borderBottom: '2px solid #dc3545' }}>
                    <Modal.Title style={{ color: '#dc3545', fontWeight: 700, fontSize: '1rem' }}>
                        사용자 삭제
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    {deleteModal.user && (
                        <>
                            <p className="mb-1">
                                <strong>{deleteModal.user.name}</strong>({deleteModal.user.email}) 계정을 삭제하시겠습니까?
                            </p>
                            <p className="text-danger mb-0" style={{ fontSize: '0.85rem' }}>
                                삭제된 계정은 복구할 수 없습니다.
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setDeleteModal({ show: false, user: null })}>취소</Button>
                    <Button variant="danger" onClick={handleDelete} disabled={actionLoading}>
                        {actionLoading ? '처리 중...' : '삭제'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserManagementPage;
