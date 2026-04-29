import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Spinner, Modal, Form, Button } from 'react-bootstrap';
import { Search } from 'lucide-react';
import Banner from '../components/common/Banner';
import { useAuth } from '@/contexts/AuthContext';
import { SORTED_EMPLOYEES } from '@/data/employees';
import * as adminService from '../services/admin';
import '../styles/AdminPage.css';
import '../styles/UserManagementPage.css';

const UserManagementPage = () => {
    const { t } = useTranslation();
    const { user: currentUser } = useAuth();

    const ROLE_BADGE = {
        ADMIN:    { label: t('auth.role_admin'), color: '#dc3545', bg: '#fff0f0' },
        EMPLOYEE: { label: t('auth.role_employee'), color: '#1C2D60', bg: '#eef1f9' },
        GUEST:    { label: t('auth.role_guest'), color: '#6c757d', bg: '#f2f3f5' },
    };

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
            setUsers(Array.isArray(result) ? result : (result?.data ?? []));
        } catch (err) {
            setError(err.response?.data?.message || t('admin.user_load_fail'));
        } finally {
            setLoading(false);
        }
    }, [searchTerm, filterRole, t]);

    useEffect(() => { fetchUsers(); }, [filterRole, fetchUsers]);

    const handleSearch = (e) => { e.preventDefault(); fetchUsers(); };

    const handleRoleChange = async () => {
        setActionLoading(true);
        try {
            await adminService.updateUserRole(roleModal.user.id, roleModal.role);
            setRoleModal({ show: false, user: null, role: '' });
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || t('admin.role_change_fail'));
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
            setError(err.response?.data?.message || t('admin.user_delete_fail'));
        } finally {
            setActionLoading(false);
        }
    };

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
                        <p dangerouslySetInnerHTML={{ __html: t('admin.user_list_desc', { count: users.length }) }} />
                    </div>

                    {/* 검색 + 필터 */}
                    <div className="board-controls">
                        <form className="search-bar" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder={t('admin.search_user_placeholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="um-search-icon-btn" aria-label={t('support.search_btn')}>
                                <Search size={18} color="#fff" />
                            </button>
                        </form>

                        <select
                            className="um-role-select"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="ALL">{t('admin.all_roles')}</option>
                            <option value="ADMIN">{t('auth.role_admin')}</option>
                            <option value="EMPLOYEE">{t('auth.role_employee')}</option>
                            <option value="GUEST">{t('auth.role_guest')}</option>
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
                                    <th style={{ width: 40 }}>No.</th>
                                    <th>{t('admin.employee_name')}</th>
                                    <th>{t('admin.employee_position')}</th>
                                    <th>{t('admin.department')}</th>
                                    <th>{t('auth.email')}</th>
                                    <th>{t('auth.role')}</th>
                                    <th style={{ width: 100 }}>{t('admin.manage_label')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted">
                                            {t('admin.no_users')}
                                        </td>
                                    </tr>
                                ) : SORTED_EMPLOYEES
                                    .filter((emp) => {
                                        const matched = users.find((u) => u.name === emp.name);
                                        if (!matched) return false;
                                        if (searchTerm && !emp.name.includes(searchTerm) && !emp.email.includes(searchTerm)) return false;
                                        if (filterRole !== 'ALL' && matched.role !== filterRole) return false;
                                        return true;
                                    })
                                    .map((emp, idx) => {
                                        const u = users.find((u) => u.name === emp.name);
                                        const isSelf = u?.id === currentUser?.id;
                                        const badge = ROLE_BADGE[u?.role] || ROLE_BADGE.GUEST;
                                        return (
                                            <tr key={emp.email}>
                                                <td className="text-muted" style={{ fontSize: '0.85rem' }}>{idx + 1}</td>
                                                <td>
                                                    <span className="fw-bold">{emp.name}</span>
                                                    {isSelf && <span className="um-me-tag">{t('admin.me_tag')}</span>}
                                                </td>
                                                <td style={{ color: '#555' }}>{emp.rank}</td>
                                                <td style={{ color: '#555' }}>{emp.department}</td>
                                                <td style={{ color: '#888', fontSize: '0.85rem' }}>{emp.email}</td>
                                                <td>
                                                    <span className="um-badge" style={{ color: badge.color, background: badge.bg }}>
                                                        {badge.label}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="um-action-group">
                                                        <button
                                                            className="um-btn-role"
                                                            disabled={isSelf}
                                                            onClick={() => setRoleModal({ show: true, user: u, role: u?.role })}
                                                        >
                                                            {t('auth.role')}
                                                        </button>
                                                        <button
                                                            className="um-btn-del"
                                                            disabled={isSelf}
                                                            onClick={() => setDeleteModal({ show: true, user: u })}
                                                        >
                                                            {t('admin.delete')}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    )}

                    {/* 외부 가입 사용자 (GUEST - employees.js 미등록) */}
                    {(() => {
                        const guestUsers = users.filter((u) => {
                            if (!SORTED_EMPLOYEES.find((e) => e.name === u.name)) {
                                if (searchTerm && !u.name?.includes(searchTerm) && !u.email?.includes(searchTerm)) return false;
                                if (filterRole !== 'ALL' && u.role !== filterRole) return false;
                                return true;
                            }
                            return false;
                        });
                        if (guestUsers.length === 0) return null;
                        return (
                            <div className="mt-5">
                                <h6 style={{ color: '#888', fontWeight: 600, fontSize: '0.85rem', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #eee' }}>
                                    {t('admin.external_users')}
                                </h6>
                                <table className="board-table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: 40 }}>No.</th>
                                            <th>{t('admin.employee_name')}</th>
                                            <th>{t('admin.employee_position')}</th>
                                            <th>{t('admin.department')}</th>
                                            <th>{t('auth.email')}</th>
                                            <th>{t('auth.role')}</th>
                                            <th style={{ width: 100 }}>{t('admin.manage_label')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {guestUsers.map((u, idx) => {
                                            const isSelf = u?.id === currentUser?.id;
                                            const badge = ROLE_BADGE[u?.role] || ROLE_BADGE.GUEST;
                                            return (
                                                <tr key={u.id ?? u.email}>
                                                    <td className="text-muted" style={{ fontSize: '0.85rem' }}>{idx + 1}</td>
                                                    <td>
                                                        <span className="fw-bold">{u.name ?? '-'}</span>
                                                        {isSelf && <span className="um-me-tag">{t('admin.me_tag')}</span>}
                                                    </td>
                                                    <td style={{ color: '#bbb' }}>-</td>
                                                    <td style={{ color: '#bbb' }}>-</td>
                                                    <td style={{ color: '#888', fontSize: '0.85rem' }}>{u.email ?? '-'}</td>
                                                    <td>
                                                        <span className="um-badge" style={{ color: badge.color, background: badge.bg }}>
                                                            {badge.label}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="um-action-group">
                                                            <button
                                                                className="um-btn-role"
                                                                disabled={isSelf}
                                                                onClick={() => setRoleModal({ show: true, user: u, role: u?.role })}
                                                            >
                                                                {t('auth.role')}
                                                            </button>
                                                            <button
                                                                className="um-btn-del"
                                                                disabled={isSelf}
                                                                onClick={() => setDeleteModal({ show: true, user: u })}
                                                            >
                                                                {t('admin.delete')}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })()}
                </div>
            </div>

            {/* 역할 변경 모달 */}
            <Modal show={roleModal.show} onHide={() => setRoleModal({ show: false, user: null, role: '' })} centered>
                <Modal.Header closeButton style={{ borderBottom: '2px solid #1C2D60' }}>
                    <Modal.Title style={{ color: '#1C2D60', fontWeight: 700, fontSize: '1rem' }}>
                        {t('admin.change_role')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    {roleModal.user && (
                        <>
                            <p className="mb-3" dangerouslySetInnerHTML={{
                                __html: t('admin.change_role_desc', { name: roleModal.user.name, email: roleModal.user.email })
                            }} />
                            <Form.Label className="fw-semibold mb-2">{t('admin.new_role_select')}</Form.Label>
                            <Form.Select
                                value={roleModal.role}
                                onChange={(e) => setRoleModal((p) => ({ ...p, role: e.target.value }))}
                            >
                                <option value="GUEST">{t('auth.role_guest')}</option>
                                <option value="EMPLOYEE">{t('auth.role_employee')}</option>
                                <option value="ADMIN">{t('auth.role_admin')}</option>
                            </Form.Select>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setRoleModal({ show: false, user: null, role: '' })}>
                        {t('common.cancel')}
                    </Button>
                    <Button style={{ backgroundColor: '#1C2D60', borderColor: '#1C2D60' }}
                        onClick={handleRoleChange} disabled={actionLoading}>
                        {actionLoading ? t('admin.issuing') : t('common.confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 사용자 삭제 모달 */}
            <Modal show={deleteModal.show} onHide={() => setDeleteModal({ show: false, user: null })} centered>
                <Modal.Header closeButton style={{ borderBottom: '2px solid #dc3545' }}>
                    <Modal.Title style={{ color: '#dc3545', fontWeight: 700, fontSize: '1rem' }}>
                        {t('admin.delete_user')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    {deleteModal.user && (
                        <>
                            <p className="mb-1" dangerouslySetInnerHTML={{
                                __html: t('admin.delete_user_confirm', { name: deleteModal.user.name, email: deleteModal.user.email })
                            }} />
                            <p className="text-danger mb-0" style={{ fontSize: '0.85rem' }}>
                                {t('admin.delete_user_warning')}
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setDeleteModal({ show: false, user: null })}>{t('common.cancel')}</Button>
                    <Button variant="danger" onClick={handleDelete} disabled={actionLoading}>
                        {actionLoading ? t('admin.issuing') : t('admin.delete')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserManagementPage;
