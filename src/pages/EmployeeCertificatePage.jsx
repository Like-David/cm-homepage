import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Button, Form, Row, Col, Modal, Alert, Spinner } from 'react-bootstrap';
import { Search, Eye, Trash2, Plus } from 'lucide-react';
import Banner from '../components/common/Banner';
import { SORTED_EMPLOYEES } from '@/data/employees';
import * as adminService from '../services/admin';
import '../styles/EmployeeCertificatePage.css';
import '../styles/UserManagementPage.css';

const STATUS_BADGE = {
    pending:  { label: '대기 중',   color: '#f59e0b', bg: '#fffbeb' },
    approved: { label: '승인됨',    color: '#3b82f6', bg: '#eff6ff' },
    rejected: { label: '반려됨',    color: '#ef4444', bg: '#fef2f2' },
    issued:   { label: '발급 완료', color: '#10b981', bg: '#ecfdf5' },
};

const EmployeeCertificatePage = () => {
    const { t } = useTranslation();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' });
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [createModal, setCreateModal] = useState({ show: false });
    const [createForm, setCreateForm] = useState({ employee_name: '', purpose: '' });
    const [createLoading, setCreateLoading] = useState(false);

    const fetchCertificates = async (page = 1) => {
        setLoading(true);
        setError('');
        try {
            const data = await adminService.getCertificates({
                page,
                limit: pagination.limit,
                search,
                sortBy: 'issue_date',
                sortOrder: 'DESC',
            });
            setCertificates(data.data);
            setPagination(data.pagination);
        } catch (err) {
            setError(err.response?.data?.message || t('admin.load_error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCertificates(); }, []);

    const handleSearch = (e) => { e.preventDefault(); fetchCertificates(1); };

    const handleViewDetail = async (id) => {
        try {
            const cert = await adminService.getCertificate(id);
            setSelectedCertificate(cert);
            setShowDetailModal(true);
        } catch (err) {
            setError(err.response?.data?.message || t('admin.load_detail_error'));
        }
    };

    const handleDelete = async () => {
        setDeleteLoading(true);
        try {
            await adminService.deleteCertificate(deleteModal.id);
            setDeleteModal({ show: false, id: null, name: '' });
            fetchCertificates(pagination.page);
        } catch (err) {
            setError(err.response?.data?.message || '삭제에 실패했습니다.');
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            const emp = SORTED_EMPLOYEES.find((e) => e.name === createForm.employee_name);
            await adminService.createCertificate({
                employee_name: createForm.employee_name,
                department: emp?.department ?? '',
                position: emp?.rank ?? '',
                purpose: createForm.purpose,
                status: 'issued',
                issue_date: new Date().toISOString().split('T')[0],
            });
            setCreateModal({ show: false });
            setCreateForm({ employee_name: '', purpose: '' });
            fetchCertificates(1);
        } catch (err) {
            setError(err.response?.data?.message || '발급 등록에 실패했습니다.');
        } finally {
            setCreateLoading(false);
        }
    };

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('ko-KR') : '-';

    return (
        <div className="employee-certificate-page">
            <Banner title={t('admin.employee_certificate')} subtitle="전체 재직증명서 발급 이력을 조회합니다" />

            <Container className="py-5">
                {error && (
                    <Alert variant="danger" onClose={() => setError('')} dismissible>
                        {error}
                    </Alert>
                )}

                {/* 검색 + 추가 */}
                <Row className="mb-4">
                    <Col md={8}>
                        <Form onSubmit={handleSearch}>
                            <Form.Group className="d-flex">
                                <Form.Control
                                    type="text"
                                    placeholder="이름으로 검색"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    className="ms-2"
                                    style={{ backgroundColor: '#1C2D60', borderColor: '#1C2D60' }}
                                >
                                    <Search size={18} />
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={4} className="text-end">
                        <Button
                            style={{ backgroundColor: '#1C2D60', borderColor: '#1C2D60' }}
                            onClick={() => setCreateModal({ show: true })}
                        >
                            <Plus size={18} className="me-1" />
                            직접 발급
                        </Button>
                    </Col>
                </Row>

                {/* 테이블 */}
                <div className="certificate-table-wrapper">
                    <table className="board-table">
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>부서</th>
                                <th>직급</th>
                                <th>발급일</th>
                                <th>발급 목적</th>
                                <th>상태</th>
                                <th style={{ width: 80 }}>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-5">
                                        <Spinner animation="border" style={{ color: '#1C2D60' }} />
                                    </td>
                                </tr>
                            ) : certificates.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-5 text-muted">
                                        {search ? `'${search}'에 대한 발급 이력이 없습니다.` : '발급 이력이 없습니다.'}
                                    </td>
                                </tr>
                            ) : certificates.map((cert) => {
                                const badge = STATUS_BADGE[cert.status] ?? { label: cert.status, color: '#888', bg: '#f2f3f5' };
                                return (
                                    <tr key={cert.id}>
                                        <td className="fw-bold">{cert.employee_name}</td>
                                        <td style={{ color: '#555' }}>{cert.department || '-'}</td>
                                        <td style={{ color: '#555' }}>{cert.position || '-'}</td>
                                        <td style={{ color: '#555' }}>{formatDate(cert.issue_date)}</td>
                                        <td style={{ color: '#555' }}>{cert.purpose || '-'}</td>
                                        <td>
                                            <span style={{
                                                padding: '3px 10px',
                                                borderRadius: 12,
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                color: badge.color,
                                                background: badge.bg,
                                            }}>
                                                {badge.label}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="um-action-group">
                                                <button
                                                    className="um-btn-role"
                                                    onClick={() => handleViewDetail(cert.id)}
                                                    title="상세보기"
                                                >
                                                    <Eye size={14} />
                                                </button>
                                                <button
                                                    className="um-btn-del"
                                                    onClick={() => setDeleteModal({ show: true, id: cert.id, name: cert.employee_name })}
                                                    title="삭제"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* 페이지네이션 */}
                {pagination.totalPages > 1 && (
                    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            disabled={pagination.page === 1}
                            onClick={() => fetchCertificates(pagination.page - 1)}
                        >
                            이전
                        </Button>
                        <span style={{ fontSize: '0.9rem', color: '#555' }}>
                            {pagination.page} / {pagination.totalPages}
                        </span>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            disabled={pagination.page === pagination.totalPages}
                            onClick={() => fetchCertificates(pagination.page + 1)}
                        >
                            다음
                        </Button>
                    </div>
                )}
            </Container>

            {/* 상세보기 모달 */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
                <Modal.Header closeButton style={{ borderBottom: '2px solid #1C2D60' }}>
                    <Modal.Title style={{ color: '#1C2D60', fontWeight: 700, fontSize: '1rem' }}>
                        발급 상세 정보
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    {selectedCertificate && (
                        <div style={{ fontSize: '0.9rem' }}>
                            {[
                                { label: '이름',    value: selectedCertificate.employee_name },
                                { label: '부서',    value: selectedCertificate.department || '-' },
                                { label: '직급',    value: selectedCertificate.position || '-' },
                                { label: '발급일',  value: formatDate(selectedCertificate.issue_date) },
                                { label: '발급 목적', value: selectedCertificate.purpose || '-' },
                            ].map(({ label, value }) => (
                                <div key={label} className="myprofile-info-row" style={{ display: 'flex', padding: '10px 0', borderBottom: '1px solid #f0f2f6' }}>
                                    <span style={{ width: 90, color: '#888', flexShrink: 0 }}>{label}</span>
                                    <span style={{ fontWeight: 600, color: '#333' }}>{value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setShowDetailModal(false)}>닫기</Button>
                </Modal.Footer>
            </Modal>

            {/* 삭제 확인 모달 */}
            <Modal show={deleteModal.show} onHide={() => setDeleteModal({ show: false, id: null, name: '' })} centered>
                <Modal.Header closeButton style={{ borderBottom: '2px solid #dc3545' }}>
                    <Modal.Title style={{ color: '#dc3545', fontWeight: 700, fontSize: '1rem' }}>
                        발급 이력 삭제
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <p className="mb-1">
                        <strong>{deleteModal.name}</strong>의 발급 이력을 삭제하시겠습니까?
                    </p>
                    <p className="text-danger mb-0" style={{ fontSize: '0.85rem' }}>
                        삭제된 이력은 복구할 수 없습니다.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setDeleteModal({ show: false, id: null, name: '' })}>취소</Button>
                    <Button variant="danger" onClick={handleDelete} disabled={deleteLoading}>
                        {deleteLoading ? '처리 중...' : '삭제'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 직접 발급 모달 */}
            <Modal show={createModal.show} onHide={() => setCreateModal({ show: false })} centered>
                <Modal.Header closeButton style={{ borderBottom: '2px solid #1C2D60' }}>
                    <Modal.Title style={{ color: '#1C2D60', fontWeight: 700, fontSize: '1rem' }}>
                        직접 발급 등록
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCreate}>
                    <Modal.Body className="py-4">
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">임직원 선택</Form.Label>
                            <Form.Select
                                value={createForm.employee_name}
                                onChange={(e) => setCreateForm((p) => ({ ...p, employee_name: e.target.value }))}
                                required
                            >
                                <option value="">임직원을 선택하세요</option>
                                {SORTED_EMPLOYEES.map((emp) => (
                                    <option key={emp.email} value={emp.name}>
                                        {emp.name} ({emp.rank} · {emp.department})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="fw-semibold">발급 목적</Form.Label>
                            <Form.Select
                                value={createForm.purpose}
                                onChange={(e) => setCreateForm((p) => ({ ...p, purpose: e.target.value }))}
                                required
                            >
                                <option value="">발급 목적을 선택하세요</option>
                                <option value="금융기관 제출용">금융기관 제출용</option>
                                <option value="관공서 제출용">관공서 제출용</option>
                                <option value="보험사 제출용">보험사 제출용</option>
                                <option value="기타">기타</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={() => setCreateModal({ show: false })}>취소</Button>
                        <Button type="submit" style={{ backgroundColor: '#1C2D60', borderColor: '#1C2D60' }} disabled={createLoading}>
                            {createLoading ? '처리 중...' : '발급 등록'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default EmployeeCertificatePage;
