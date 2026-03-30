import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { Settings, Globe, Bell, Shield, Mail, Database } from 'lucide-react';
import Banner from '../components/common/Banner';
import AlertModal from '../components/common/AlertModal';
import '../styles/AdminPage.css';

const SettingsPage = () => {
    const { t } = useTranslation();
    const [alert, setAlert] = useState({ isOpen: false, type: 'success', message: '', title: '' });
    const [settings, setSettings] = useState({
        siteName: 'CM Innovation',
        siteDescription: 'Enterprise Solution Provider',
        contactEmail: 'info@cminnovation.com',
        supportEmail: 'support@cminnovation.com',
        maintenanceMode: false,
        allowRegistration: true,
        emailNotifications: true,
        smsNotifications: false,
        requireEmailVerification: true,
        passwordMinLength: 8,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        enableBackup: true,
        backupFrequency: 'daily',
        retentionDays: 30
    });

    const handleShowAlert = (alertData) => {
        setAlert({ isOpen: true, ...alertData });
    };

    const handleCloseAlert = () => {
        setAlert({ isOpen: false, type: 'success', message: '', title: '' });
    };

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveSettings = () => {
        // 설정 저장 로직
        handleShowAlert({
            type: 'success',
            message: t('admin.settings_saved_success')
        });
    };

    return (
        <div className="settings-page">
            <Banner
                title={t('admin.settings')}
                subtitle={t('admin.settings_desc')}
            />

            <Container className="py-5">
                <Card className="admin-content-card">
                    <Card.Body>
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <Settings size={32} className="text-primary" />
                            <h2 className="mb-0">{t('admin.system_settings')}</h2>
                        </div>

                        <Tabs defaultActiveKey="general" className="mb-4">
                            {/* 일반 설정 */}
                            <Tab
                                eventKey="general"
                                title={
                                    <span className="d-flex align-items-center gap-2">
                                        <Globe size={18} />
                                        {t('admin.general_settings')}
                                    </span>
                                }
                            >
                                <div className="settings-section">
                                    <h5 className="mb-3">{t('admin.site_information')}</h5>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('admin.site_name')}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={settings.siteName}
                                                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('admin.site_description')}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={settings.siteDescription}
                                                    onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <h5 className="mb-3 mt-4">{t('admin.contact_settings')}</h5>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('admin.contact_email')}</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    value={settings.contactEmail}
                                                    onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('admin.support_email')}</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    value={settings.supportEmail}
                                                    onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <h5 className="mb-3 mt-4">{t('admin.site_options')}</h5>
                                    <Form.Check
                                        type="switch"
                                        id="maintenanceMode"
                                        label={t('admin.maintenance_mode')}
                                        checked={settings.maintenanceMode}
                                        onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                                        className="mb-3"
                                    />
                                    <Form.Check
                                        type="switch"
                                        id="allowRegistration"
                                        label={t('admin.allow_registration')}
                                        checked={settings.allowRegistration}
                                        onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
                                        className="mb-3"
                                    />
                                </div>
                            </Tab>

                            {/* 알림 설정 */}
                            <Tab
                                eventKey="notifications"
                                title={
                                    <span className="d-flex align-items-center gap-2">
                                        <Bell size={18} />
                                        {t('admin.notifications')}
                                    </span>
                                }
                            >
                                <div className="settings-section">
                                    <h5 className="mb-3">{t('admin.notification_settings')}</h5>
                                    <Form.Check
                                        type="switch"
                                        id="emailNotifications"
                                        label={t('admin.email_notifications')}
                                        checked={settings.emailNotifications}
                                        onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                                        className="mb-3"
                                    />
                                    <Form.Check
                                        type="switch"
                                        id="smsNotifications"
                                        label={t('admin.sms_notifications')}
                                        checked={settings.smsNotifications}
                                        onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                                        className="mb-3"
                                    />
                                    <Form.Text className="text-muted">
                                        {t('admin.notification_desc')}
                                    </Form.Text>
                                </div>
                            </Tab>

                            {/* 보안 설정 */}
                            <Tab
                                eventKey="security"
                                title={
                                    <span className="d-flex align-items-center gap-2">
                                        <Shield size={18} />
                                        {t('admin.security')}
                                    </span>
                                }
                            >
                                <div className="settings-section">
                                    <h5 className="mb-3">{t('admin.authentication_settings')}</h5>
                                    <Form.Check
                                        type="switch"
                                        id="requireEmailVerification"
                                        label={t('admin.require_email_verification')}
                                        checked={settings.requireEmailVerification}
                                        onChange={(e) => handleSettingChange('requireEmailVerification', e.target.checked)}
                                        className="mb-3"
                                    />

                                    <Row className="mt-4">
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('admin.password_min_length')}</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={settings.passwordMinLength}
                                                    onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                                                    min="6"
                                                    max="20"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('admin.session_timeout')} (분)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={settings.sessionTimeout}
                                                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                                                    min="5"
                                                    max="120"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('admin.max_login_attempts')}</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={settings.maxLoginAttempts}
                                                    onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                                                    min="3"
                                                    max="10"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Tab>

                            {/* 백업 설정 */}
                            <Tab
                                eventKey="backup"
                                title={
                                    <span className="d-flex align-items-center gap-2">
                                        <Database size={18} />
                                        {t('admin.backup')}
                                    </span>
                                }
                            >
                                <div className="settings-section">
                                    <h5 className="mb-3">{t('admin.backup_settings')}</h5>
                                    <Form.Check
                                        type="switch"
                                        id="enableBackup"
                                        label={t('admin.enable_auto_backup')}
                                        checked={settings.enableBackup}
                                        onChange={(e) => handleSettingChange('enableBackup', e.target.checked)}
                                        className="mb-3"
                                    />

                                    <Row className="mt-4">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('admin.backup_frequency')}</Form.Label>
                                                <Form.Select
                                                    value={settings.backupFrequency}
                                                    onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                                                >
                                                    <option value="hourly">{t('admin.hourly')}</option>
                                                    <option value="daily">{t('admin.daily')}</option>
                                                    <option value="weekly">{t('admin.weekly')}</option>
                                                    <option value="monthly">{t('admin.monthly')}</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('admin.retention_days')}</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={settings.retentionDays}
                                                    onChange={(e) => handleSettingChange('retentionDays', parseInt(e.target.value))}
                                                    min="7"
                                                    max="365"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="mt-4">
                                        <Button variant="outline-primary" className="me-2">
                                            {t('admin.backup_now')}
                                        </Button>
                                        <Button variant="outline-secondary">
                                            {t('admin.restore_backup')}
                                        </Button>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>

                        <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top">
                            <Button variant="outline-secondary">
                                {t('common.cancel')}
                            </Button>
                            <Button variant="primary" onClick={handleSaveSettings}>
                                {t('admin.save_settings')}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>

            <AlertModal
                isOpen={alert.isOpen}
                onClose={handleCloseAlert}
                type={alert.type}
                message={alert.message}
                title={alert.title}
            />
        </div>
    );
};

export default SettingsPage;
