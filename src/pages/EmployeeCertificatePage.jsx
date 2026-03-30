import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Table, Button, Form, Row, Col, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { Search, Eye, Plus, Edit, Trash2 } from 'lucide-react';
import Banner from '../components/common/Banner';
import * as adminService from '../services/admin';
import '../styles/EmployeeCertificatePage.css';

const EmployeeCertificatePage = () => {
    const { t } = useTranslation();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    // 상세보기 모달
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    // 목록 조회
    const fetchCertificates = async (page = 1) => {
        setLoading(true);
        setError('');

        try {
            const data = await adminService.getCertificates({
                page,
                limit: pagination.limit,
                search,
                sortBy: 'issue_date',
                sortOrder: 'DESC'
            });

            setCertificates(data.data);
            setPagination(data.pagination);
        } catch (err) {
            setError(err.response?.data?.message || t('admin.load_error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCertificates(1);
    };

    const handleViewDetail = async (id) => {
        try {
            const certificate = await adminService.getCertificate(id);
            setSelectedCertificate(certificate);
            setShowDetailModal(true);
        } catch (err) {
            setError(err.response?.data?.message || t('admin.load_detail_error'));
        }
    };

    const handlePageChange = (newPage) => {
        fetchCertificates(newPage);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('ko-KR');
    };

    return (
        <div className="employee-certificate-page">
            <Banner
                title={t('admin.employee_certificate')}
                subtitle={t('admin.employee_certificate_desc')}
            />

            <Container className="py-5">
                {error && (
                    <Alert variant="danger" onClose={() => setError('')} dismissible>
                        {error}
                    </Alert>
                )}

                {/* 검색 및 액션 바 */}
                <Row className="mb-4">
                    <Col md={8}>
                        <Form onSubmit={handleSearch}>
                            <Form.Group className="d-flex">
                                <Form.Control
                                    type="text"
                                    placeholder={t('admin.search_placeholder')}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="ms-2"
                                    style={{ backgroundColor: '#1C2D60', borderColor: '#1C2D60' }}
                                >
                                    <Search size={20} />
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={4} className="text-end">
                        <Button
                            variant="success"
                            style={{ backgroundColor: '#1C2D60', borderColor: '#1C2D60' }}
                        >
                            <Plus size={20} className="me-1" />
                            {t('admin.create_certificate')}
                        </Button>
                    </Col>
                </Row>

                {/* 테이블 */}
                <div className="certificate-table-wrapper">
                    <Table className="certificate-table" responsive hover>
                        <thead>
                            <tr>
                                <th>{t('admin.employee_name')}</th>
                                <th>{t('admin.employee_number')}</th>
                                <th>{t('admin.department')}</th>
                                <th>{t('admin.position')}</th>
                                <th>{t('admin.issue_date')}</th>
                                <th>{t('admin.purpose')}</th>
                                <th>{t('admin.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-5">
                                        <Spinner animation="border" variant="primary" />
                                    </td>
                                </tr>
                            ) : certificates.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-5 text-muted">
                                        {t('admin.no_data')}
                                    </td>
                                </tr>
                            ) : (
                                certificates.map((cert) => (
                                    <tr key={cert.id}>
                                        <td>{cert.employee_name}</td>
                                        <td>{cert.employee_number || '-'}</td>
                                        <td>{cert.department || '-'}</td>
                                        <td>{cert.position || '-'}</td>
                                        <td>{formatDate(cert.issue_date)}</td>
                                        <td>
                                            {cert.purpose ? (
                                                <span className="text-truncate d-inline-block" style={{ maxWidth: '150px' }}>
                                                    {cert.purpose}
                                                </span>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="me-1"
                                                onClick={() => handleViewDetail(cert.id)}
                                            >
                                                <Eye size={16} />
                                            </Button>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                className="me-1"
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* 페이지네이션 */}
                {pagination.totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <Button
                            variant="outline-secondary"
                            disabled={pagination.page === 1}
                            onClick={() => handlePageChange(pagination.page - 1)}
                            className="me-2"
                        >
                            {t('admin.previous')}
                        </Button>
                        <span className="align-self-center mx-3">
                            {pagination.page} / {pagination.totalPages}
                        </span>
                        <Button
                            variant="outline-secondary"
                            disabled={pagination.page === pagination.totalPages}
                            onClick={() => handlePageChange(pagination.page + 1)}
                        >
                            {t('admin.next')}
                        </Button>
                    </div>
                )}
            </Container>

            {/* 상세보기 모달 */}
            <Modal
                show={showDetailModal}
                onHide={() => setShowDetailModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton style={{ borderBottom: '2px solid #1C2D60' }}>
                    <Modal.Title style={{ color: '#1C2D60', fontWeight: 'bold' }}>
                        {t('admin.certificate_detail')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCertificate && (
                        <div>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <strong>{t('admin.employee_name')}:</strong>
                                    <div>{selectedCertificate.employee_name}</div>
                                </Col>
                                <Col md={6}>
                                    <strong>{t('admin.employee_number')}:</strong>
                                    <div>{selectedCertificate.employee_number || '-'}</div>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <strong>{t('admin.department')}:</strong>
                                    <div>{selectedCertificate.department || '-'}</div>
                                </Col>
                                <Col md={6}>
                                    <strong>{t('admin.position')}:</strong>
                                    <div>{selectedCertificate.position || '-'}</div>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <strong>{t('admin.hire_date')}:</strong>
                                    <div>{formatDate(selectedCertificate.hire_date)}</div>
                                </Col>
                                <Col md={6}>
                                    <strong>{t('admin.issue_date')}:</strong>
                                    <div>{formatDate(selectedCertificate.issue_date)}</div>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={12}>
                                    <strong>{t('admin.purpose')}:</strong>
                                    <div>{selectedCertificate.purpose || '-'}</div>
                                </Col>
                            </Row>

                            {/* PDF 미리보기 */}
                            {selectedCertificate.pdf_url && (
                                <div className="pdf-preview mt-4">
                                    <strong>{t('admin.pdf_preview')}:</strong>
                                    <div className="pdf-iframe-wrapper mt-2">
                                        <iframe
                                            src={selectedCertificate.pdf_url}
                                            title="Certificate PDF"
                                            width="100%"
                                            height="500px"
                                            style={{ border: '1px solid #ddd' }}
                                        />
                                    </div>
                                </div>
                            )}

                            <Row className="mt-4 pt-3" style={{ borderTop: '1px solid #eee' }}>
                                <Col md={6}>
                                    <small className="text-muted">
                                        {t('admin.created_by')}: {selectedCertificate.created_by_name}
                                    </small>
                                </Col>
                                <Col md={6} className="text-end">
                                    <small className="text-muted">
                                        {t('admin.created_at')}: {formatDate(selectedCertificate.created_at)}
                                    </small>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                        {t('admin.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EmployeeCertificatePage;
