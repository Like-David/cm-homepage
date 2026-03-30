import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Table, Button, Badge, Form } from 'react-bootstrap';
import { Users, Search, UserPlus, Edit, Trash2 } from 'lucide-react';
import Banner from '../components/common/Banner';
import '../styles/AdminPage.css';

const UserManagementPage = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('ALL');

    // 임시 사용자 데이터
    useEffect(() => {
        const sampleUsers = [
            { id: 1, name: '김철수', email: 'kim@example.com', role: 'ADMIN', status: 'active', createdAt: '2024-01-15' },
            { id: 2, name: '이영희', email: 'lee@example.com', role: 'EMPLOYEE', status: 'active', createdAt: '2024-02-20' },
            { id: 3, name: 'John Doe', email: 'john@example.com', role: 'GUEST', status: 'active', createdAt: '2024-03-10' },
            { id: 4, name: '박민수', email: 'park@example.com', role: 'EMPLOYEE', status: 'inactive', createdAt: '2024-01-05' },
            { id: 5, name: 'Jane Smith', email: 'jane@example.com', role: 'GUEST', status: 'active', createdAt: '2024-03-25' },
        ];
        setUsers(sampleUsers);
    }, []);

    const getRoleBadgeVariant = (role) => {
        switch(role) {
            case 'ADMIN': return 'danger';
            case 'EMPLOYEE': return 'primary';
            case 'GUEST': return 'secondary';
            default: return 'secondary';
        }
    };

    const getStatusBadgeVariant = (status) => {
        return status === 'active' ? 'success' : 'warning';
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'ALL' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="user-management-page">
            <Banner
                title={t('admin.user_management')}
                subtitle={t('admin.user_management_desc')}
            />

            <Container className="py-5">
                <div className="admin-content-card">
                    <div className="admin-header">
                        <div className="d-flex align-items-center gap-3">
                            <Users size={32} className="text-primary" />
                            <div>
                                <h2 className="mb-1">{t('admin.user_list')}</h2>
                                <p className="text-muted mb-0">{t('admin.total_users')}: {filteredUsers.length}</p>
                            </div>
                        </div>
                        <Button variant="primary" className="d-flex align-items-center gap-2">
                            <UserPlus size={18} />
                            {t('admin.add_user')}
                        </Button>
                    </div>

                    <div className="admin-filters mb-4">
                        <div className="search-box">
                            <Search size={20} className="search-icon" />
                            <Form.Control
                                type="text"
                                placeholder={t('admin.search_user')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="ps-5"
                            />
                        </div>
                        <Form.Select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            style={{ width: '200px' }}
                        >
                            <option value="ALL">{t('admin.all_roles')}</option>
                            <option value="ADMIN">{t('auth.role_admin')}</option>
                            <option value="EMPLOYEE">{t('auth.role_employee')}</option>
                            <option value="GUEST">{t('auth.role_guest')}</option>
                        </Form.Select>
                    </div>

                    <Table hover responsive className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>{t('admin.name')}</th>
                                <th>{t('admin.email')}</th>
                                <th>{t('admin.role')}</th>
                                <th>{t('admin.status')}</th>
                                <th>{t('admin.created_at')}</th>
                                <th>{t('admin.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td className="fw-bold">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Badge bg={getRoleBadgeVariant(user.role)}>
                                            {t(`auth.role_${user.role.toLowerCase()}`)}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge bg={getStatusBadgeVariant(user.status)}>
                                            {user.status === 'active' ? t('admin.active') : t('admin.inactive')}
                                        </Badge>
                                    </td>
                                    <td>{user.createdAt}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button variant="outline-primary" size="sm">
                                                <Edit size={16} />
                                            </Button>
                                            <Button variant="outline-danger" size="sm">
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
};

export default UserManagementPage;
