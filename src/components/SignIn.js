import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { BsFillPersonFill, BsLockFill } from 'react-icons/bs';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Sign In</h2>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text icon">
                    <BsFillPersonFill size={30} />
                  </span>
                </div>
                <Form.Control
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text icon">
                    <BsLockFill size={30} />
                  </span>
                </div>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
            <br></br>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
