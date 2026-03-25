import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function SolutionModal(props) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if(!props.show) {
      setName('');
      setEmail('');
      setGender('');
      setAge('');
      setValidated(false);
    }
  }, [props.show]);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const isValidName = (name) => {
    const koreanRegex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
    return koreanRegex.test(name) && name.length >= 2;
  }

  const handleNameChange = (e) => {
    const koreanRegex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
    if (koreanRegex.test(e.target.value)) {
      setName(e.target.value);
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === false || !isValidName(name) || !isValidEmail(email) || !gender || !age) {
      return;
    }

    props.onSubmit({name, email, gender, age});
  };



  return(

      <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t('solutions.modal.title')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

            <Form.Group className="m-3" controlId="formGridEmail">
              <Form.Label>{t('solutions.modal.email')}</Form.Label>
              <Form.Control
                  required
                  type="email"
                  placeholder={t('solutions.modal.email_placeholder')}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  isInvalid={validated && !isValidEmail(email)}
              />
              <Form.Control.Feedback type="invalid">
                {t('solutions.modal.email_invalid')}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="m-3">
              <Form.Group as={Col} controlId="formGridGender">
                <Form.Label>{t('solutions.modal.gender')}</Form.Label>
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check
                      required
                      inline
                      label={t('solutions.modal.male')}
                      name="group1"
                      type="radio"
                      id={`inline-radio-1`}
                      value={'남성'}
                      onChange={e => setGender(e.target.value)}
                      isInvalid={validated && !gender}
                  />
                  <Form.Check
                      required
                      inline
                      label={t('solutions.modal.female')}
                      name="group1"
                      type="radio"
                      id={`inline-radio-2`}
                      value={'여성'}
                      onChange={e => setGender(e.target.value)}
                      isInvalid={validated && !gender}
                  />
                </div>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAge">
                <Form.Label>{t('solutions.modal.age_group')}</Form.Label>
                <Form.Select
                    required
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    isInvalid={validated && !age}
                >
                  <option value="">{t('solutions.modal.age_placeholder')}</option>
                  <option value="10대">{t('solutions.modal.age_10s')}</option>
                  <option value="20대">{t('solutions.modal.age_20s')}</option>
                  <option value="30대">{t('solutions.modal.age_30s')}</option>
                  <option value="40대">{t('solutions.modal.age_40s')}</option>
                  <option value="50대">{t('solutions.modal.age_50s')}</option>
                  <option value="60대 이상">{t('solutions.modal.age_60s_plus')}</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {t('solutions.modal.age_invalid')}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="text-end">
              <Button id={'submitBtn'} type="submit">
                {t('solutions.modal.confirm')}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
  );
}

export default SolutionModal;
