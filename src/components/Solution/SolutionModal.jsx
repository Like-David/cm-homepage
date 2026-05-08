import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SolutionModal(props) {
  const { t } = useTranslation();
  const todayStr = () => new Date().toISOString().split('T')[0];

  const [solution, setSolution] = useState('ReportExpress Enterprise');
  const [name, setName] = useState('');
  const [nowDate, setNowDate] = useState(todayStr());
  const [accNo, setAccNo] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!props.show) {
      setSolution('ReportExpress Enterprise');
      setName('');
      setNowDate(todayStr());
      setAccNo('');
      setValidated(false);
    }
  }, [props.show]);

  const isValidName = (name) => {
    const koreanRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
    return koreanRegex.test(name) && name.length >= 2;
  };

  const handleNameChange = (e) => {
    const koreanRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
    if (koreanRegex.test(e.target.value)) setName(e.target.value);
  };

  const isReportExpress = solution === 'ReportExpress Enterprise' || solution === 'RX-Cert';

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (!isValidName(name)) return;
    if (isReportExpress && (!nowDate || !accNo.trim())) return;

    const solutionMap = {
      'ReportExpress Enterprise': 'report-express',
      'RX-Cert': 'rx-cert',
      'RX-Loan': 'rx-loan',
    };

    props.onSubmit({
      name,
      solution,
      solutionId: solutionMap[solution],
      ...(isReportExpress && { nowDate, accNo }),
    });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('solutions.modal.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

          <Form.Group className="m-3" controlId="formGridSolution">
            <Form.Label>{t('solutions.modal.solution_select')}</Form.Label>
            <Form.Select
              required
              value={solution}
              onChange={e => setSolution(e.target.value)}
            >
              <option value="ReportExpress Enterprise">{t('solutions.modal.solution_options.report_express')}</option>
              <option value="RX-Cert">{t('solutions.modal.solution_options.rx_cert')}</option>
              <option value="RX-Loan">{t('solutions.modal.solution_options.rx_loan')}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="m-3" controlId="formGridName">
            <Form.Label>{t('solutions.modal.name')}</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder={t('solutions.modal.name_placeholder')}
              value={name}
              onChange={handleNameChange}
              isInvalid={validated && !isValidName(name)}
            />
            <Form.Control.Feedback type="invalid">
              {t('solutions.modal.name_invalid')}
            </Form.Control.Feedback>
          </Form.Group>

          {isReportExpress && (
            <>
              <Form.Group className="m-3" controlId="formGridNowDate">
                <Form.Label>{t('solutions.modal.now_date')}</Form.Label>
                <Form.Control
                  required
                  type="date"
                  value={nowDate}
                  onChange={e => setNowDate(e.target.value)}
                  isInvalid={validated && !nowDate}
                />
                <Form.Control.Feedback type="invalid">
                  {t('solutions.modal.now_date_invalid')}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="m-3" controlId="formGridAccNo">
                <Form.Label>{t('solutions.modal.acc_no')}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder={t('solutions.modal.acc_no_placeholder')}
                  value={accNo}
                  onChange={e => setAccNo(e.target.value)}
                  isInvalid={validated && !accNo.trim()}
                />
                <Form.Control.Feedback type="invalid">
                  {t('solutions.modal.acc_no_invalid')}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          <div className="text-end m-3">
            <Button id="submitBtn" type="submit">
              {t('solutions.modal.confirm')}
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SolutionModal;
