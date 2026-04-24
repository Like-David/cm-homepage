import { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { FileText } from 'lucide-react';
import Banner from '../components/common/Banner';
import AlertModal from '../components/common/AlertModal';
import { useAuth } from '@/contexts/AuthContext';
import { findByName } from '@/data/employees';
import * as adminService from '../services/admin';
import '../styles/AdminPage.css';

const EmployeeCertificateIssuePage = () => {
    const { user } = useAuth();
    const empInfo = findByName(user?.name);
    const [purpose, setPurpose] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'success', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await adminService.createCertificate({
                employee_name: user.name,
                department: empInfo?.department ?? '',
                position: empInfo?.rank ?? '',
                purpose,
                issue_date: new Date().toISOString().split('T')[0],
            });
            setPurpose('');
            setAlertModal({ isOpen: true, type: 'success', message: '재직증명서가 발급되었습니다.' });
        } catch (err) {
            setError(err.response?.data?.message || '발급 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page">
            <Banner title="재직증명서 발급" subtitle="재직증명서를 즉시 발급합니다" />
            <Container className="py-5" style={{ maxWidth: 660 }}>
                {error && (
                    <Alert variant="danger" onClose={() => setError('')} dismissible>
                        {error}
                    </Alert>
                )}

                <Card className="admin-content-card">
                    <div
                        className="d-flex align-items-center gap-2 mb-4 pb-3"
                        style={{ borderBottom: '2px solid #f0f2f6' }}
                    >
                        <FileText size={22} color="#1C2D60" />
                        <h5 style={{ color: '#1C2D60', fontWeight: 700, margin: 0 }}>
                            재직증명서 발급
                        </h5>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">이름</Form.Label>
                                    <Form.Control value={user?.name || ''} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">직급</Form.Label>
                                    <Form.Control value={empInfo?.rank || '-'} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">소속</Form.Label>
                                    <Form.Control value={empInfo?.department || '-'} disabled />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">
                                발급 목적 <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                required
                            >
                                <option value="">발급 목적을 선택하세요</option>
                                <option value="금융기관 제출용">금융기관 제출용</option>
                                <option value="관공서 제출용">관공서 제출용</option>
                                <option value="보험사 제출용">보험사 제출용</option>
                                <option value="기타">기타</option>
                            </Form.Select>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100"
                            style={{
                                backgroundColor: '#1C2D60',
                                borderColor: '#1C2D60',
                                padding: '12px',
                                fontWeight: 600,
                            }}
                            disabled={loading}
                        >
                            {loading ? '처리 중...' : '발급하기'}
                        </Button>
                    </Form>
                </Card>
            </Container>

            <AlertModal
                isOpen={alertModal.isOpen}
                onClose={() => setAlertModal({ isOpen: false, type: 'success', message: '' })}
                type={alertModal.type}
                message={alertModal.message}
            />
        </div>
    );
};

export default EmployeeCertificateIssuePage;
