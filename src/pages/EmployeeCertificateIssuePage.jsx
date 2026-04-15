import { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { FileText, CheckCircle } from 'lucide-react';
import Banner from '../components/common/Banner';
import { useAuth } from '@/contexts/AuthContext';
import * as adminService from '../services/admin';
import '../styles/AdminPage.css';

const EmployeeCertificateIssuePage = () => {
    const { user } = useAuth();
    const [form, setForm] = useState({
        department: '',
        position: '',
        hire_date: '',
        purpose: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await adminService.createCertificate({
                employee_name: user.name,
                ...form,
                issue_date: new Date().toISOString().split('T')[0],
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || '발급 신청 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSuccess(false);
        setForm({ department: '', position: '', hire_date: '', purpose: '' });
    };

    return (
        <div className="admin-page">
            <Banner title="재직증명서 발급" subtitle="재직증명서 발급을 신청합니다" />
            <Container className="py-5" style={{ maxWidth: 660 }}>
                {error && (
                    <Alert variant="danger" onClose={() => setError('')} dismissible>
                        {error}
                    </Alert>
                )}

                {success ? (
                    <Card className="admin-content-card text-center py-5">
                        <div className="d-flex justify-content-center mb-3">
                            <CheckCircle size={64} color="#1C2D60" />
                        </div>
                        <h4 style={{ color: '#1C2D60', fontWeight: 700 }}>발급 신청이 완료되었습니다</h4>
                        <p className="text-muted mt-2">담당자 확인 후 처리됩니다.</p>
                        <div className="mt-4">
                            <Button
                                style={{ backgroundColor: '#1C2D60', borderColor: '#1C2D60' }}
                                onClick={handleReset}
                            >
                                다시 신청하기
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <Card className="admin-content-card">
                        <div
                            className="d-flex align-items-center gap-2 mb-4 pb-3"
                            style={{ borderBottom: '2px solid #f0f2f6' }}
                        >
                            <FileText size={22} color="#1C2D60" />
                            <h5 style={{ color: '#1C2D60', fontWeight: 700, margin: 0 }}>
                                재직증명서 발급 신청
                            </h5>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">이름</Form.Label>
                                <Form.Control value={user?.name || ''} disabled />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">부서</Form.Label>
                                        <Form.Control
                                            name="department"
                                            value={form.department}
                                            onChange={handleChange}
                                            placeholder="소속 부서를 입력하세요"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">직급</Form.Label>
                                        <Form.Control
                                            name="position"
                                            value={form.position}
                                            onChange={handleChange}
                                            placeholder="직급을 입력하세요"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">입사일</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="hire_date"
                                    value={form.hire_date}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="fw-semibold">
                                    발급 목적 <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Select
                                    name="purpose"
                                    value={form.purpose}
                                    onChange={handleChange}
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
                                {loading ? '처리 중...' : '발급 신청'}
                            </Button>
                        </Form>
                    </Card>
                )}
            </Container>
        </div>
    );
};

export default EmployeeCertificateIssuePage;
