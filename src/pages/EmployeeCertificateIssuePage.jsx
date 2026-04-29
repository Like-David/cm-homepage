import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { FileText } from 'lucide-react';
import Banner from '../components/common/Banner';
import AlertModal from '../components/common/AlertModal';
import { useAuth } from '@/contexts/AuthContext';
import { findByName } from '@/data/employees';
import * as adminService from '../services/admin';
import '../styles/AdminPage.css';

const EmployeeCertificateIssuePage = () => {
    const { t } = useTranslation();
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
            setAlertModal({ isOpen: true, type: 'success', message: t('admin.issue_success') });
        } catch (err) {
            setError(err.response?.data?.message || t('admin.issue_fail'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page">
            <Banner title={t('admin.cert_issue_title')} subtitle={t('admin.cert_issue_subtitle')} />
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
                            {t('admin.cert_issue_title')}
                        </h5>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">{t('admin.employee_name')}</Form.Label>
                                    <Form.Control value={user?.name || ''} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">{t('admin.employee_position')}</Form.Label>
                                    <Form.Control value={empInfo?.rank || '-'} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">{t('admin.department')}</Form.Label>
                                    <Form.Control value={empInfo?.department || '-'} disabled />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">
                                {t('admin.issue_purpose')} <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                required
                            >
                                <option value="">{t('admin.issue_purpose_placeholder')}</option>
                                <option value={t('admin.issue_purpose_financial')}>{t('admin.issue_purpose_financial')}</option>
                                <option value={t('admin.issue_purpose_public')}>{t('admin.issue_purpose_public')}</option>
                                <option value={t('admin.issue_purpose_insurance')}>{t('admin.issue_purpose_insurance')}</option>
                                <option value={t('admin.issue_purpose_etc')}>{t('admin.issue_purpose_etc')}</option>
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
                            {loading ? t('admin.issuing') : t('admin.issue_btn')}
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
