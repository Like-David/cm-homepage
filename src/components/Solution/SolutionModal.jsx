import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function SolutionModal(props) {
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
            테스트
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="m-3" controlId="formGridName">
              <Form.Label>이름</Form.Label>
              <Form.Control
                  required
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={name}
                  onChange={handleNameChange}
                  isInvalid={validated && !isValidName(name)}
              />
              <Form.Control.Feedback type="invalid">
                이름은 두 글자 이상의 한글만 입력 가능합니다.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="m-3" controlId="formGridEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                  required
                  type="email"
                  placeholder="이메일를 입력해주세요"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  isInvalid={validated && !isValidEmail(email)}
              />
              <Form.Control.Feedback type="invalid">
                올바른 이메일 주소를 입력해주세요.
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="m-3">
              <Form.Group as={Col} controlId="formGridGender">
                <Form.Label>성별</Form.Label>
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check
                      required
                      inline
                      label="남성"
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
                      label="여성"
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
                <Form.Label>나이대</Form.Label>
                <Form.Select
                    required
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    isInvalid={validated && !age}
                >
                  <option value="">선택하세요</option>
                  <option>10대</option>
                  <option>20대</option>
                  <option>30대</option>
                  <option>40대</option>
                  <option>50대</option>
                  <option>60대 이상</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  나이대를 선택해주세요.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="text-end">
              <Button id={'submitBtn'} type="submit">
                확인
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
  );
}

export default SolutionModal;
