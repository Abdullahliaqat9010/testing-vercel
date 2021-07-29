import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';

import { goToNextStepAction } from '../../../../actions';

const StepOnePro = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState<boolean>(false);

  const handleSubmit = () => {
    // if (!validated) {
    //   setValidated(false);
    //   dispatch(goToNextStepAction());
    // }
    dispatch(goToNextStepAction());
    return setValidated(true);
  };

  return (
    <div className='pro-step-one'>
      <h1>Create professional account</h1>
      <h2>Benefit from using ImmoBelgium for your agency</h2>
      <Form noValidate validated={ validated }>
        <div className="form-block d-flex">
          <Form.Group controlId="first-name">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="John"
            />
          </Form.Group>
          <Form.Group controlId="last-name">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Smith"
            />
          </Form.Group>
        </div>
        <Form.Group controlId="phone">
          <Form.Label>Phone number</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="text"
              placeholder="Phone number"
              defaultValue="(239) 555-0108"
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            defaultValue="j.smith@gmail.com"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="form-block d-flex password-block">
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
            />
          </Form.Group>
        </div>
        <span className='recommendation'>
          We strongly recommend to use strong password, with at least one symbol and digit.
        </span>
        <Form.Group className="mb-30px">
          <Form.Check
            required
            label="I have read and agree to service Privacy Policy and Terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button className='next-step' onClick={ handleSubmit }>Next</Button>
      </Form>
    </div>
  );
};

export default StepOnePro;